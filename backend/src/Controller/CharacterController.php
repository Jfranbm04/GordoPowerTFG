<?php

namespace App\Controller;

use App\Repository\CharacterRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class CharacterController extends AbstractController
{
    #[Route('/api/character/user/{userId}', name: 'get_character_by_user', methods: ['GET'])]
    public function getCharacterByUser(int $userId, CharacterRepository $characterRepository): JsonResponse
    {
        $character = $characterRepository->findOneByUserId($userId);
        if (!$character) {
            return new JsonResponse(['message' => 'Character not found'], 404);
        }

        return $this->json($character, 200, [], ['groups' => ['character:read']]);
    }
}
