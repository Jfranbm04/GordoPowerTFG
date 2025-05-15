<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250515084238 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE skin (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, levelcondition INT NOT NULL, proteincondition INT NOT NULL, fatcondition INT NOT NULL, rarity VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE user_skin (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, skin_id INT DEFAULT NULL, unlocked TINYINT(1) NOT NULL, active TINYINT(1) NOT NULL, INDEX IDX_78F824D7A76ED395 (user_id), INDEX IDX_78F824D7F404637F (skin_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_skin ADD CONSTRAINT FK_78F824D7A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_skin ADD CONSTRAINT FK_78F824D7F404637F FOREIGN KEY (skin_id) REFERENCES skin (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE user_skin DROP FOREIGN KEY FK_78F824D7A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_skin DROP FOREIGN KEY FK_78F824D7F404637F
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE skin
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE user_skin
        SQL);
    }
}
