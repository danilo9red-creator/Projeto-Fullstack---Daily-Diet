
import api from './api';

export async function consultarUsuario(id) {
  const resposta = await api.get(`/usuarios/${id}`);

  return resposta.data;
}

export async function cadastrarUsuario(nome) {
  const resposta = await api.post('/usuarios', {
    nome
  });

  return resposta.data;
}
