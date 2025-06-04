# GordoPower

GordoPower es una aplicación web que combina un juego de rol, colección, azar y minijuegos con una temática gastronómica. El proyecto está diseñado como un sistema interactivo donde los usuarios pueden crear y personalizar un personaje, alimentarlo para mejorar sus estadísticas, coleccionar diferentes tipos de comidas y personajes, y participar en minijuegos para ganar monedas.

La aplicación tiene un objetivo educativo y lúdico, permitiendo a los usuarios descubrir platos de diferentes orígenes y características de una manera más dinámica y divertida.

## Puertos utilizados

- **Nginx:** `8081`
- **Frontend (React):** `5173`
- **Backend (Symfony Api Platform):** `8000`
- **phpMyAdmin:** `8080`

## Instrucciones de uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jfranbm04/GordoPowerTFG.git
cd GordoPowerTFG
```

### 2. Instalar dependencias del frontend:

```bash
cd frontend
npm install
```

### 3. Actualizar/Instalar dependencias del backend:

```bash
cd backend
composer update
```

### 4. Crear claves JWT si no existen ya

```bash
cd backend

mkdir -p config/jwt

openssl genrsa -out config/jwt/private.pem -aes256 -passout pass:123456 4096

openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem -passin pass:123456
```

### 5. Entorno local con Docker

Asegúrate de tener Docker y Docker Compose instalados.

```bash
docker-compose up --build
```

- El frontend estará disponible en [http://localhost:8081](http://localhost:8081)
- El backend en [http://localhost:8000/api](http://localhost:8000/api)
- phpMyAdmin en [http://localhost:8080](http://localhost:8080)

### 5. Acceso a la aplicación

Usa las credenciales de prueba para iniciar sesión y probar todas las funcionalidades.

## Datos de prueba

- **Usuario de prueba 1:**

  - Correo: `admin@admin.com`
  - Contraseña: `admin`

- **Usuario de prueba 2:**
  - Correo: `ejemplo@ejemplo.com`
  - Contraseña: `ejemplo`

## A tener en cuenta

- El proyecto utiliza autenticación con JWT, puede ser necesario generar unas claves nuevas
- Para desplegar en AWS es necesario actualizar el .env (backend) con la siguiente ruta

```bash
DATABASE_URL="mysql://root@db:3306/gordopower"
```

- De igual manera puede ser necesario modificar el enlace del backend dentro del .env(frontend)

---

_Desarrollado por: Juan Francisco Burgos Martin_
