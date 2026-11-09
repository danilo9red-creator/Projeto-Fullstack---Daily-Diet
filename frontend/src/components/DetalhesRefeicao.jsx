
import './DetalhesRefeicao.css';

function DetalhesRefeicao({ refeicao, aoVoltar, aoEditar }) {
  return (
    <div className="detalhes-refeicao">

      <div className="cabecalho-detalhes">
        <h2>Detalhes da refeição</h2>

        <button
          className="botao-voltar"
          onClick={aoVoltar}
        >
          Voltar
        </button>
      </div>

      <div className="cartao-detalhes">

        <h3>{refeicao.nome}</h3>

        <div className="informacao-detalhe">
          <strong>Descrição:</strong>
          <p>{refeicao.descricao}</p>
        </div>

        <div className="informacao-detalhe">
          <strong>Data:</strong>
          <p>
            {new Date(refeicao.dataHora).toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="informacao-detalhe">
          <strong>Horário:</strong>
          <p>
            {new Date(refeicao.dataHora).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        <div className="informacao-detalhe">
          <strong>Situação:</strong>

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
        </div>

        <button
          className="botao-editar-detalhes"
          onClick={aoEditar}
        >
          Editar refeição
        </button>

      </div>

    </div>
  );
}

export default DetalhesRefeicao;
