# Usar la imagen oficial de PHP con FPM
FROM php:8.2-fpm

WORKDIR /app

# Instalar extensiones necesarias
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libicu-dev \
    && docker-php-ext-install \
    zip \
    pdo \
    pdo_mysql \
    intl

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar archivos de configuración de Composer
COPY composer.* ./
# Instalar dependencias con Composer sin scripts ni progreso
RUN composer install --prefer-dist --no-scripts --no-progress --no-interaction

# Copiar el resto de los archivos al contenedor
COPY . .

# Copiar y dar permisos al script de entrada
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Establecer el punto de entrada y el comando por defecto
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
