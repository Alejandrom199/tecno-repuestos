const logService = require('../services/log.service');

const logger = (req, res, next) => {
    const inicio = Date.now();
    
    res.on('finish', async () => {
        const duracion = Date.now() - inicio;
        
        // 1. Consola (Feedback rápido para ti)
        console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} (${duracion}ms)`);

        // 2. Persistencia (Auditoría real)
        if (req.method !== 'GET' || res.statusCode >= 400) {
            
            const usuario = req.user?.username || 'ANONIMO';
            const accion = `${req.method} ${req.originalUrl}`;
            
            const entidadId = req.params?.id || null;
            const partesUrl = req.originalUrl.split('/');
            const entidad = partesUrl[2]?.toUpperCase() || 'SISTEMA';

            await logService.registrar(
                usuario,
                accion,
                entidad,
                entidadId, 
                {
                    statusCode: res.statusCode,
                    duracion: `${duracion}ms`,
                    // Guardamos si hubo un error para filtrar rápido después
                    error: res.statusCode >= 400,
                    query: req.query
                }
            );
        }
    });

    next();
};

module.exports = logger;