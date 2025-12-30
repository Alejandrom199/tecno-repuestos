# Etapa 1: Construcción
FROM node:20-alpine AS build-step
WORKDIR /app

# Al usar el contexto de la raíz (.), debemos especificar la carpeta frontend
COPY frontend/package*.json ./
RUN npm install

# Copiamos el contenido de la carpeta frontend al WORKDIR (/app)
COPY frontend/ .
RUN npm run build --configuration=production

# Etapa 2: Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/conf.d/*

COPY --from=build-step /app/dist /tmp/dist

RUN TARGET_DIR=$(find /tmp/dist -name index.html -exec dirname {} \;) && \
    cp -r $TARGET_DIR/. /usr/share/nginx/html/

# --- CAMBIO CLAVE AQUÍ ---
# Como el contexto es la raíz, Docker busca 'nginx.conf' directamente en la raíz
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]