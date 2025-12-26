class LogRepositoryMemory {
    constructor() {
        this.logs = [];
    }

    async guardar(log) {
        const nuevoLog = { id: this.logs.length + 1, ...log, fecha: new Date() };
        this.logs.push(nuevoLog);
        console.log("LOG REGISTRADO:", nuevoLog); // Para que lo veas en consola
        return nuevoLog;
    }

    async listar() {
        return this.logs;
    }
}

module.exports = LogRepositoryMemory;