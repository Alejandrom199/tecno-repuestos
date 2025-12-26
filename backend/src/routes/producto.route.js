const express = require('express');
const router = express.Router();

const productoController = require('../controllers/producto.controller');

const validarProducto = require('../middlewares/validador.middleware');
const auth = require('../middlewares/auth.middleware')


router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProductoPorId);

router.post('/', auth, validarProducto, productoController.crearProducto);

router.put('/:id', auth, validarProducto, productoController.actualizarProducto);

router.delete('/:id', auth, productoController.eliminarProducto);

module.exports = router;