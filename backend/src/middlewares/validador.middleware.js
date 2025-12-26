const validarProducto = (req, res, next) => {
    const { nombre, precio, stock } = req.body;

    // Validación de existencia y formato básico
    if (!nombre || nombre.length < 3) {
        return res.status(400).json({ error: "El nombre es obligatorio y debe tener al menos 3 caracteres." });
    }

    // El middleware se asegura de que precio y stock SEAN números y no nulos
    if (precio === undefined || typeof precio !== 'number' || precio < 0) {
        return res.status(400).json({ error: "El precio debe ser un número positivo." });
    }

    if (stock === undefined || typeof stock !== 'number' || stock < 0) {
        return res.status(400).json({ error: "El stock debe ser un número positivo." });
    }

    req.validadoEn = new Date().toISOString();
    next();
};

module.exports = validarProducto;