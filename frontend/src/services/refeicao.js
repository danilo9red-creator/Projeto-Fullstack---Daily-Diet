import api from './api';
import { obterUsuario } from './usuarioAtual';

function configurarUsuario() {
  return {
    headers: {
      'x-user-id': obterUsuario()
    }
  };
}

export async function listarRefeicoes() {
  const resposta = await api.get('/refeicoes', configurarUsuario());
  return resposta.data;
}

export async function consultarMetricas() {
  const resposta = await api.get('/refeicoes/metricas', configurarUsuario());
  return resposta.data;
}

export async function consultarRefeicao(id) {
  const resposta = await api.get(`/refeicoes/${id}`, configurarUsuario());
  return resposta.data;
}

export async function cadastrarRefeicao(dados) {
  const resposta = await api.post('/refeicoes', dados, configurarUsuario());
  return resposta.data;
}

export async function editarRefeicao(id, dados) {
  const resposta = await api.put(`/refeicoes/${id}`, dados, configurarUsuario());
  return resposta.data;
}

export async function excluirRefeicao(id) {
  const resposta = await api.delete(`/refeicoes/${id}`, configurarUsuario());
  return resposta.data;
}
