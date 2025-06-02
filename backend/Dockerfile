FROM php:8.2-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    && rm -rf /var/lib/apt/lists/*

# Extensiones PHP necesarias
RUN docker-php-ext-install pdo pdo_mysql opcache intl exif bcmath sockets

# Copiar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Directorio de trabajo
WORKDIR /app

# Copiar archivos del backend al contenedor
COPY . .

# Instalar dependencias
RUN composer install --optimize-autoloader --no-scripts

# Establecer permisos adecuados
RUN chown -R www-data:www-data /app/var

EXPOSE 9000

CMD ["php-fpm"]