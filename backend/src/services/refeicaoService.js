
const prisma = require('../prisma');

async function criarRefeicao(dados) {
  return await prisma.refeicao.create({
    data: {
      nome: dados.nome,
      descricao: dados.descricao,
      dataHora: dados.dataHora,
      dentroDieta: dados.dentroDieta,
      usuarioId: dados.usuarioId
    }
  });
}

async function listarRefeicoes(usuarioId) {
  return await prisma.refeicao.findMany({
    where: {
      usuarioId
    },
    orderBy: {
      dataHora: 'desc'
    }
  });
}

async function buscarRefeicaoPorId(id, usuarioId) {
  return await prisma.refeicao.findFirst({
    where: {
      id,
      usuarioId
    }
  });
}

async function atualizarRefeicao(id, usuarioId, dados) {
  const resultado = await prisma.refeicao.updateMany({
    where: {
      id,
      usuarioId
    },
    data: {
      nome: dados.nome,
      descricao: dados.descricao,
      dataHora: dados.dataHora,
      dentroDieta: dados.dentroDieta
    }
  });

  if (resultado.count === 0) {
    return null;
  }

  return await buscarRefeicaoPorId(id, usuarioId);
}

async function excluirRefeicao(id, usuarioId) {
  const resultado = await prisma.refeicao.deleteMany({
    where: {
      id,
      usuarioId
    }
  });

  return resultado.count > 0;
}

async function buscarMetricas(usuarioId) {
  const refeicoes = await prisma.refeicao.findMany({
    where: {
      usuarioId
    },
    orderBy: {
      dataHora: 'asc'
    },
    select: {
      dentroDieta: true
    }
  });

  const totalRefeicoes = refeicoes.length;

  const refeicoesDentroDieta = refeicoes.filter(
    refeicao => refeicao.dentroDieta
  ).length;

  const refeicoesForaDieta =
    totalRefeicoes - refeicoesDentroDieta;

  let sequenciaAtual = 0;
  let melhorSequenciaDentroDieta = 0;

  for (const refeicao of refeicoes) {
    if (refeicao.dentroDieta) {
      sequenciaAtual++;

      if (sequenciaAtual > melhorSequenciaDentroDieta) {
        melhorSequenciaDentroDieta = sequenciaAtual;
      }
    } else {
      sequenciaAtual = 0;
    }
  }

  return {
    totalRefeicoes,
    refeicoesDentroDieta,
    refeicoesForaDieta,
    melhorSequenciaDentroDieta
  };
}

module.exports = {
  criarRefeicao,
  listarRefeicoes,
  buscarRefeicaoPorId,
  atualizarRefeicao,
  excluirRefeicao,
  buscarMetricas
};
