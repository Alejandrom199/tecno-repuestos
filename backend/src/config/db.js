//version 1
/*const { Sequelize } = require('sequelize');

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
else if (DB_TYPE === 'memory') {
    console.log("Infraestructura: Inicializando SQLite (Memoria para Tests)");
    sequelizeInstance = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:', 
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
            logging: false,
            pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
        }
    );
} 


async function connectDB() {
    if (DB_TYPE === 'memory' && sequelizeInstance) {
        await sequelizeInstance.sync({ force: true });
        return;
    }

    if (!sequelizeInstance) {
        console.log("Infraestructura: Error - Instancia no creada.");
        process.exit(1);
    }

    let retries = 5; // Número de intentos
    while (retries) {
        try {
            await sequelizeInstance.authenticate();
            await sequelizeInstance.sync({ force: false }); 
            console.log('✅ Base de datos conectada y sincronizada.');
            return; // Éxito, salimos de la función
        } catch (error) {
            retries -= 1;
            console.error(`❌ Error de BD (Intentos restantes: ${retries}):`, error.message);
            if (retries === 0) process.exit(1);
            
            // Esperamos 5 segundos antes de reintentar para dar tiempo a MySQL
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}

module.exports = { sequelize: sequelizeInstance, connectDB };*/

//version 2
const { Sequelize } = require('sequelize');

const DB_TYPE = process.env.DB_TYPE || 'mysql';
let sequelizeInstance = null;

if (DB_TYPE === 'sqlite') {
    sequelizeInstance = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false
    });
} 
else if (DB_TYPE === 'memory') {
    sequelizeInstance = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:', 
        logging: false
    });
}
else if (DB_TYPE === 'mysql') {
    console.log("Infraestructura: Inicializando MySQL (Cloud Mode)");
    
    // Priorizamos DATABASE_URL para servicios como Aiven/Render
    if (process.env.DATABASE_URL) {
        sequelizeInstance = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'mysql',
            logging: false,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false // Vital para conectar con Aiven desde Render
                }
            },
            pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
        });
    } else {
        // Fallback para desarrollo local tradicional
        sequelizeInstance = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: 'mysql',
                logging: false,
                pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
            }
        );
    }
}

async function connectDB() {
    if (DB_TYPE === 'memory' && sequelizeInstance) {
        await sequelizeInstance.sync({ force: true });
        return;
    }

    if (!sequelizeInstance) {
        console.error("Infraestructura: Error - Instancia no creada.");
        process.exit(1);
    }

    let retries = 5;
    while (retries) {
        try {
            await sequelizeInstance.authenticate();
            // En producción usamos force: false para no borrar los datos reales
            await sequelizeInstance.sync({ force: false }); 
            console.log('✅ Base de datos conectada y sincronizada.');
            return;
        } catch (error) {
            retries -= 1;
            console.error(`❌ Error de BD (Intentos restantes: ${retries}):`, error.message);
            if (retries === 0) process.exit(1);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}

module.exports = { sequelize: sequelizeInstance, connectDB };