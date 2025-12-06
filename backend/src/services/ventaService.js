const ventaService = {

    /**
     * Valida si existe stock suficiente para una venta.
     * Retorna true si se puede vender, false si no alcanza.
     */
    validarStock: (cantidadSolicitada, stockActual) => {
        // Regla de negocio: No se pueden pedir cantidades negativas o cero
        if (cantidadSolicitada <= 0) {
            return false;
        }
        
        // Regla de negocio: El stock no puede quedar negativo
        if (stockActual < cantidadSolicitada) {
            return false;
        }

        return true;
    },

    /**
     * Calcula el subtotal de un ítem (cantidad * precio).
     * Asegura que el resultado tenga máximo 2 decimales.
     */
    calcularSubtotal: (cantidad, precioUnitario) => {
        if (cantidad < 0 || precioUnitario < 0) {
            throw new Error("No se admiten valores negativos");
        }
        
        const total = cantidad * precioUnitario;
        // Redondeamos a 2 decimales para evitar errores de moneda (ej: 10.99999)
        return Number(total.toFixed(2));
    }
};

module.exports = ventaService;