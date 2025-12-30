# Etapa 1: Construcción
FROM node:20-alpine AS build-step
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build --configuration=production

# Etapa 2: Nginx
FROM nginx:alpine

# Limpiamos CUALQUIER configuración y archivo previo de Nginx
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/conf.d/*

# Copiamos TODO el dist a una carpeta temporal
COPY --from=build-step /app/dist /tmp/dist

# BUSCADOR DINÁMICO: Encuentra la carpeta que contiene el index.html y mueve su contenido
RUN TARGET_DIR=$(find /tmp/dist -name index.html -exec dirname {} \;) && \
    cp -r $TARGET_DIR/. /usr/share/nginx/html/

# Copiamos tu nginx.conf que está en la raíz del proyecto
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]