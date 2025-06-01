# Usar una imagen base oficial de Nginx
FROM nginx:alpine

# Copiar la configuración de Nginx
COPY default.conf /etc/nginx/conf.d/

# Eliminar el archivo predeterminado de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Exponer el puerto
EXPOSE 80

# Entrypoint para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]