class UsuarioRepositoryMemory {
    constructor() {
        this.usuarios = [];
    }

    async guardar(usuario) {
        const nuevoUsuario = { 
            id: this.usuarios.length + 1, 
            ...usuario, 
            fechaCreacion: new Date() 
        };
        this.usuarios.push(nuevoUsuario);
        //console.log('REPOSITORIO', nuevoUsuario)
        return nuevoUsuario;
    }

    async buscarPorUsername(username) {
        return this.usuarios.find(u => u.username === username) || null;
    }

    async buscarPorEmail(email) {
        return this.usuarios.find(u => u.email === email) || null;
    }
}

module.exports = UsuarioRepositoryMemory;