FROM node:18-alpine as build

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Imagen de producción
FROM nginx:alpine

# Copiar archivos de construcción desde la etapa anterior
COPY --from=build /app/dist /var/www/frontend

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]