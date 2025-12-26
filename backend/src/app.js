const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db'); // Solo importamos la función de conexión

const auth = require('./middlewares/auth.middleware');
const logger = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');

const productoRoutes = require('./routes/producto.route');
const auditoriaRoutes = require('./routes/auditoria.route');
const authRoutes = require('./routes/auth.route');

const app = express();

// Middlewares globales
app.use(express.json());
app.use(cors());

app.use(logger);

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/auditoria', auditoriaRoutes);

app.use(errorHandler)

// --- Arranque del Servidor ---
// Solo arrancamos si no es un test
if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    const iniciar = async () => {
        // PASO 1: Intentar conectar infraestructura (DB)
        // app.js NO sabe si es memoria o SQL, solo manda conectar.
        await connectDB(); 

        // PASO 2: Levantar servicio HTTP
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
            console.log(`Modo de Base de Datos: ${process.env.DB_TYPE || 'mysql'}`);
        });
    };

    iniciar();
}

module.exports = app;