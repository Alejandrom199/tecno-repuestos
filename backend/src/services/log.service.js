const { logRepository } = require('../repositories/index');

const logService = {
    registrar: async (usuario, accion, entidad, entidadId, detalles) => {
        try {
            await logRepository.guardar({
                usuario: usuario || 'SISTEMA',
                accion: accion, // CREAR, ELIMINAR, etc.
                entidad: entidad, // PRODUCTO
                entidadId: entidadId,
                detalles: detalles
            });
        } catch (error) {
            // Logueamos el error en consola para no detener la ejecución principal
            console.error('Error al persistir el log:', error.message);
        }
    }
};

module.exports = logService;