const jwt = require('jsonwebtoken');
const response = require('../utils/response'); // Opcional si quieres responder directo

const auth = (req, res, next) => {
    const token = req.cookies?.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

    if (!token) {
        // En lugar de enviar false, creamos un error y lo mandamos al manejador global
        const error = new Error('Acceso denegado: No se proporcionó un token');
        error.status = 401;
        return next(error);
    }

    try {
        const claveSecreta = process.env.JWT_SECRET || 'Clave_Super_Secreta_2025';
        const decoded = jwt.verify(token, claveSecreta);
        
        req.user = decoded; 
        next();
    } catch (error) {
        // Pasamos el error de JWT (firma inválida, expirado, etc.) al manejador global
        next(error); 
    }
};

module.exports = auth;