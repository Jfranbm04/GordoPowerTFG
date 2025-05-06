<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250506063554 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Migración vacía - la columna active ya existe';
    }

    public function up(Schema $schema): void
    {
        // La columna active ya existe, no es necesario crearla
    }

    public function down(Schema $schema): void
    {
        // No es necesario hacer nada aquí
    }
}
