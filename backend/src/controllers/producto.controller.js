const productoService = require('../services/producto.service');
const response = require('../utils/response');

exports.crearProducto = async (req, res) => {
    try {
        const nuevoProducto = await productoService.registrarProducto(req.body);
        response.success(req, res, 201, 'Producto creado exitosamente', nuevoProducto);
    } catch (error) {
        // Lógica para detectar si es error de validación (400) o de servidor (500)
        const codigo = error.message.includes('RN-') ? 400 : 500;
        response.error(req, res, codigo, error.message, error.stack);
    }
};

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await productoService.listarProductos();
        response.success(req, res, 200, 'Lista de productos obtenida', productos);
    } catch (error) {
        response.error(req, res, 500, error.message, error.stack);
    }
};

exports.obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await productoService.obtenerPorId(req.params.id);
        response.success(req, res, 200, 'Producto obtenido', producto);
    } catch (error) {
        // Si el servicio lanza "No encontrado", devolvemos 404
        const codigo = error.message.includes('no encontrado') ? 404 : 500;
        response.error(req, res, codigo, error.message, error.stack);
    }
};

exports.actualizarProducto = async (req, res) => {
    try {
        const actualizado = await productoService.actualizarProducto(req.params.id, req.body);
        response.success(req, res, 200, 'Producto actualizado correctamente', actualizado);
    } catch (error) {
        // Puede fallar por no encontrado (404) o por validación de precio (400)
        let codigo = 500;
        if (error.message.includes('no encontrado')) codigo = 404;
        if (error.message.includes('RN-')) codigo = 400;

        response.error(req, res, codigo, error.message, error.stack);
    }
};

exports.eliminarProducto = async (req, res) => {
    try {
        const resultado = await productoService.eliminarProducto(req.params.id);
        response.success(req, res, 200, 'Producto eliminado correctamente', resultado);
    } catch (error) {
        const codigo = error.message.includes('no encontrado') ? 404 : 500;
        response.error(req, res, codigo, error.message, error.stack);
    }
};