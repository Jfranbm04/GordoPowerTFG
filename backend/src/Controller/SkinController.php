<?php

namespace App\Controller;

use App\Entity\Skin;
use App\Entity\User;
use App\Entity\UserSkin;
use App\Repository\SkinRepository;
use App\Repository\UserRepository;
use App\Repository\UserSkinRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\String\Slugger\SluggerInterface;

class SkinController extends AbstractController
{
    #[Route('/api/skin/new', name: 'api_skin_create', methods: ['POST'])]
    public function create(Request $request, SluggerInterface $slugger, EntityManagerInterface $em): JsonResponse
    {
        try {
            $name = $request->get('name');
            $levelcondition = $request->get('levelcondition');
            $proteincondition = $request->get('proteincondition');
            $fatcondition = $request->get('fatcondition');
            $rarity = $request->get('rarity');

            $skin = new Skin();
            $skin->setName($name);
            $skin->setLevelcondition((int)$levelcondition);
            $skin->setProteincondition((int)$proteincondition);
            $skin->setFatcondition((int)$fatcondition);
            $skin->setRarity($rarity);

            $imageFile = $request->files->get('image');
            if ($imageFile) {
                $filename = $imageFile->getClientOriginalName();
                $imageFile->move(__DIR__ . '/../../public/uploads/skin', $filename);
                $skin->setImage('uploads/skin/' . $filename);
            }

            $em->persist($skin);
            $em->flush();

            return new JsonResponse(['status' => 'ok'], 201);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/skin/{id}/edit', name: 'api_skin_edit', methods: ['POST'])]
    public function edit(Request $request, Skin $skin, EntityManagerInterface $em): JsonResponse
    {
        try {
            $skin->setName($request->get('name'));
            $skin->setLevelcondition((int)$request->get('levelcondition'));
            $skin->setProteincondition((int)$request->get('proteincondition'));
            $skin->setFatcondition((int)$request->get('fatcondition'));
            $skin->setRarity($request->get('rarity'));

            $imageFile = $request->files->get('image');
            if ($imageFile) {
                $filename = $imageFile->getClientOriginalName();
                $imageFile->move(__DIR__ . '/../../public/uploads/skin', $filename);

                $skin->setImage('uploads/skin/' . $filename);
            }

            $em->flush();
            return new JsonResponse(['status' => 'ok'], 200);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/user_skins', name: 'api_get_user_skins', methods: ['GET'])]
    public function getUserSkins(Request $request, UserSkinRepository $userSkinRepository): JsonResponse
    {
        $userId = $request->query->get('user');

        if (!$userId) {
            return new JsonResponse(['message' => 'User ID is required'], 400);
        }

        $userSkins = $userSkinRepository->findBy(['user' => $userId]);

        return $this->json($userSkins, 200, [], ['groups' => ['user_skin:read']]);
    }

    #[Route('/api/user/{userId}/unlock_skin/{skinId}', name: 'api_unlock_skin', methods: ['POST'])]
    public function unlockSkin(int $userId, int $skinId, UserRepository $userRepository, SkinRepository $skinRepository, EntityManagerInterface $em): JsonResponse
    {
        try {
            $user = $userRepository->find($userId);
            if (!$user) {
                return new JsonResponse(['message' => 'Usuario no encontrado'], 404);
            }

            $skin = $skinRepository->find($skinId);
            if (!$skin) {
                return new JsonResponse(['message' => 'Skin no encontrada'], 404);
            }

            // Verificar si el usuario ya tiene esta skin
            foreach ($user->getUserSkins() as $userSkin) {
                if ($userSkin->getSkin()->getId() === $skin->getId()) {
                    return new JsonResponse(['message' => 'El usuario ya tiene esta skin'], 400);
                }
            }

            // Crear nueva relación UserSkin
            $userSkin = new UserSkin();
            $userSkin->setUser($user);
            $userSkin->setSkin($skin);
            $userSkin->setUnlocked(true);
            $userSkin->setActive(false);

            $em->persist($userSkin);
            $em->flush();

            return new JsonResponse(['status' => 'ok', 'message' => 'Skin desbloqueada correctamente'], 201);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/user_skin/{id}/toggle_active', name: 'api_toggle_skin_active', methods: ['PATCH'])]
    public function toggleSkinActive(UserSkin $userSkin, EntityManagerInterface $em): JsonResponse
    {
        try {
            // Desactivar todas las skins activas del usuario
            if (!$userSkin->isActive()) {
                $user = $userSkin->getUser();
                foreach ($user->getUserSkins() as $skin) {
                    if ($skin->isActive()) {
                        $skin->setActive(false);
                    }
                }
            }

            // Activar/desactivar la skin actual
            $userSkin->setActive(!$userSkin->isActive());

            $em->flush();

            return new JsonResponse([
                'status' => 'ok',
                'active' => $userSkin->isActive()
            ], 200);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    #[Route('/api/skin/{id}', name: 'api_delete_skin', methods: ['DELETE'])]
    public function delete(Skin $skin, EntityManagerInterface $em): JsonResponse
    {
        try {
            // Eliminar la imagen si existe
            if ($skin->getImage()) {
                $imagePath = __DIR__ . '/../../public/' . $skin->getImage();
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }

            $em->remove($skin);
            $em->flush();

            return new JsonResponse(['status' => 'ok'], 200);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }

    // Sacar skins del usuario con metodo personalizado 
    #[Route('/api/user/{userId}/unlocked_skins', name: 'api_get_unlocked_skins', methods: ['GET'])]
    public function getUnlockedUserSkins(int $userId, UserRepository $userRepository, UserSkinRepository $userSkinRepository): JsonResponse
    {
        $user = $userRepository->find($userId);

        if (!$user) {
            return new JsonResponse(['message' => 'Usuario no encontrado'], 404);
        }


        $unlockedSkins = $userSkinRepository->findUnlockedByUser($userId);

        return $this->json($unlockedSkins, 200, [], ['groups' => ['user_skin:read']]);
    }
}
