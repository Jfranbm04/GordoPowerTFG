<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ClothingRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClothingRepository::class)]
#[ApiResource]
class Clothing
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $price = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $rarity = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $type = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $slot = null;

    /**
     * @var Collection<int, UserClothing>
     */
    #[ORM\OneToMany(targetEntity: UserClothing::class, mappedBy: 'clothing')]
    private Collection $userClothing;

    public function __construct()
    {
        $this->userClothing = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getRarity(): ?string
    {
        return $this->rarity;
    }

    public function setRarity(?string $rarity): static
    {
        $this->rarity = $rarity;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getSlot(): ?string
    {
        return $this->slot;
    }

    public function setSlot(?string $slot): static
    {
        $this->slot = $slot;

        return $this;
    }

    /**
     * @return Collection<int, UserClothing>
     */
    public function getUserClothing(): Collection
    {
        return $this->userClothing;
    }

    public function addUserClothing(UserClothing $userClothing): static
    {
        if (!$this->userClothing->contains($userClothing)) {
            $this->userClothing->add($userClothing);
            $userClothing->setClothing($this);
        }

        return $this;
    }

    public function removeUserClothing(UserClothing $userClothing): static
    {
        if ($this->userClothing->removeElement($userClothing)) {
            // set the owning side to null (unless already changed)
            if ($userClothing->getClothing() === $this) {
                $userClothing->setClothing(null);
            }
        }

        return $this;
    }
}
