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
        const producto = this.bd.find(p => p.id === Number(id));

        if (producto && producto.activo === true) {
            return producto;
        }

        return null;
    }

    async buscarPorNombre(nombre) {
        return this.bd.find(p => p.nombre.toLowerCase() === nombre.toLowerCase()) || null;
    }
    async actualizar(id, datos) {
        const index = this.bd.findIndex(p => p.id === Number(id));
        if (index === -1) return null;
        this.bd[index] = { ...this.bd[index], ...datos };
        return this.bd[index];
    }
    async desactivar(id){
        const index = this.bd.findIndex(p => p.id === Number(id))
        if(index !== -1){
            this.bd[index].activo = false;
            return this.bd[index];
        }
        return null;
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