const path = require('path');
const dotenv = require('dotenv');

const ambiente = process.env.NODE_ENV || 'development';

// Intentamos cargar el archivo, pero si falla no matamos la app 
// porque Docker puede inyectar las variables directamente
const envPath = path.resolve(__dirname, `../../../.env.${ambiente}`);
dotenv.config({ path: envPath });

// Solo mostramos error en desarrollo si falta el archivo
if (!process.env.DB_HOST && ambiente === 'development') {
    console.error(`❌ No se encontró el archivo .env.${ambiente} y no hay variables inyectadas.`);
} else {
    console.log(`✅ Configuración cargada [Modo: ${ambiente}]`);
    console.log(`   Host DB: ${process.env.DB_HOST}`);
}