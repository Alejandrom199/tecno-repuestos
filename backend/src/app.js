const express = require('express');
const app = express();

// Middleware para entender JSON
app.use(express.json());

app.post('/api/productos', (req, res) => {
    // Simulamos que guardamos el producto
    const producto = req.body;
    
    // Respondemos con éxito (201 Created)
    res.status(201).json({
        mensaje: "Producto creado",
        producto: producto
    });
});

module.exports = app; // Exportamos la app para poder probarla