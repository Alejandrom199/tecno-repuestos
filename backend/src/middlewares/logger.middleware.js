const logService = require('../services/log.service');

const logger = (req, res, next) => {
    const inicio = Date.now();
    
    // 1. CAPTURA INMEDIATA: Atrapamos al usuario apenas entra la petición
    // Esto evita el 'ANONIMO' en PUT/DELETE
    const usuarioAlEntrar = req.user?.username || null;

    res.on('finish', async () => {
        const duracion = Date.now() - inicio;
        
        // Feedback en consola
        console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} - ${res.statusCode}`);

        if (req.originalUrl.includes('/auth/check')) return;

        if (req.method !== 'GET' || res.statusCode >= 400) {
            
            // Lógica de Usuario robusta
            let usuario = 'ANONIMO';
            if (req.originalUrl.includes('/auth/login') && req.body?.username) {
                usuario = req.body.username; // Caso Login
            } else {
                usuario = req.user?.username || usuarioAlEntrar || 'ANONIMO'; // Caso autenticado
            }
            
            const accion = `${req.method} ${req.originalUrl}`;
            
            // Obtener Entidad e ID de forma segura
            const partesUrl = req.originalUrl.split('?')[0].split('/'); 
            // partesUrl[0]='', partesUrl[1]='api', partesUrl[2]='productos', partesUrl[3]='1'
            
            const entidad = partesUrl[2]?.toUpperCase() || 'SISTEMA';
            // Si el último fragmento es un número, ese es el ID, si no, nulo.
            const posibleId = partesUrl[partesUrl.length - 1];
            const entidadId = isNaN(posibleId) ? null : parseInt(posibleId);

            await logService.registrar(
                usuario,
                accion,
                entidad,
                entidadId, 
                {
                    statusCode: res.statusCode,
                    duracion: `${duracion}ms`,
                    error: res.statusCode >= 400
                }
            );
        }
    });

    next();
};

module.exports = logger;