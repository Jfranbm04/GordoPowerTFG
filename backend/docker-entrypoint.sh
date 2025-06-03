#!/bin/sh
set -e

# Esperar a que la base de datos esté disponible
until php -r "
    try {
        \$dbh = new PDO('mysql:host=database;dbname=${MYSQL_DATABASE}', 'root', '${MYSQL_ROOT_PASSWORD}');
        echo 'Database connection successful\n';
        exit(0);
    } catch(PDOException \$e) {
        echo 'Waiting for database...\n';
        sleep(1);
    }
"
do
    sleep 1
done

# Instalar dependencias y configurar la aplicación
composer install --no-interaction
composer dump-autoload --optimize
php bin/console cache:clear --no-warmup
php bin/console cache:warmup
php bin/console doctrine:schema:update --force --no-interaction

exec "$@"
