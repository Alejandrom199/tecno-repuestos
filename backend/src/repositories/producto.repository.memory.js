class ProductoRepositoryMemory {
    constructor() {
        this.bd = [];
        this.idCounter = 1;
    }
    async guardar(datos) {
        const nuevo = { id: this.idCounter++, ...datos, activo: true };
        this.bd.push(nuevo);
        return nuevo;
    }
    async listar() {
        return this.bd.filter(p => p.activo === true);
    }
    async buscarPorId(id) {
        return this.bd.find(p => p.id === Number(id)) || null;
    }
    async actualizar(id, datos) {
        const index = this.bd.findIndex(p => p.id === Number(id));
        if (index === -1) return null;
        this.bd[index] = { ...this.bd[index], ...datos };
        return this.bd[index];
    }
    async eliminar(id) {
        const index = this.bd.findIndex(p => p.id === Number(id));
        if (index !== -1) {
            this.bd[index].activo = false;
            return true;
        }
        return false;
    }
}
module.exports = ProductoRepositoryMemory;