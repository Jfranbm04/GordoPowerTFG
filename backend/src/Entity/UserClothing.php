<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserClothingRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserClothingRepository::class)]
#[ApiResource]
class UserClothing
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'userClothing')]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'userClothing')]
    private ?Clothing $clothing = null;

    #[ORM\Column]
    private ?bool $unlocked = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getClothing(): ?Clothing
    {
        return $this->clothing;
    }

    public function setClothing(?Clothing $clothing): static
    {
        $this->clothing = $clothing;

        return $this;
    }

    public function isUnlocked(): ?bool
    {
        return $this->unlocked;
    }

    public function setUnlocked(bool $unlocked): static
    {
        $this->unlocked = $unlocked;

        return $this;
    }
}
