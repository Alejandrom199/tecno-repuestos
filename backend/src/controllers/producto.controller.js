const productoService = require('../services/producto.service');
const response = require('../utils/response');

exports.obtenerProductos = async (req, res, next) => {
    try {

        const productos = await productoService.listarProductos();
        response.success(req, res, 200, 'Lista de productos obtenida', productos);

    } 
    catch (error) {
        next(error);
    }
};

exports.obtenerProductoPorId = async (req, res, next) => {
    try {

        const producto = await productoService.obtenerPorId(req.params.id);
        response.success(req, res, 200, 'Producto obtenido', producto);

    } 
    catch (error) {
        next(error);
    }
};

exports.crearProducto = async (req, res, next) => {
    try {
    
        const usuario = req.user.username;

        const nuevo = { ...req.body, creadoPor: req.user.username };
        const data = await productoService.registrarProducto(nuevo, usuario);

        response.success(req, res, 201, 'Producto creado exitosamente', data);

    } 
    catch (error) {
        next(error);
    }
};

exports.actualizarProducto = async (req, res, next) => {
    try {

        const actualizado = await productoService.actualizarProducto(req.params.id, req.body);
        response.success(req, res, 200, 'Producto actualizado correctamente', actualizado);
    
    } 
    catch (error) {
        next(error);
    }
};

exports.eliminarProducto = async (req, res, next) => {
    try {
        const resultado = await productoService.eliminarProducto(req.params.id);
        response.success(req, res, 200, 'Producto eliminado correctamente', resultado);
    
    } 
    catch (error) {
        next(error);
    }
};