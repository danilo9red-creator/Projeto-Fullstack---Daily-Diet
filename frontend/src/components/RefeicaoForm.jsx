
import { useState } from 'react';
import './RefeicaoForm.css';

function RefeicaoForm({ aoSalvar, aoCancelar, refeicaoInicial }) {
  const agora = new Date();

  const dataHoraInicial = refeicaoInicial
    ? new Date(refeicaoInicial.dataHora)
    : agora;

  function formatarData(data) {
    return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
  }

  function formatarHora(data) {
    return `${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}`;
  }

  const [nome, setNome] = useState(refeicaoInicial?.nome || '');
  const [descricao, setDescricao] = useState(refeicaoInicial?.descricao || '');
  const [data, setData] = useState(formatarData(dataHoraInicial));
  const [hora, setHora] = useState(formatarHora(dataHoraInicial));

  const [dentroDieta, setDentroDieta] = useState(
    refeicaoInicial ? String(refeicaoInicial.dentroDieta) : 'true'
  );

  const [erro, setErro] = useState('');

  async function enviarFormulario(evento) {
    evento.preventDefault();

    if (!nome.trim() || !descricao.trim() || !data || !hora) {
      setErro('Preencha todos os campos.');
      return;
    }

    const dados = {
      nome: nome.trim(),
      descricao: descricao.trim(),
      dataHora: new Date(`${data}T${hora}`).toISOString(),
      dentroDieta: dentroDieta === 'true'
    };

    try {
      setErro('');
      await aoSalvar(dados);
    } catch (erro) {
      setErro('Não foi possível salvar a refeição.');
    }
  }

  return (
    <div className="formulario-refeicao">
      <h2>{refeicaoInicial ? 'Editar refeição' : 'Nova refeição'}</h2>

      <form onSubmit={enviarFormulario}>
        <div className="campo">
          <label htmlFor="nome">Nome da refeição</label>
          <input
            id="nome"
            type="text"
            placeholder="Ex.: Almoço"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            placeholder="Descreva os alimentos consumidos"
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="data">Data</label>
          <input
            id="data"
            type="date"
            value={data}
            onChange={(evento) => setData(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="hora">Horário</label>
          <input
            id="hora"
            type="time"
            value={hora}
            onChange={(evento) => setHora(evento.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="dentroDieta">Está dentro da dieta?</label>
          <select
            id="dentroDieta"
            value={dentroDieta}
            onChange={(evento) => setDentroDieta(evento.target.value)}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </div>

        {erro && <p className="mensagem-erro">{erro}</p>}

        <div className="botoes-formulario">
          <button type="submit">
            {refeicaoInicial ? 'Salvar alterações' : 'Salvar refeição'}
          </button>

          <button
            type="button"
            className="botao-cancelar"
            onClick={aoCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RefeicaoForm;
