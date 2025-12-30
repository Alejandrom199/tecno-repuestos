const response = require('../utils/response');

const errorHandler = (err, req, res, next) => {
    let codigo = 500;
    let mensaje = err.message;

    // 1. Errores de JWT (Autenticación)
    if (err.name === 'JsonWebTokenError') {
        codigo = 401;
        mensaje = 'Token inválido: firma no coincide o formato incorrecto';
    } else if (err.name === 'TokenExpiredError') {
        codigo = 401;
        mensaje = 'El token ha expirado';
    }
    
    // 2. Errores de Base de Datos (Sequelize)
    else if (err.name === 'SequelizeUniqueConstraintError') {
        codigo = 400;
        mensaje = 'El registro ya existe (Dato duplicado)';
    } else if (err.name === 'SequelizeValidationError') {
        codigo = 400;
        mensaje = err.errors.map(e => e.message).join(', ');
    }

    // 3. Tus reglas de negocio manuales
    else {
        if (mensaje.includes('RN-')) codigo = 400;
        if (mensaje.includes('encontrado')) codigo = 404;
        if (mensaje.includes('token') || mensaje.includes('denegado') || mensaje.includes('inválid')) codigo = 401;
    }

    console.error(`[Manejador Global]: ${mensaje}`);

    response.error(
        req, 
        res, 
        codigo, 
        mensaje, 
        process.env.NODE_ENV === 'development' ? err.stack : null
    );
};

module.exports = errorHandler;