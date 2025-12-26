const response = require('../utils/response');

const errorHandler = (err, req, res, next) => {
    let codigo = 500;
    
    // Centralizamos la inteligencia de errores aquí
    if (err.message.includes('RN-')) codigo = 400;
    if (err.message.includes('encontrado')) codigo = 404;
    if (err.message.includes('token') || err.message.includes('denegado')) codigo = 401;

    console.error(`[Manejador Global]: ${err.message}`);

    response.error(
        req, 
        res, 
        codigo, 
        err.message, 
        process.env.NODE_ENV === 'development' ? err.stack : null
    );
};

module.exports = errorHandler;