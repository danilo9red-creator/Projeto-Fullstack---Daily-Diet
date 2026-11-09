
const refeicaoService = require('../services/refeicaoService');

async function cadastrarRefeicao(req, res) {
  try {
    const { nome, descricao, dataHora, dentroDieta } = req.body;

    if (
      !nome ||
      typeof nome !== 'string' ||
      !nome.trim() ||
      !descricao ||
      typeof descricao !== 'string' ||
      !descricao.trim() ||
      !dataHora ||
      typeof dentroDieta !== 'boolean'
    ) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios e devem ser válidos.'
      });
    }

    const dataConvertida = new Date(dataHora);

    if (Number.isNaN(dataConvertida.getTime())) {
      return res.status(400).json({
        mensagem: 'A data e hora informadas são inválidas.'
      });
    }

    const refeicao = await refeicaoService.criarRefeicao({
      nome: nome.trim(),
      descricao: descricao.trim(),
      dataHora: dataConvertida,
      dentroDieta,
      usuarioId: req.usuarioId
    });

    return res.status(201).json(refeicao);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao cadastrar refeição.'
    });
  }
}

async function listarRefeicoes(req, res) {
  try {
    const refeicoes = await refeicaoService.listarRefeicoes(
      req.usuarioId
    );

    return res.status(200).json(refeicoes);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao listar refeições.'
    });
  }
}

async function consultarRefeicao(req, res) {
  try {
    const { id } = req.params;

    const refeicao = await refeicaoService.buscarRefeicaoPorId(
      id,
      req.usuarioId
    );

    if (!refeicao) {
      return res.status(404).json({
        mensagem: 'Refeição não encontrada.'
      });
    }

    return res.status(200).json(refeicao);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao consultar refeição.'
    });
  }
}

async function editarRefeicao(req, res) {
  try {
    const { id } = req.params;
    const { nome, descricao, dataHora, dentroDieta } = req.body;

    if (
      !nome ||
      typeof nome !== 'string' ||
      !nome.trim() ||
      !descricao ||
      typeof descricao !== 'string' ||
      !descricao.trim() ||
      !dataHora ||
      typeof dentroDieta !== 'boolean'
    ) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios e devem ser válidos.'
      });
    }

    const dataConvertida = new Date(dataHora);

    if (Number.isNaN(dataConvertida.getTime())) {
      return res.status(400).json({
        mensagem: 'A data e hora informadas são inválidas.'
      });
    }

    const refeicao = await refeicaoService.atualizarRefeicao(
      id,
      req.usuarioId,
      {
        nome: nome.trim(),
        descricao: descricao.trim(),
        dataHora: dataConvertida,
        dentroDieta
      }
    );

    if (!refeicao) {
      return res.status(404).json({
        mensagem: 'Refeição não encontrada.'
      });
    }

    return res.status(200).json(refeicao);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao editar refeição.'
    });
  }
}

async function excluirRefeicao(req, res) {
  try {
    const { id } = req.params;

    const excluida = await refeicaoService.excluirRefeicao(
      id,
      req.usuarioId
    );

    if (!excluida) {
      return res.status(404).json({
        mensagem: 'Refeição não encontrada.'
      });
    }

    return res.status(200).json({
      mensagem: 'Refeição excluída com sucesso.'
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao excluir refeição.'
    });
  }
}

async function consultarMetricas(req, res) {
  try {
    const metricas = await refeicaoService.buscarMetricas(
      req.usuarioId
    );

    return res.status(200).json(metricas);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao consultar métricas.'
    });
  }
}

module.exports = {
  cadastrarRefeicao,
  listarRefeicoes,
  consultarRefeicao,
  editarRefeicao,
  excluirRefeicao,
  consultarMetricas
};
