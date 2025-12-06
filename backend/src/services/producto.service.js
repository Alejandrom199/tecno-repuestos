// IMPORTANTE: Importamos el repositorio, NO el modelo
const { productoRepository } = require('../repositories/index');

const productoService = {

    registrarProducto: async (datos) => {
        // Validaciones de Negocio
        if (datos.precio < 0 || datos.stock < 0) {
            throw new Error('RN-03: El precio y el stock no pueden ser negativos.');
        }
        // Delegamos al repo
        return await productoRepository.guardar(datos);
    },

    listarProductos: async () => {
        return await productoRepository.listar();
    },

    obtenerPorId: async (id) => {
        const producto = await productoRepository.buscarPorId(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        return producto;
    },

    actualizarProducto: async (id, nuevosDatos) => {
        // Verificamos existencia primero
        const producto = await productoRepository.buscarPorId(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        // Validaciones de Negocio
        if (nuevosDatos.precio < 0 || nuevosDatos.stock < 0) {
            throw new Error('RN-03: No se permiten valores negativos.');
        }

        return await productoRepository.actualizar(id, nuevosDatos);
    },

    eliminarProducto: async (id) => {
        const producto = await productoRepository.buscarPorId(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        await productoRepository.eliminar(id);
        return { mensaje: 'Producto deshabilitado correctamente (Borrado Lógico)' };
    }
};

module.exports = productoService;