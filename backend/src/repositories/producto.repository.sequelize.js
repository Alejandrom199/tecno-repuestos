const ProductoModel = require('../models/producto.model');

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
    async actualizar(id, datos) {
        await ProductoModel.update(datos, { where: { id } });
        return await this.buscarPorId(id);
    }
    async eliminar(id) {
        await ProductoModel.update({ activo: false }, { where: { id } });
        return true;
    }
}
module.exports = ProductoRepositorySequelize;