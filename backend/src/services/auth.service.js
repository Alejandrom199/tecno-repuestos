const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { usuarioRepository } = require('../repositories/index');

const authService = {
    registrar: async (datos) => {
        const existe = await usuarioRepository.buscarPorUsername(datos.username);
        if (existe) throw new Error('El nombre de usuario ya existe');

        // Encriptamos la contraseña (Salting + Hashing)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(datos.password, salt);

        //console.log('SERVICE', datos, passwordHash)
        return await usuarioRepository.guardar({
            ...datos,
            password: passwordHash // Guardamos el hash, no la clave real
        });
    },

    login: async (username, password) => {
        const usuario = await usuarioRepository.buscarPorUsername(username);
        if (!usuario) throw new Error('Credenciales inválidas');

        // Comparamos la clave enviada con el hash guardado
        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) throw new Error('Credenciales inválidas');

        // Generamos el Token
        const token = jwt.sign(
            { id: usuario.id, username: usuario.username, rol: usuario.rol },
            process.env.JWT_SECRET || 'Clave_Super_Secreta_2025',
            { expiresIn: '4h' }
        );

        return { token, usuario: { username: usuario.username, rol: usuario.rol } };
    }
};

module.exports = authService;