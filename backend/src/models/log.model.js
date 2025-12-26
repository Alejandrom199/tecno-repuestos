const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Log = sequelize.define('Log', {
    usuario: DataTypes.STRING,
    accion: DataTypes.STRING,    // "CREAR", "ACTUALIZAR", "ELIMINAR"
    entidad: DataTypes.STRING,   // "PRODUCTO"
    entidadId: DataTypes.INTEGER,
    detalles: DataTypes.JSON,    // Guardamos qué cambió
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { tableName: 'auditoria_logs', timestamps: false });

module.exports = Log;