<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FoodRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FoodRepository::class)]
#[ApiResource]
class Food
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $origin = null;

    #[ORM\Column]
    private ?int $price = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $rarity = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $type = null;

    #[ORM\Column(nullable: true)]
    private ?float $protein = null;

    #[ORM\Column(nullable: true)]
    private ?float $fat = null;

    /**
     * @var Collection<int, UserFood>
     */
    #[ORM\OneToMany(targetEntity: UserFood::class, mappedBy: 'food')]
    private Collection $userFood;

    public function __construct()
    {
        $this->userFood = new ArrayCollection();
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

    public function getOrigin(): ?string
    {
        return $this->origin;
    }

    public function setOrigin(?string $origin): static
    {
        $this->origin = $origin;

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

    public function getProtein(): ?float
    {
        return $this->protein;
    }

    public function setProtein(?float $protein): static
    {
        $this->protein = $protein;

        return $this;
    }

    public function getFat(): ?float
    {
        return $this->fat;
    }

    public function setFat(?float $fat): static
    {
        $this->fat = $fat;

        return $this;
    }

    /**
     * @return Collection<int, UserFood>
     */
    public function getUserFood(): Collection
    {
        return $this->userFood;
    }

    public function addUserFood(UserFood $userFood): static
    {
        if (!$this->userFood->contains($userFood)) {
            $this->userFood->add($userFood);
            $userFood->setFood($this);
        }

        return $this;
    }

    public function removeUserFood(UserFood $userFood): static
    {
        if ($this->userFood->removeElement($userFood)) {
            // set the owning side to null (unless already changed)
            if ($userFood->getFood() === $this) {
                $userFood->setFood(null);
            }
        }

        return $this;
    }
}
