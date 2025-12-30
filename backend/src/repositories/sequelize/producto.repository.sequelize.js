const ProductoModel = require('../../models/producto.model');

class ProductoRepositorySequelize {
    async guardar(datos) {
        const producto = await ProductoModel.create(datos);
        // .get({ plain: true }) convierte la instancia de Sequelize en un JSON puro
        return producto.get({ plain: true });
    }

    async listar() {
        // raw: true hace que Sequelize devuelva directamente los datos de la tabla
        return await ProductoModel.findAll({ 
            where: { activo: true },
            raw: true 
        });
    }

    async buscarPorId(id) {
        const producto = await ProductoModel.findByPk(id);
        return producto ? producto.get({ plain: true }) : null;
    }

    async buscarPorNombre(nombre) {
        const producto = await ProductoModel.findOne({ 
            where: { nombre: nombre },
            raw: true 
        });
        return producto;
    }

    async actualizar(id, datos) {
        await ProductoModel.update(datos, { where: { id } });
        // Reutilizamos buscarPorId que ya devuelve el objeto limpio
        return await this.buscarPorId(id);
    }

    async desactivar(id){
        const producto = await ProductoModel.findByPk(id);
        if(producto){
            const actualizado = await producto.update({ activo: false });
            return actualizado.get({ plain: true });
        }
        return null;
    }

    async eliminar(id) {
        // Eliminación lógica
        await ProductoModel.update({ activo: false }, { where: { id } });
        return true;
    }
}

module.exports = ProductoRepositorySequelize;