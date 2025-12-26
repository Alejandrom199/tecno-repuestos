const { productoRepository } = require('../repositories/index');
const logService = require('./log.service');

const productoService = {
    
    listarProductos: async () => {
        const productos = await productoRepository.listar();

        return productos.map(producto => {
            const {creadoPor, ValidadoEn, ...data} = producto;
            return data;
        });
    },

    obtenerPorId: async (id) => {
        const producto = await productoRepository.buscarPorId(id);
        if (!producto) throw new Error('Producto no encontrado');

        const { creadoPor, validadoEn, ...data } = producto;
        return data;
    },

    registrarProducto: async (datos, usuarioEjecutor) => {
        const existe = await productoRepository.buscarPorNombre(datos.nombre);
        if (existe) throw new Error('RN-01: Ya existe un producto con este nombre.');

        const nuevo = await productoRepository.guardar(datos);
        
        const { creadoPor, validadoEn, ...data } = nuevo;
        return data;
    },

    actualizarProducto: async (id, nuevosDatos) => {
        const productoExistente = await productoRepository.buscarPorId(id);

        if (!productoExistente) throw new Error('Producto no encontrado');

        if (productoExistente.categoria === 'Salud' && nuevosDatos.stock < 5) throw new Error('RN-02: Los productos de Salud deben mantener un stock mínimo de seguridad de 5 unidades.');

        if (nuevosDatos.precio < (productoExistente.precio * 0.5)) throw new Error('RN-03: El nuevo precio representa una rebaja mayor al 50%. Requiere autorización administrativa.');

        const actualizado = await productoRepository.actualizar(id, nuevosDatos);

        const {creadoPor, ValidadoEn, ...data} = actualizado;

        return data;
    },

    eliminarProducto: async (id) => {
        const producto = await productoRepository.buscarPorId(id);
        
        if (!producto) throw new Error('Producto no encontrado');

        if (producto.stock > 0) throw new Error(`RN-04: No se puede eliminar el producto "${producto.nombre}" porque aún tiene ${producto.stock} unidades en stock.`);

        const desactivado = await productoRepository.desactivar(id);

        return { id: desactivado.id, activo: false };
    }

};

module.exports = productoService;