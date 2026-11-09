
const prisma = require('../prisma');

async function identificarUsuario(req, res, next) {
  try {
    const usuarioId = req.headers['x-user-id'];

    if (!usuarioId) {
      return res.status(401).json({
        mensagem: 'Identificação do usuário não informada.'
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: usuarioId
      }
    });

    if (!usuario) {
      return res.status(401).json({
        mensagem: 'Usuário não encontrado.'
      });
    }

    req.usuarioId = usuario.id;

    next();
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao identificar usuário.'
    });
  }
}

module.exports = identificarUsuario;
