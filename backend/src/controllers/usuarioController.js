
const usuarioService = require('../services/usuarioService');

async function cadastrarUsuario(req, res) {
  try {
    const { nome } = req.body;

    if (!nome || typeof nome !== 'string' || !nome.trim()) {
      return res.status(400).json({
        mensagem: 'O nome do usuário é obrigatório.'
      });
    }

    const usuario = await usuarioService.criarUsuario(nome.trim());

    return res.status(201).json(usuario);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao cadastrar usuário.'
    });
  }
}

async function consultarUsuario(req, res) {
  try {
    const { id } = req.params;

    const usuario = await usuarioService.buscarUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({
        mensagem: 'Usuário não encontrado.'
      });
    }

    return res.status(200).json(usuario);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao consultar usuário.'
    });
  }
}

async function editarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome || typeof nome !== 'string' || !nome.trim()) {
      return res.status(400).json({
        mensagem: 'O nome do usuário é obrigatório.'
      });
    }

    const usuario = await usuarioService.atualizarUsuario(
      id,
      nome.trim()
    );

    return res.status(200).json(usuario);
  } catch (erro) {
    if (erro.code === 'P2025') {
      return res.status(404).json({
        mensagem: 'Usuário não encontrado.'
      });
    }

    return res.status(500).json({
      mensagem: 'Erro ao editar usuário.'
    });
  }
}

module.exports = {
  cadastrarUsuario,
  consultarUsuario,
  editarUsuario
};
