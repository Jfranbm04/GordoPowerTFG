<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

final class UserController extends AbstractController
{
    #[Route('/user', name: 'app_user')]
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }

    #[Route('/api/get-current-user', name: 'get_current_user', methods: ['GET'])]
    public function getCurrentUser(UserInterface $user): JsonResponse       // Symfony inyecta automáticamente el usuario autenticado gracias al componente de seguridad
    {
        return $this->json($user, context: ['groups' => ['user:read']]);
    }
}
