<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'user:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    #[Groups(['user:read', 'user:write'])]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    #[Groups(['user:read', 'user:write'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read'])]
    private ?string $username = null;

    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?int $coins = null;

    /**
     * @var Collection<int, UserFood>
     */
    #[ORM\OneToMany(targetEntity: UserFood::class, mappedBy: 'user')]
    #[Groups(['user:read'])]
    private Collection $userFood;

    /**
     * @var Collection<int, UserClothing>
     */
    #[ORM\OneToMany(targetEntity: UserClothing::class, mappedBy: 'user')]
    #[Groups(['user:read'])]
    private Collection $userClothing;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    #[Groups(['user:read'])]
    private ?Character $userCharacter = null;

    public function __construct()
    {
        $this->userFood = new ArrayCollection();
        $this->userClothing = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getCoins(): ?int
    {
        return $this->coins;
    }

    public function setCoins(int $coins): static
    {
        $this->coins = $coins;

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
            $userFood->setUser($this);
        }

        return $this;
    }

    public function removeUserFood(UserFood $userFood): static
    {
        if ($this->userFood->removeElement($userFood)) {
            // set the owning side to null (unless already changed)
            if ($userFood->getUser() === $this) {
                $userFood->setUser(null);
            }
        }

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
            $userClothing->setUser($this);
        }

        return $this;
    }

    public function removeUserClothing(UserClothing $userClothing): static
    {
        if ($this->userClothing->removeElement($userClothing)) {
            // set the owning side to null (unless already changed)
            if ($userClothing->getUser() === $this) {
                $userClothing->setUser(null);
            }
        }

        return $this;
    }

    public function getUserCharacter(): ?Character
    {
        return $this->userCharacter;
    }

    public function setUserCharacter(?Character $userCharacter): static
    {
        // unset the owning side of the relation if necessary
        if ($userCharacter === null && $this->userCharacter !== null) {
            $this->userCharacter->setUser(null);
        }

        // set the owning side of the relation if necessary
        if ($userCharacter !== null && $userCharacter->getUser() !== $this) {
            $userCharacter->setUser($this);
        }

        $this->userCharacter = $userCharacter;

        return $this;
    }
}
