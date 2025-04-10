<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250409083219 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE user_clothing (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, clothing_id INT DEFAULT NULL, unlocked TINYINT(1) NOT NULL, INDEX IDX_F311DCB1A76ED395 (user_id), INDEX IDX_F311DCB14CFB3290 (clothing_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE user_food (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, food_id INT DEFAULT NULL, unlocked TINYINT(1) NOT NULL, quantity INT NOT NULL, INDEX IDX_AEB9653EA76ED395 (user_id), INDEX IDX_AEB9653EBA8E87C4 (food_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_clothing ADD CONSTRAINT FK_F311DCB1A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_clothing ADD CONSTRAINT FK_F311DCB14CFB3290 FOREIGN KEY (clothing_id) REFERENCES clothing (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_food ADD CONSTRAINT FK_AEB9653EA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_food ADD CONSTRAINT FK_AEB9653EBA8E87C4 FOREIGN KEY (food_id) REFERENCES food (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE user_clothing DROP FOREIGN KEY FK_F311DCB1A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_clothing DROP FOREIGN KEY FK_F311DCB14CFB3290
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_food DROP FOREIGN KEY FK_AEB9653EA76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE user_food DROP FOREIGN KEY FK_AEB9653EBA8E87C4
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE user_clothing
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE user_food
        SQL);
    }
}
