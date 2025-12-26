const { logRepository } = require('../repositories/index');
const response = require('../utils/response');

exports.listarHistorial = async (req, res, next) => {
    try {
        // Obtenemos todos los logs guardados en memoria
        const historial = await logRepository.listar();
        
        // Usamos tu utilidad de respuesta estándar
        response.success(req, res, 200, 'Historial de auditoría obtenido correctamente', historial);
    } catch (error) {
        next(error);
    }
};