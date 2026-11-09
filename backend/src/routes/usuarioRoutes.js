
const express = require('express');

const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.post('/', usuarioController.cadastrarUsuario);

router.get('/:id', usuarioController.consultarUsuario);

router.put('/:id', usuarioController.editarUsuario);

module.exports = router;
