<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserSkinRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserSkinRepository::class)]
#[ApiResource]
class UserSkin
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user_skin:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'userSkins')]
    #[Groups(['user_skin:read'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'userSkins')]
    #[Groups(['user_skin:read'])]
    private ?Skin $skin = null;

    #[ORM\Column]
    #[Groups(['user_skin:read'])]
    private ?bool $unlocked = null;

    #[ORM\Column]
    #[Groups(['user_skin:read'])]
    private ?bool $active = null;

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

    public function getSkin(): ?Skin
    {
        return $this->skin;
    }

    public function setSkin(?Skin $skin): static
    {
        $this->skin = $skin;

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

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;

        return $this;
    }
}
