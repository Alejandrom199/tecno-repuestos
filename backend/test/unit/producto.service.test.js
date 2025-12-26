const productoService = require('../../src/services/producto.service');
const { productoRepository } = require('../../src/repositories/index');

// Mockeamos el método guardar del repositorio
jest.spyOn(productoRepository, 'guardar');
jest.spyOn(productoRepository, 'buscarPorNombre');

describe('Unitarias: Producto Service (Lógica de Negocio)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Debe registrar un producto si los datos son correctos', async () => {
        const datosEntrada = { nombre: 'Mouse', precio: 10, stock: 5 };
        
        // Simulamos que el nombre NO existe aún
        productoRepository.buscarPorNombre.mockResolvedValue(null);
        
        // Simulamos respuesta exitosa del guardado
        productoRepository.guardar.mockResolvedValue({ 
            id: 1, ...datosEntrada, activo: true 
        });

        const resultado = await productoService.registrarProducto(datosEntrada);

        expect(resultado.nombre).toBe('Mouse');
        expect(productoRepository.guardar).toHaveBeenCalledTimes(1); 
    });

    test('Debe lanzar error si el nombre del producto ya existe (RN-01)', async () => {
        const datosEntrada = { nombre: 'Mouse Reclonado', precio: 10 };
        
        // Simulamos que el repositorio SI encuentra un producto con ese nombre
        productoRepository.buscarPorNombre.mockResolvedValue({ id: 10, nombre: 'Mouse Reclonado' });

        await expect(productoService.registrarProducto(datosEntrada))
            .rejects.toThrow(/Ya existe/);
            
        // Verificamos que al fallar la lógica, NUNCA se intentó guardar
        expect(productoRepository.guardar).not.toHaveBeenCalled();
    });
});