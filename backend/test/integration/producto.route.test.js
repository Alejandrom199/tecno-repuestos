const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/config/db');
const jwt = require('jsonwebtoken');

// Definimos una clave y un Token de prueba
const JWT_SECRET = process.env.JWT_SECRET || 'Clave_Super_Secreta_2025';
const testToken = jwt.sign(
    { id: 99, username: 'Tester_Admin', rol: 'ADMIN' }, 
    JWT_SECRET, 
    { expiresIn: '1h' }
);

beforeAll(async () => {
    if (sequelize) await sequelize.authenticate();
});

afterAll(async () => {
    if (sequelize) await sequelize.close();
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
            .set('Authorization', `Bearer ${testToken}`)
            .send(nuevoProducto);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toContain('xito');
        expect(response.body.data.nombre).toBe(nuevoProducto.nombre);
    });

    test('POST /api/productos -> Debe devolver 400 si el precio es negativo', async () => {
        const response = await request(app)
            .post('/api/productos')
            .set('Authorization', `Bearer ${testToken}`)
            .send({ nombre: "Malo", precio: -10 });

        expect(response.statusCode).toBe(400);
        // Cambiamos 'message' por 'error' que es lo que manda el middleware
        expect(response.body.error).toContain('positivo'); 
    });

    test('GET /api/productos -> Debe devolver un array JSON y estado 200', async () => {
        const response = await request(app)
            .get('/api/productos')
            .set('Authorization', `Bearer ${testToken}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
    });
});