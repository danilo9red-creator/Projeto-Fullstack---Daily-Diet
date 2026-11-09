
const express = require('express');

const refeicaoController = require('../controllers/refeicaoController');
const identificarUsuario = require('../middlewares/identificarUsuario');

const router = express.Router();

router.use(identificarUsuario);

router.post('/', refeicaoController.cadastrarRefeicao);

router.get('/', refeicaoController.listarRefeicoes);

router.get('/metricas', refeicaoController.consultarMetricas);

router.get('/:id', refeicaoController.consultarRefeicao);

router.put('/:id', refeicaoController.editarRefeicao);

router.delete('/:id', refeicaoController.excluirRefeicao);

module.exports = router;
