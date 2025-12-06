// src/repositories/index.js
require('dotenv').config();

// Solo importamos la memoria al principio, porque esa no rompe nada
const ProductoRepositoryMemory = require('./producto.repository.memory');

const DB_TYPE = process.env.DB_TYPE || 'mysql';

let productoRepoInstance;

if (DB_TYPE === 'memory') {
    console.log('Repository: Usando Arrays en Memoria');
    productoRepoInstance = new ProductoRepositoryMemory();
} else {
    console.log(`Repository: Usando Sequelize (${DB_TYPE})`);
    
    // Cargamos el modelo primero para asegurar que existe
    require('../models/producto.model'); 
    
    // Cargamos el repositorio SQL
    const ProductoRepositorySequelize = require('./producto.repository.sequelize');
    productoRepoInstance = new ProductoRepositorySequelize();
}

module.exports = { 
    productoRepository: productoRepoInstance 
};