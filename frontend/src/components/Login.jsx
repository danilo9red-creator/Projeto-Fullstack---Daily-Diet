
import { useState } from 'react';
import {
  consultarUsuario,
  cadastrarUsuario
} from '../services/usuario';

import { salvarUsuario } from '../services/usuarioAtual';

import './Login.css';

function Login({ aoEntrar }) {
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');

  const [modoCadastro, setModoCadastro] = useState(false);

  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar(evento) {
    evento.preventDefault();

    if (!id.trim()) {
      setErro('Informe o ID do usuário.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');
      setMensagem('');

      const usuario = await consultarUsuario(id.trim());

      salvarUsuario(usuario.id);

      aoEntrar(usuario);

    } catch (erro) {
      setErro('Usuário não encontrado. Confira o ID informado.');
    } finally {
      setCarregando(false);
    }
  }

  async function criarConta(evento) {
    evento.preventDefault();

    if (!nome.trim()) {
      setErro('Informe seu nome para continuar.');
      return;
    }

    try {
      setCarregando(true);
      setErro('');
      setMensagem('');

      const usuario = await cadastrarUsuario(nome.trim());

      salvarUsuario(usuario.id);

      aoEntrar(usuario);

    } catch (erro) {
      setErro('Não foi possível criar sua conta. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  function alternarModo() {
    setModoCadastro(!modoCadastro);
    setNome('');
    setId('');
    setErro('');
    setMensagem('');
  }

  return (
    <div className="tela-login">

      <div className="cartao-login">

        <h1>Daily Diet</h1>

        <p>Seu controle diário de alimentação.</p>

        {modoCadastro ? (

          <form onSubmit={criarConta}>

            <h2>Criar conta</h2>

            <label htmlFor="nomeUsuario">Seu nome</label>

            <input
              id="nomeUsuario"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
            />

            {erro && (
              <span className="mensagem-erro">
                {erro}
              </span>
            )}

            <button type="submit" disabled={carregando}>
              {carregando ? 'Criando conta...' : 'Criar minha conta'}
            </button>

          </form>

        ) : (

          <form onSubmit={entrar}>

            <h2>Entrar</h2>

            <label htmlFor="idUsuario">ID do usuário</label>

            <input
              id="idUsuario"
              type="text"
              placeholder="Digite seu ID"
              value={id}
              onChange={(evento) => setId(evento.target.value)}
            />

            {erro && (
              <span className="mensagem-erro">
                {erro}
              </span>
            )}

            <button type="submit" disabled={carregando}>
              {carregando ? 'Consultando...' : 'Entrar'}
            </button>

          </form>

        )}

        <div className="alternar-login">

          <p>
            {modoCadastro
              ? 'Já possui uma conta?'
              : 'Ainda não possui uma conta?'}
          </p>

          <button
            type="button"
            onClick={alternarModo}
          >
            {modoCadastro ? 'Voltar para entrar' : 'Criar uma conta'}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;
