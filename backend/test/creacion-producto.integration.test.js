const request = require('supertest');
const app = require('../src/app'); // Importamos nuestra app

describe('Prueba de Integración: API Productos', () => {

    test('POST /api/productos debe registrar un producto y devolver 201', async () => {
        // 1. Datos de prueba
        const nuevoProducto = {
            nombre: "Cable de Red",
            precio: 5.50
        };

        // 2. Simulamos la petición POST (sin abrir el navegador)
        const response = await request(app)
            .post('/api/productos')
            .send(nuevoProducto);

        // 3. Verificamos que la respuesta sea correcta (Criterios de aceptación)
        expect(response.statusCode).toBe(201); // Que devuelva "Creado"
        expect(response.body.mensaje).toBe("Producto creado");
        expect(response.body.producto.nombre).toBe("Cable de Red");
    });

});