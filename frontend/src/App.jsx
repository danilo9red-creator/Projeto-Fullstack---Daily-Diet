
import { useState, useEffect } from 'react';
import './App.css';

import Login from './components/Login';
import RefeicaoForm from './components/RefeicaoForm';
import DetalhesRefeicao from './components/DetalhesRefeicao';

import {
  listarRefeicoes,
  consultarMetricas,
  cadastrarRefeicao,
  editarRefeicao,
  excluirRefeicao,
  consultarRefeicao
} from './services/refeicao';

import { consultarUsuario } from './services/usuario';
import { obterUsuario } from './services/usuarioAtual';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [verificandoSessao, setVerificandoSessao] = useState(true);

  const [refeicoes, setRefeicoes] = useState([]);

  const [metricas, setMetricas] = useState({
    totalRefeicoes: 0,
    refeicoesDentroDieta: 0,
    refeicoesForaDieta: 0,
    melhorSequenciaDentroDieta: 0
  });

  const [carregando, setCarregando] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [refeicaoEditando, setRefeicaoEditando] = useState(null);
  const [refeicaoVisualizando, setRefeicaoVisualizando] = useState(null);

  useEffect(() => {
    async function restaurarSessao() {
      const usuarioId = obterUsuario();

      if (!usuarioId) {
        setVerificandoSessao(false);
        return;
      }

      try {
        const dadosUsuario = await consultarUsuario(usuarioId);
        setUsuario(dadosUsuario);

      } catch (erro) {
        console.error('Erro ao restaurar sessão:', erro);

        localStorage.removeItem('usuarioId');
      } finally {
        setVerificandoSessao(false);
      }
    }

    restaurarSessao();
  }, []);

  useEffect(() => {
    if (usuario) {
      carregarDados();
    }
  }, [usuario]);

  async function carregarDados() {
    try {
      setCarregando(true);

      const [lista, dadosMetricas] = await Promise.all([
        listarRefeicoes(),
        consultarMetricas()
      ]);

      setRefeicoes(lista);
      setMetricas(dadosMetricas);

    } catch (erro) {
      console.error('Erro ao carregar os dados:', erro);
    } finally {
      setCarregando(false);
    }
  }

  async function salvarNovaRefeicao(dados) {
    try {
      await cadastrarRefeicao(dados);
      await carregarDados();
      setMostrarFormulario(false);

    } catch (erro) {
      console.error('Erro ao cadastrar refeição:', erro);
      throw erro;
    }
  }

  async function salvarEdicaoRefeicao(dados) {
    try {
      await editarRefeicao(refeicaoEditando.id, dados);
      await carregarDados();

      setRefeicaoEditando(null);
      setMostrarFormulario(false);

    } catch (erro) {
      console.error('Erro ao editar refeição:', erro);
      throw erro;
    }
  }

  async function removerRefeicao(id, nome) {
    const confirmar = window.confirm(
      `Deseja realmente excluir a refeição "${nome}"?`
    );

    if (!confirmar) {
      return;
    }

    try {
      await excluirRefeicao(id);

      setRefeicaoVisualizando(null);

      await carregarDados();

    } catch (erro) {
      console.error('Erro ao excluir refeição:', erro);
      alert('Não foi possível excluir a refeição.');
    }
  }

  async function abrirDetalhes(id) {
    try {
      setCarregando(true);

      const dados = await consultarRefeicao(id);

      setRefeicaoVisualizando(dados);

    } catch (erro) {
      console.error('Erro ao consultar refeição:', erro);
      alert('Não foi possível carregar os detalhes da refeição.');
    } finally {
      setCarregando(false);
    }
  }

  function sair() {
    localStorage.removeItem('usuarioId');

    setUsuario(null);
    setRefeicoes([]);
    setRefeicaoEditando(null);
    setRefeicaoVisualizando(null);
    setMostrarFormulario(false);

    setMetricas({
      totalRefeicoes: 0,
      refeicoesDentroDieta: 0,
      refeicoesForaDieta: 0,
      melhorSequenciaDentroDieta: 0
    });
  }

  if (verificandoSessao) {
    return (
      <div className="mensagem-vazia">
        <p>Verificando sua sessão...</p>
      </div>
    );
  }

  if (!usuario) {
    return <Login aoEntrar={setUsuario} />;
  }

  return (
    <div className="aplicativo">

      <header className="cabecalho">
        <div className="container">

          <div>
            <h1>Daily Diet</h1>
            <p>Organize suas refeições e acompanhe sua alimentação.</p>
          </div>

          <button
            className="botao-sair"
            onClick={sair}
          >
            Sair
          </button>

        </div>
      </header>

      <main className="conteudo">

        <section className="boas-vindas">
          <h2>Olá, {usuario.nome}!</h2>

          <p>Vamos acompanhar sua alimentação hoje?</p>

          <div className="identificador-usuario">
            <strong>Seu ID de acesso:</strong>
            <span>{usuario.id}</span>
            <small>Guarde esse código para acessar sua conta novamente.</small>
          </div>
        </section>

        {!refeicaoVisualizando && !mostrarFormulario && (
          <section className="indicadores">

            <div className="cartao">
              <h3>Total de refeições</h3>
              <strong>{metricas.totalRefeicoes}</strong>
            </div>

            <div className="cartao">
              <h3>Dentro da dieta</h3>
              <strong>{metricas.refeicoesDentroDieta}</strong>
            </div>

            <div className="cartao">
              <h3>Fora da dieta</h3>
              <strong>{metricas.refeicoesForaDieta}</strong>
            </div>

            <div className="cartao">
              <h3>Melhor sequência</h3>
              <strong>{metricas.melhorSequenciaDentroDieta}</strong>
            </div>

          </section>
        )}

        {refeicaoVisualizando ? (

          <DetalhesRefeicao
            refeicao={refeicaoVisualizando}
            aoVoltar={() => setRefeicaoVisualizando(null)}
            aoEditar={() => {
              setRefeicaoEditando(refeicaoVisualizando);
              setRefeicaoVisualizando(null);
              setMostrarFormulario(true);
            }}
          />

        ) : mostrarFormulario ? (

          <RefeicaoForm
            refeicaoInicial={refeicaoEditando}
            aoSalvar={
              refeicaoEditando
                ? salvarEdicaoRefeicao
                : salvarNovaRefeicao
            }
            aoCancelar={() => {
              setRefeicaoEditando(null);
              setMostrarFormulario(false);
            }}
          />

        ) : (

          <section className="refeicoes">

            <div className="titulo-secao">
              <h2>Minhas refeições</h2>

              <button
                onClick={() => {
                  setRefeicaoEditando(null);
                  setMostrarFormulario(true);
                }}
              >
                + Nova refeição
              </button>
            </div>

            {carregando ? (

              <div className="mensagem-vazia">
                <p>Carregando refeições...</p>
              </div>

            ) : refeicoes.length === 0 ? (

              <div className="mensagem-vazia">
                <p>Você ainda não cadastrou nenhuma refeição.</p>
                <span>Suas refeições aparecerão aqui.</span>
              </div>

            ) : (

              <div className="lista-refeicoes">

                {refeicoes.map((refeicao) => (

                  <div className="cartao" key={refeicao.id}>

                    <h3>{refeicao.nome}</h3>

                    <p>{refeicao.descricao}</p>

                    <p>
                      {new Date(refeicao.dataHora).toLocaleDateString('pt-BR')}
                      {' às '}
                      {new Date(refeicao.dataHora).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>

                    <span
                      className={
                        refeicao.dentroDieta
                          ? 'status-dentro-dieta'
                          : 'status-fora-dieta'
                      }
                    >
                      {refeicao.dentroDieta
                        ? 'Dentro da dieta'
                        : 'Fora da dieta'}
                    </span>

                    <div className="botoes-formulario">

                      <button
                        type="button"
                        onClick={() => abrirDetalhes(refeicao.id)}
                      >
                        Ver detalhes
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRefeicaoEditando(refeicao);
                          setMostrarFormulario(true);
                        }}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="botao-cancelar"
                        onClick={() => removerRefeicao(
                          refeicao.id,
                          refeicao.nome
                        )}
                      >
                        Excluir
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        )}

      </main>

      <footer className="rodape">
        <p>Daily Diet © 2026 - Controle sua alimentação.</p>
      </footer>

    </div>
  );
}

export default App;
