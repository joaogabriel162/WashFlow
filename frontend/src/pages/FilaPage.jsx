/**
 * Painel da Fila -- Modulo de Gestao de Fila.
 *
 * Mostra a ordem de chegada, o status de cada veiculo e a previsao de
 * conclusao calculada pelo backend. Recarrega sozinho a cada 15s para que
 * o painel do balcao reflita o patio sem ninguem precisar atualizar a tela.
 */
import { useCallback, useEffect, useState } from 'react';
import { avancarStatus, consultarFila } from '../services/washflowService';

const ROTULO_STATUS = {
  AGUARDANDO: 'Aguardando',
  EM_LAVAGEM: 'Em lavagem',
  SECAGEM: 'Secagem',
};

const PROXIMA_ACAO = {
  AGUARDANDO: 'Iniciar lavagem',
  EM_LAVAGEM: 'Iniciar secagem',
  SECAGEM: 'Finalizar',
};

export default function FilaPage() {
  const [fila, setFila] = useState([]);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(async () => {
    try {
      setFila(await consultarFila());
      setErro('');
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
    const temporizador = setInterval(carregar, 15000);
    return () => clearInterval(temporizador);
  }, [carregar]);

  async function avancar(id) {
    try {
      await avancarStatus(id);
      await carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <div className="cartao">
      <h2>Fila do patio</h2>

      {erro && <p className="aviso erro">{erro}</p>}

      {carregando ? (
        <p className="vazio">Carregando...</p>
      ) : fila.length === 0 ? (
        <p className="vazio">Nenhum veiculo no patio no momento.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Veiculo</th>
              <th>Cliente</th>
              <th>Servico</th>
              <th>Status</th>
              <th>Pronto em</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {fila.map((item) => (
              <tr key={item.id}>
                <td>{item.posicao}</td>
                <td>
                  <strong>{item.placa}</strong>
                  <br />
                  {item.modelo}
                  {item.cor ? ` - ${item.cor}` : ''}
                </td>
                <td>
                  {item.cliente?.nome}
                  <br />
                  {item.cliente?.telefone}
                </td>
                <td>{item.servico.nome}</td>
                <td>
                  <span className={`etiqueta ${item.status}`}>
                    {ROTULO_STATUS[item.status]}
                  </span>
                </td>
                <td>~{item.tempoEsperaEstimadoMinutos} min</td>
                <td>
                  <button className="avancar" onClick={() => avancar(item.id)}>
                    {PROXIMA_ACAO[item.status]}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
