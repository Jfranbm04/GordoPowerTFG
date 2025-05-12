<?php

namespace App\Controller;

use App\Entity\Food;
use App\Repository\FoodRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FoodController extends AbstractController
{
    #[Route('/api/food/new', name: 'app_food_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        // Obtener los datos del formulario
        $name = $request->request->get('name');
        $description = $request->request->get('description');
        $origin = $request->request->get('origin');
        $type = $request->request->get('type');
        $rarity = $request->request->get('rarity');
        $protein = $request->request->get('protein');
        $fat = $request->request->get('fat');
        $price = $request->request->get('price');
        
        // Obtener el archivo de imagen
        $imageFile = $request->files->get('imageFile');
        
        // Crear un nuevo objeto Food
        $food = new Food();
        $food->setName($name);
        $food->setDescription($description);
        $food->setOrigin($origin);
        $food->setType($type);
        $food->setRarity($rarity);
        $food->setProtein((float)$protein);
        $food->setFat((float)$fat);
        $food->setPrice((int)$price);
        
        // Procesar la imagen si existe
        if ($imageFile) {
            $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
            // Generar un nombre único para el archivo
            $newFilename = $originalFilename.'-'.uniqid().'.'.$imageFile->guessExtension();
            
            // Mover el archivo a la carpeta de destino
            try {
                $imageFile->move(
                    $this->getParameter('food_images_directory'),
                    $newFilename
                );
                
                // Guardar la ruta relativa en la entidad
                $food->setImage('uploads/food/'.$newFilename);
            } catch (\Exception $e) {
                return $this->json(['error' => 'Error al subir la imagen'], Response::HTTP_BAD_REQUEST);
            }
        }
        
        // Guardar en la base de datos
        $entityManager->persist($food);
        $entityManager->flush();
        
        return $this->json($food, Response::HTTP_CREATED);
    }
    
    #[Route('/api/food/{id}/edit', name: 'app_food_edit', methods: ['POST'])]
    public function edit(Request $request, Food $food, EntityManagerInterface $entityManager): Response
    {
        // Obtener los datos del formulario
        $name = $request->request->get('name');
        $description = $request->request->get('description');
        $origin = $request->request->get('origin');
        $type = $request->request->get('type');
        $rarity = $request->request->get('rarity');
        $protein = $request->request->get('protein');
        $fat = $request->request->get('fat');
        $price = $request->request->get('price');
        
        // Actualizar los datos del objeto Food
        $food->setName($name);
        $food->setDescription($description);
        $food->setOrigin($origin);
        $food->setType($type);
        $food->setRarity($rarity);
        $food->setProtein((float)$protein);
        $food->setFat((float)$fat);
        $food->setPrice((int)$price);
        
        // Obtener el archivo de imagen
        $imageFile = $request->files->get('imageFile');
        
        // Procesar la imagen si existe
        if ($imageFile) {
            $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
            // Generar un nombre único para el archivo
            $newFilename = $originalFilename.'-'.uniqid().'.'.$imageFile->guessExtension();
            
            // Mover el archivo a la carpeta de destino
            try {
                $imageFile->move(
                    $this->getParameter('food_images_directory'),
                    $newFilename
                );
                
                // Eliminar la imagen anterior si existe
                $oldImage = $food->getImage();
                if ($oldImage) {
                    $oldImagePath = $this->getParameter('kernel.project_dir').'/public/'.$oldImage;
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }
                
                // Guardar la ruta relativa en la entidad
                $food->setImage('uploads/food/'.$newFilename);
            } catch (\Exception $e) {
                return $this->json(['error' => 'Error al subir la imagen'], Response::HTTP_BAD_REQUEST);
            }
        }
        
        // Guardar en la base de datos
        $entityManager->flush();
        
        return $this->json($food, Response::HTTP_OK);
    }
}