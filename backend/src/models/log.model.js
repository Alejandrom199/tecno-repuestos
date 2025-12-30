const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Log = sequelize.define('Log', {
    usuario: DataTypes.STRING,
    accion: DataTypes.STRING,
    entidad: DataTypes.STRING,
    entidadId: DataTypes.INTEGER,
    detalles: DataTypes.JSON
}, { 
    tableName: 'auditoria_logs', 
    timestamps: true,
    updatedAt: false  
});

module.exports = Log;