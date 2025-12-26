require('dotenv').config();

const ProductoRepositoryMemory = require('./memory/producto.repository.memory');
const LogRepositoryMemory = require('./memory/log.repository.memory');
const UsuarioRepositoryMemory = require('./memory/usuario.repository.memory');

const DB_TYPE = process.env.DB_TYPE || 'mysql';

let productoRepoInstance;
let logRepoInstance; // 1. Declaramos ambas aquí arriba

if (DB_TYPE === 'memory') {
    console.log('Repository: Usando Arrays en Memoria');
    productoRepoInstance = new ProductoRepositoryMemory();
    logRepoInstance = new LogRepositoryMemory(); 
    usuarioRepoInstance = new UsuarioRepositoryMemory();
} 
else {
    console.log(`Repository: Usando Sequelize (${DB_TYPE})`);
    
    require('../models/producto.model'); 
    const ProductoRepositorySequelize = require('./producto.repository.sequelize');
    
    productoRepoInstance = new ProductoRepositorySequelize();
    logRepoInstance = new LogRepositoryMemory(); 
    usuarioRepoInstance = new UsuarioRepositoryMemory();
}

module.exports = { 
    productoRepository: productoRepoInstance,
    logRepository: logRepoInstance,
    usuarioRepository: usuarioRepoInstance
};