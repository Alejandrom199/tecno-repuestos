require('./config/env');
const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/db'); // Solo importamos la función de conexión

const auth = require('./middlewares/auth.middleware');
const logger = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');

const productoRoutes = require('./routes/producto.route');
const auditoriaRoutes = require('./routes/auditoria.route');
const authRoutes = require('./routes/auth.route');

const app = express();

// Middlewares globales

const allowedOrigins = [
  'http://localhost:4200', // Desarrollo
  'https://tecno-repuestos.netlify.app' // URL real de tu frontend en Netlify
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como Postman o Server-to-Server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`Bloqueado por CORS: ${origin}`);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true, // Vital para recibir las Cookies HttpOnly
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares Globales
app.use(express.json());
app.use(cookieParser());
app.use(logger);

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/auditoria', auditoriaRoutes);

app.use(errorHandler)

// Arranque del Servidor 
if (require.main === module) {
    // Render asigna dinámicamente el puerto mediante process.env.PORT
    const PORT = process.env.PORT || 3000;

    const iniciar = async () => {
        try {
            await connectDB(); 

            // Escuchamos en '0.0.0.0' para que sea accesible fuera del contenedor/nodo de Render
            app.listen(PORT, '0.0.0.0', () => {
                console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
                console.log(`📡 Modo de Base de Datos: ${process.env.DB_TYPE || 'mysql'}`);
            });
        } catch (error) {
            console.error('Fallo crítico al iniciar el servidor:', error);
            process.exit(1);
        }
    };

    iniciar();
}

module.exports = app;