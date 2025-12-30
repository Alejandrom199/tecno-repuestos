const UsuarioModel = require('../../models/usuario.model'); 

class UsuarioRepositorySequelize {
    async guardar(usuario) {
        return await UsuarioModel.create(usuario);
    }

    async buscarPorUsername(username) {
        return await UsuarioModel.findOne({ where: { username } });
    }

    async buscarPorEmail(email) {
        return await UsuarioModel.findOne({ where: { email } });
    }
}

module.exports = UsuarioRepositorySequelize;