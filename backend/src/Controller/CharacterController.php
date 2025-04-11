<?php

namespace App\Controller;

use App\Entity\Character;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class CharacterController extends AbstractController
{
    #[Route('/api/character/user/{userId}', methods: ['GET'])]
    public function getCharacterByUserId(int $userId, EntityManagerInterface $entityManager): JsonResponse
    {
        $character = $entityManager->getRepository(Character::class)->findOneBy(['user' => $userId]);

        if (!$character) {
            return $this->json(['message' => 'No character found for this user'], 404);
        }

        return $this->json($character);
    }
}
