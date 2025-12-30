// Imports de Memoria
const ProductoRepositoryMemory = require('./memory/producto.repository.memory');
const LogRepositoryMemory = require('./memory/log.repository.memory');
const UsuarioRepositoryMemory = require('./memory/usuario.repository.memory');

// Imports de Sequelize
const ProductoRepositorySequelize = require('./sequelize/producto.repository.sequelize');
const LogRepositorySequelize = require('./sequelize/log.repository.sequelize');
const UsuarioRepositorySequelize = require('./sequelize/usuario.repository.sequelize');

const DB_TYPE = process.env.DB_TYPE || 'mysql';

let productoRepoInstance;
let logRepoInstance;
let usuarioRepoInstance;

if (DB_TYPE === 'memory') {
    console.log('--- MODO INFRAESTRUCTURA: MEMORIA ---');
    productoRepoInstance = new ProductoRepositoryMemory();
    logRepoInstance = new LogRepositoryMemory(); 
    usuarioRepoInstance = new UsuarioRepositoryMemory();
} 
else {
    console.log(`--- MODO INFRAESTRUCTURA: SEQUELIZE (${DB_TYPE}) ---`);
    
    // Aquí es donde Sequelize toma el control
    productoRepoInstance = new ProductoRepositorySequelize();
    logRepoInstance = new LogRepositorySequelize(); 
    usuarioRepoInstance = new UsuarioRepositorySequelize();
}

module.exports = { 
    productoRepository: productoRepoInstance,
    logRepository: logRepoInstance,
    usuarioRepository: usuarioRepoInstance
};