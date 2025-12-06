require('dotenv').config();
const { Sequelize } = require('sequelize');

const DB_TYPE = process.env.DB_TYPE || 'mysql';
let sequelizeInstance = null;

if (DB_TYPE === 'sqlite') {
    console.log("Infraestructura: Inicializando SQLite");
    sequelizeInstance = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false
    });
} 
else if (DB_TYPE === 'mysql') {
    console.log("Infraestructura: Inicializando MySQL");
    sequelizeInstance = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            logging: false
        }
    );
} 
else {
    console.log("Infraestructura: Modo Memoria (Sin conexión SQL activa)");
}

// app.js llamará a esto sin importarle si es mysql, sqlite o memoria
async function connectDB() 
{
    if (!sequelizeInstance) 
        {
        return; // Si es memoria, no hay nada que conectar. Salimos silenciosamente.
    }
    try 
    {
        // Sincronizamos modelos solo si hay instancia SQL
        // require('../models/Producto.model'); // Asegurar carga de modelos antes de sync
        await sequelizeInstance.authenticate();
        await sequelizeInstance.sync({ force: false }); 

        console.log('Base de datos conectada y sincronizada.');
    } catch (error) 
    {

        console.error('Error fatal de base de datos:', error.message);
        process.exit(1); // Si falla la BD en producción, la app debe morir
    }
}

module.exports = { sequelize: sequelizeInstance, connectDB };