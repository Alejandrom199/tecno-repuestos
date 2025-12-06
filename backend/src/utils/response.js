
/**
 * Estructura estándar de respuesta exitosa
 * @param {Object} res - Objeto response de Express
 * @param {Number} status - Código HTTP (200, 201)
 * @param {String} message - Mensaje descriptivo
 * @param {Object} data - Los datos a devolver
 */
exports.success = (req, res, status = 200, message = '', data = {}) => {
    res.status(status).send({
        error: false,
        code: status,
        message: message,
        data: data || null
    });
};

/**
 * Estructura estándar de respuesta de error
 * @param {Object} res - Objeto response de Express
 * @param {Number} status - Código HTTP (400, 404, 500)
 * @param {String} message - Mensaje del error
 * @param {Object} details - Detalles técnicos (opcional)
 */
exports.error = (req, res, status = 500, message = 'Error interno', details = null) => {
    res.status(status).send({
        error: true,
        code: status,
        message: message,
        details: details
    });
};