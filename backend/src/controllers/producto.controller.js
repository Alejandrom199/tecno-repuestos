const productoService = require('../services/Producto.service');

exports.crearProducto = async (req, res) => {
    try {
        const producto = await productoService.registrarProducto(req.body);
        res.status(201).json({ mensaje: 'Éxito', producto });
    } catch (error) {
        // Si es error de validación (nuestra regla), devolvemos 400 Bad Request
        res.status(400).json({ error: error.message });
    }
};

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await productoService.listarProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await productoService.obtenerPorId(req.params.id);
        res.status(200).json(producto);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.actualizarProducto = async (req, res) => {
    try {
        const actualizado = await productoService.actualizarProducto(req.params.id, req.body);
        res.status(200).json({ mensaje: 'Actualizado', producto: actualizado });
    } catch (error) {
        // Puede ser 404 (no encontrado) o 400 (precio negativo)
        res.status(400).json({ error: error.message });
    }
};

exports.eliminarProducto = async (req, res) => {
    try {
        const resultado = await productoService.eliminarProducto(req.params.id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};