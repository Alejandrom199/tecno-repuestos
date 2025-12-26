const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    // Extraemos el token eliminando la palabra "Bearer "
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado. No se proporcionó un token." });
    }

    try {
        // Usamos la misma clave del .env
        const claveSecreta = process.env.JWT_SECRET || 'Clave_Super_Secreta_2025';
        const decoded = jwt.verify(token, claveSecreta);
        
        req.user = decoded; 
        next();
    } catch (error) {
        console.log("Error de validación:", error.message);
        return res.status(403).json({ error: "Token inválido o expirado." });
    }
};

module.exports = auth;