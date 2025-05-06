<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CharacterRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CharacterRepository::class)]
#[ORM\Table(name: '`character`')]
// #[ApiResource(
//     normalizationContext: ['groups' => ['character:read']]
// )]
#[ApiResource]

class Character
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['character:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['character:read'])]
    private ?int $level = null;

    #[ORM\Column]
    #[Groups(['character:read'])]
    private ?int $strength = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['character:read'])]
    private ?int $weight = null;

    #[ORM\OneToOne(inversedBy: 'userCharacter', cascade: ['persist', 'remove'])]
    private ?User $user = null;

    #[ORM\Column]
    #[Groups(['character:read'])]
    private ?int $protein = null;

    #[ORM\Column]
    #[Groups(['character:read'])]
    private ?int $fat = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLevel(): ?int
    {
        return $this->level;
    }

    public function setLevel(int $level): static
    {
        $this->level = $level;

        return $this;
    }

    public function getStrength(): ?int
    {
        return $this->strength;
    }

    public function setStrength(int $strength): static
    {
        $this->strength = $strength;

        return $this;
    }

    public function getWeight(): ?int
    {
        return $this->weight;
    }

    public function setWeight(?int $weight): static
    {
        $this->weight = $weight;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getProtein(): ?int
    {
        return $this->protein;
    }

    public function setProtein(int $protein): static
    {
        $this->protein = $protein;

        return $this;
    }

    public function getFat(): ?int
    {
        return $this->fat;
    }

    public function setFat(int $fat): static
    {
        $this->fat = $fat;

        return $this;
    }
}
