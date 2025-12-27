const { logRepository } = require('../repositories/index');

const auditoriaService = {
    obtenerHistorial: async () => {
        return await logRepository.listar();
    }
};

module.exports = auditoriaService;