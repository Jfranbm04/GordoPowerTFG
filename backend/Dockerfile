# Usar una imagen base oficial de PHP
FROM php:8.1-fpm-alpine

# Instalar dependencias necesarias
RUN apk add --no-cache \
    openssl \
    curl \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo_mysql

# Configurar Composer
RUN curl -sS https://getcomposer.org/installer  | php -- --install-dir=/usr/local/bin --filename=composer

# Copiar el código fuente
WORKDIR /var/www/html
COPY . .

# Instalar dependencias de Symfony
RUN composer install --no-scripts --prefer-dist

# Configurar permisos
RUN chown -R www-data:www-data /var/www/html/var
RUN chown -R www-data:www-data /var/www/html/public
RUN chmod -R 777 /var/www/html/var
RUN chmod -R 777 /var/www/html/public

# Exponer el puerto
EXPOSE 8000

# Ejecutar el servidor de desarrollo
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public/"]