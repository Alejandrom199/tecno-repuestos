const productoService = require('../../src/services/Producto.service');
// YA NO importamos el Modelo, importamos el Repositorio
const { productoRepository } = require('../../src/repositories/index');

// Mockeamos el método guardar del repositorio
jest.spyOn(productoRepository, 'guardar');

describe('Unitarias: Producto Service (Lógica de Negocio)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Debe registrar un producto si los datos son correctos', async () => {
        const datosEntrada = { nombre: 'Mouse', precio: 10, stock: 5 };
        
        // Simulamos respuesta del repositorio
        productoRepository.guardar.mockResolvedValue({ 
            id: 1, ...datosEntrada, activo: true 
        });

        const resultado = await productoService.registrarProducto(datosEntrada);

        expect(resultado.nombre).toBe('Mouse');
        // AHORA verificamos que se llamó al repositorio
        expect(productoRepository.guardar).toHaveBeenCalledTimes(1); 
    });

    test('Debe lanzar error si el precio es negativo', async () => {
        const datosMalos = { nombre: 'Malo', precio: -50 };
        
        await expect(productoService.registrarProducto(datosMalos))
            .rejects.toThrow(/negativos/);
            
        // Aseguramos que NO se llamó al repositorio
        expect(productoRepository.guardar).not.toHaveBeenCalled();
    });
});