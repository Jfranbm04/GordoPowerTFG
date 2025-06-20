<?php

namespace App\Repository;

use App\Entity\UserSkin;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UserSkin>
 */
class UserSkinRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserSkin::class);
    }
    public function findUnlockedByUser($userId): array
    {
        return $this->createQueryBuilder('us')
            ->andWhere('us.user = :userId')
            ->andWhere('us.unlocked = :unlocked')
            ->setParameter('userId', $userId)
            ->setParameter('unlocked', true)
            ->getQuery()
            ->getResult()
        ;
    }
    //    /**
    //     * @return UserSkin[] Returns an array of UserSkin objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('u.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?UserSkin
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
