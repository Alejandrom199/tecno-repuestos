const ProductoModel = require('../../models/producto.model');

class ProductoRepositorySequelize {
    async guardar(datos) {
        return await ProductoModel.create(datos);
    }
    async listar() {
        return await ProductoModel.findAll({ where: { activo: true } });
    }
    async buscarPorId(id) {
        return await ProductoModel.findByPk(id);
    }

    async buscarPorNombre(nombre) {
        return await ProductoModel.findOne({where: {nombre: nombre}});
    }

    async actualizar(id, datos) {
        await ProductoModel.update(datos, { where: { id } });
        return await this.buscarPorId(id);
    }
    async desactivar(id){
        const producto = await ProductoModel.findByPk(id);

        if(producto){
            return await producto.update({activo: false})
        }
    }
    async eliminar(id) {
        await ProductoModel.update({ activo: false }, { where: { id } });
        return true;
    }
}
module.exports = ProductoRepositorySequelize;