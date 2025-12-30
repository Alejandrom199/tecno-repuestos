const LogModel = require('../../models/log.model'); 

class LogRepositorySequelize {
    async guardar(log) {
        // Sequelize manejará automáticamente la fecha con createdAt
        return await LogModel.create(log);
    }

    async listar() {
        return await LogModel.findAll({
            order: [['createdAt', 'DESC']] 
        });
    }
}

module.exports = LogRepositorySequelize;