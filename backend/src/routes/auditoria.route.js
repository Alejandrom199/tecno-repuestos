const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoria.controller');
const auth = require('../middlewares/auth.middleware');

// Definimos la ruta GET para el listado
router.get('/', auth, auditoriaController.listarHistorial);

module.exports = router;