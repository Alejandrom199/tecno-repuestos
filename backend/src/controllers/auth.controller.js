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
        
        // Llamamos al servicio para validar
        const resultado = await authService.login(username, password);

        response.success(req, res, 200, 'Bienvenido al sistema', resultado);
    } catch (error) {
        next(error);
    }
};