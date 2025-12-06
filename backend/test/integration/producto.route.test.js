const request = require('supertest');
const app = require('../../src/app');
const { sequelize } = require('../../src/config/db');

// Setup de Conexión (Igual que antes)
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
            .send(nuevoProducto);

        if(response.statusCode === 500) console.log('Error: ', JSON.stringify(response.body, null, 2))

        expect(response.statusCode).toBe(201);
        
        // Ahora el mensaje está en .message (definido en utils/response.js)
        expect(response.body.message).toContain('xito'); // Busca "éxito" o "Exito"
        
        // Ahora el producto creado está dentro de .data
        expect(response.body.data.nombre).toBe(nuevoProducto.nombre);
        expect(response.body.data.id).toBeDefined();
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

        expect(response.statusCode).toBe(400);
        
        expect(response.body.message).toContain('no pueden ser negativos');
        
        // También podemos verificar que la bandera error sea true
        expect(response.body.error).toBe(true);
    });

    test('GET /api/productos -> Debe devolver un array JSON y estado 200', async () => {
        const response = await request(app).get('/api/productos');

        expect(response.statusCode).toBe(200);
        
        // La lista de productos está dentro de .data
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
    });
});