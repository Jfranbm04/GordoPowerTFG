<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Character;
use App\Entity\UserSkin;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var string $plainPassword */
            $plainPassword = $form->get('plainPassword')->getData();

            // encode the plain password
            $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword));

            $entityManager->persist($user);
            $entityManager->flush();

            // do anything else you need here, like send an email

            return $this->redirectToRoute('custom_login');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form,
        ]);
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function apiRegister(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (!isset($data['email']) || !isset($data['username']) || !isset($data['password'])) {
                return new JsonResponse(['success' => false, 'message' => 'Faltan datos requeridos'], 400);
            }

            // Crear usuario
            $user = new User();
            $user->setEmail($data['email']);
            $user->setUsername($data['username']);
            $user->setPassword($userPasswordHasher->hashPassword($user, $data['password']));
            $user->setCoins(1000);
            $user->setRoles(['ROLE_USER']);
            $user->setActive(true);

            $entityManager->persist($user);
            $entityManager->flush();

            // Crear personaje para el usuario
            $character = new Character();
            $character->setUser($user);
            $character->setLevel(1);
            $character->setStrength(1);
            $character->setWeight(50);
            $character->setProtein(100);
            $character->setFat(100);
            $character->setExperience(0);

            $entityManager->persist($character);

            // Asignar skin por defecto
            $userSkin = new UserSkin();
            $userSkin->setUser($user);
            $userSkin->setSkin($entityManager->getReference('App\Entity\Skin', 1));
            $userSkin->setUnlocked(true);
            $userSkin->setActive(true);
            $userSkin->setUnlocked(true);

            $entityManager->persist($userSkin);
            $entityManager->flush();

            return new JsonResponse([
                'success' => true,
                'message' => 'Usuario registrado correctamente',
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'username' => $user->getUsername(),
                    'roles' => $user->getRoles()
                ]
            ], 201);
        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Error al registrar usuario: ' . $e->getMessage()
            ], 500);
        }
    }
}
