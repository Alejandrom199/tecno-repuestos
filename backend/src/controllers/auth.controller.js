const authService = require('../services/auth.service');
const response = require('../utils/response');

exports.registrar = async (req, res, next) => {
    try {
        
        //console.log('CONTROLLER', req.body)
        const usuario = await authService.registrar(req.body);
        response.success(req, res, 201, 'Usuario registrado con éxito', { username: usuario.username });
    } catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        // Llamamos al servicio para validar (asumo que 'resultado' trae { usuario, token })
        const resultado = await authService.login(username, password);

        // CONFIGURACIÓN DE LA COOKIE
        // Esto hace que el navegador guarde el token automáticamente
        res.cookie('token', resultado.token, {
            httpOnly: true,    // Impide que JavaScript acceda al token (Seguridad XSS)
            secure: false,     // Ponlo en true solo si usas HTTPS (producción)
            sameSite: 'lax',   // Necesario para que funcione entre localhost:3000 y 4200
            maxAge: 3600000    // La cookie expira en 1 hora
        });

        // Respondemos al frontend
        response.success(req, res, 200, 'Bienvenido al sistema', resultado);
    } catch (error) {
        next(error);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
    // Usamos tu utilidad de respuesta para mantener la consistencia
    response.success(req, res, 200, 'Sesión cerrada correctamente');
};

exports.checkStatus = async (req, res, next) => {
    try {
        // Si el middleware de auth ya validó al usuario, req.usuario debería existir
        // Simplemente respondemos true para que Angular sepa que la cookie es válida
        res.status(200).json(true);
    } catch (error) {
        // Si hay error o no hay token, respondemos false
        res.status(401).json(false);
    }
};