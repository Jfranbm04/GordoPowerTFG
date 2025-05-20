<?php

namespace App\Controller;

use App\Entity\Food;
use App\Repository\FoodRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\String\Slugger\SluggerInterface;


// Controlador para manejar un plato con imagen
class FoodController extends AbstractController
{
    #[Route('/api/food/new', name: 'api_food_create', methods: ['POST'])]
    public function create(Request $request, SluggerInterface $slugger, EntityManagerInterface $em): JsonResponse
    {
        try {
            $name = $request->get('name');
            $description = $request->get('description');
            $origin = $request->get('origin');
            $type = $request->get('type');
            $rarity = $request->get('rarity');
            $protein = $request->get('protein');
            $fat = $request->get('fat');
            $price = $request->get('price');

            $food = new Food();
            $food->setName($name);
            $food->setDescription($description);
            $food->setOrigin($origin);
            $food->setType($type);
            $food->setRarity($rarity);
            $food->setProtein((float)$protein);
            $food->setFat((float)$fat);
            $food->setPrice((int)$price);

            $imageFile = $request->files->get('image');
            if ($imageFile) {
                $filename = $imageFile->getClientOriginalName();
                $imageFile->move(__DIR__ . '/../../public/uploads/food', $filename);
                $food->setImage('uploads/food/' . $filename);
            }

            $em->persist($food);
            $em->flush();

            return new JsonResponse(['status' => 'ok'], 201);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }


    #[Route('/api/food/{id}/edit', name: 'app_food_edit', methods: ['POST'])]
    public function edit(Request $request, Food $food, EntityManagerInterface $em): JsonResponse
    {
        try {
            $food->setName($request->get('name'));
            $food->setDescription($request->get('description'));
            $food->setOrigin($request->get('origin'));
            $food->setType($request->get('type'));
            $food->setRarity($request->get('rarity'));
            $food->setProtein((float)$request->get('protein'));
            $food->setFat((float)$request->get('fat'));
            $food->setPrice((int)$request->get('price'));

            $imageFile = $request->files->get('image');
            if ($imageFile) {
                $filename = $imageFile->getClientOriginalName();
                $imageFile->move(__DIR__ . '/../../public/uploads/food', $filename);

                if ($food->getImage()) {
                    $oldPath = __DIR__ . '/../../public/' . $food->getImage();
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }
                }

                $food->setImage('uploads/food/' . $filename);
            }

            $em->flush();
            return new JsonResponse(['status' => 'ok'], 200);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }
}
