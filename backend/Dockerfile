# Imagen base
FROM node:20-alpine

# Carpeta de trabajo
WORKDIR /app

# Instalamos dependencias
COPY package*.json ./

RUN npm install

# Copiamos el resto del código
COPY . .

# EXPONEMOS el puerto (¿Es el 3000?)
EXPOSE 3000 

# Comando de inicio (Usamos npm start para que ejecute tu script "start")
CMD ["npm", "start"]