
const prisma = require('../prisma');

async function criarUsuario(nome) {
  return await prisma.usuario.create({
    data: {
      nome
    }
  });
}

async function buscarUsuarioPorId(id) {
  return await prisma.usuario.findUnique({
    where: {
      id
    }
  });
}

async function atualizarUsuario(id, nome) {
  return await prisma.usuario.update({
    where: {
      id
    },
    data: {
      nome
    }
  });
}

module.exports = {
  criarUsuario,
  buscarUsuarioPorId,
  atualizarUsuario
};