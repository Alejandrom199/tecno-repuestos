# 1. Imagen base
FROM node:20-alpine

# 2. Carpeta de trabajo
WORKDIR /app

# 3. Instalamos dependencias
COPY package*.json ./
RUN npm install

# 4. Copiamos el resto del código
COPY . .

# 5. EXPONEMOS el puerto (¿Es el 3000?)
EXPOSE 3000 

# 6. Comando de inicio (Usamos npm start para que ejecute tu script "start")
CMD ["npm", "start"]