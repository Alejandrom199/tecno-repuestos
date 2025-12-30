const productoService = require('../../src/services/producto.service');
const { productoRepository } = require('../../src/repositories/index');

// Espiamos los métodos del repositorio para controlar su comportamiento
jest.spyOn(productoRepository, 'guardar');
jest.spyOn(productoRepository, 'buscarPorNombre');

describe('Unitarias: Producto Service (Lógica de Negocio)', () => {

    // Limpiamos los mocks antes de cada test para asegurar independencia
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe registrar un producto si los datos son correctos', async () => {
        // Incluimos descripción y categoría para coincidir con tu nuevo modelo
        const datosEntrada = { 
            nombre: 'Mouse Gamer', 
            categoria: 'Periféricos',
            descripcion: 'Mouse óptico 3200 DPI',
            precio: 25.00, 
            stock: 10 
        };
        
        // Simulación: El nombre NO existe
        productoRepository.buscarPorNombre.mockResolvedValue(null);
        
        // Simulación: Guardado exitoso con ID generado
        productoRepository.guardar.mockResolvedValue({ 
            id: 1, 
            ...datosEntrada, 
            activo: true 
        });

        const resultado = await productoService.registrarProducto(datosEntrada);

        // Verificaciones
        expect(resultado.nombre).toBe('Mouse Gamer');
        expect(resultado.id).toBe(1);
        expect(productoRepository.guardar).toHaveBeenCalledTimes(1);
        // Verificamos que se guardó con el precio correcto (punto decimal)
        expect(resultado.precio).toBe(25.00);
    });

    test('Debe lanzar error si el nombre del producto ya existe (RN-01)', async () => {
        const datosEntrada = { nombre: 'Teclado Duplicado', precio: 50 };
        
        // Simulación: El repositorio SI encuentra un producto existente
        productoRepository.buscarPorNombre.mockResolvedValue({ 
            id: 5, 
            nombre: 'Teclado Duplicado' 
        });

        // Verificamos que la promesa sea rechazada con el mensaje esperado
        await expect(productoService.registrarProducto(datosEntrada))
            .rejects.toThrow(/Ya existe/);
            
        // Regla de Oro: Si falla la validación, NUNCA debe tocar la base de datos
        expect(productoRepository.guardar).not.toHaveBeenCalled();
    });
});