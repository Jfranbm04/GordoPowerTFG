<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SkinRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SkinRepository::class)]
#[ApiResource]
class Skin
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column]
    private ?int $levelcondition = null;

    #[ORM\Column]
    private ?int $proteincondition = null;

    #[ORM\Column]
    private ?int $fatcondition = null;

    #[ORM\Column(length: 255)]
    private ?string $rarity = null;

    /**
     * @var Collection<int, UserSkin>
     */
    #[ORM\OneToMany(targetEntity: UserSkin::class, mappedBy: 'skin')]
    private Collection $userSkins;

    public function __construct()
    {
        $this->userSkins = new ArrayCollection();
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

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getLevelcondition(): ?int
    {
        return $this->levelcondition;
    }

    public function setLevelcondition(int $levelcondition): static
    {
        $this->levelcondition = $levelcondition;

        return $this;
    }

    public function getProteincondition(): ?int
    {
        return $this->proteincondition;
    }

    public function setProteincondition(int $proteincondition): static
    {
        $this->proteincondition = $proteincondition;

        return $this;
    }

    public function getFatcondition(): ?int
    {
        return $this->fatcondition;
    }

    public function setFatcondition(int $fatcondition): static
    {
        $this->fatcondition = $fatcondition;

        return $this;
    }

    public function getRarity(): ?string
    {
        return $this->rarity;
    }

    public function setRarity(string $rarity): static
    {
        $this->rarity = $rarity;

        return $this;
    }

    /**
     * @return Collection<int, UserSkin>
     */
    public function getUserSkins(): Collection
    {
        return $this->userSkins;
    }

    public function addUserSkin(UserSkin $userSkin): static
    {
        if (!$this->userSkins->contains($userSkin)) {
            $this->userSkins->add($userSkin);
            $userSkin->setSkin($this);
        }

        return $this;
    }

    public function removeUserSkin(UserSkin $userSkin): static
    {
        if ($this->userSkins->removeElement($userSkin)) {
            // set the owning side to null (unless already changed)
            if ($userSkin->getSkin() === $this) {
                $userSkin->setSkin(null);
            }
        }

        return $this;
    }
}
