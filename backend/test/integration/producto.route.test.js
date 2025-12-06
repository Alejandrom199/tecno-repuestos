const request = require('supertest');

const app = require('../../src/app');
const { sequelize } = require('../../src/config/db');

// Antes de las pruebas
beforeAll(async () => {
    // Solo intentamos conectar si sequelize existe (Modo SQL)
    if (sequelize) {
        await sequelize.authenticate();
        // await sequelize.sync({ force: true });
    }
});

// Al terminar
afterAll(async () => {
    // Solo cerramos conexión si existe
    if (sequelize) {
        await sequelize.close();
    }
});

describe('Integración: API Productos', () => {

    test('POST /api/productos -> Debe crear producto y devolver 201', async () => {
        const nuevoProducto = {
            nombre: "Producto Test Integración",
            categoria: "Pruebas",
            precio: 25.50,
            stock: 100
        };

        const response = await request(app)
            .post('/api/productos')
            .send(nuevoProducto);

        expect(response.statusCode).toBe(201);
        // Asegúrate de que tu Controller devuelva "Éxito" con tilde, si no cámbialo aquí
        expect(response.body.mensaje).toContain('xito'); 
        expect(response.body.producto.nombre).toBe(nuevoProducto.nombre);
        // Verificar que tiene ID (significa que vino de la BD)
        expect(response.body.producto.id).toBeDefined();
    });

    test('POST /api/productos -> Debe devolver 400 si el precio es negativo', async () => {
        const productoMalo = {
            nombre: "Producto Invalido",
            precio: -10,
            stock: 10
        };

        const response = await request(app)
            .post('/api/productos')
            .send(productoMalo);

        // Esperamos el Bad Request que programamos en el Controller
        expect(response.statusCode).toBe(400);
        // Verificamos que el mensaje de error contenga la palabra clave
        expect(response.body.error).toContain('no pueden ser negativos');
    });

    test('GET /api/productos -> Debe devolver un array JSON y estado 200', async () => {
        const response = await request(app).get('/api/productos');

        expect(response.statusCode).toBe(200);
        // Debe ser un arreglo (Array)
        expect(Array.isArray(response.body)).toBe(true);
        // Como creamos uno en el test anterior, el array debe tener al menos 1 elemento
        expect(response.body.length).toBeGreaterThan(0);
    });
});