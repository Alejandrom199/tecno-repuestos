const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const verificarToken = require('../middlewares/auth.middleware'); 

router.post('/registrar', authController.registrar);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/check', verificarToken, authController.checkStatus);

module.exports = router;