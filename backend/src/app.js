const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db'); // Solo importamos la función de conexión
const productoRoutes = require('./routes/Producto.route');

const app = express();

// --- Middlewares ---
app.use(express.json());
app.use(cors());

// --- Rutas ---
app.use('/api/productos', productoRoutes);

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