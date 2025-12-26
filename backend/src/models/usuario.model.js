const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING, // Aquí guardaremos el hash, no la clave real
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    rol: {
        type: DataTypes.ENUM('ADMIN', 'VENDEDOR'),
        defaultValue: 'VENDEDOR'
    }
}, { tableName: 'usuarios' });

module.exports = Usuario;