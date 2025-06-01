# Usar una imagen base oficial de Node.js
FROM node:16-alpine

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar el package.json y npm install
COPY package.json .
COPY package-lock.json .
RUN npm install --silent

# Copiar el resto del código fuente
COPY . .

# Compilar el frontend
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Ejecutar el servidor de desarrollo
CMD ["npm", "start"]