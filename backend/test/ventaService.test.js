const { validarStock, calcularSubtotal } = require('../src/services/ventaService');
describe('Pruebas de Lógica de Negocio', () => {

    test('Debe validar que hay stock suficiente', () => {
        expect(validarStock(5, 10)).toBe(true);
    });

    test('Debe rechazar la venta si no hay stock', () => {
        expect(validarStock(15, 10)).toBe(false);
    });

    test('Debe calcular correctamente el subtotal', () => {
        // 2 productos a $15.50 cada uno = $31.00
        expect(calcularSubtotal(2, 15.50)).toBe(31.00);
    });

});