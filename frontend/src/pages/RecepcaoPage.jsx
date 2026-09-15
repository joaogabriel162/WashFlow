/**
 * Tela de Recepcao -- Modulo de Atendimento.
 *
 * Cadastro rapido de entrada: um unico formulario resolve cliente, veiculo
 * e tipo de lavagem, para o recepcionista nao segurar a fila fisica de
 * carros na rua (RNF05 - Usabilidade).
 */
import { useEffect, useState } from 'react';
import { listarServicos, registrarEntrada } from '../services/washflowService';

const FORMULARIO_VAZIO = {
  placa: '',
  modelo: '',
  cor: '',
  nomeCliente: '',
  telefone: '',
  servicoId: '',
};

export default function RecepcaoPage() {
  const [servicos, setServicos] = useState([]);
  const [form, setForm] = useState(FORMULARIO_VAZIO);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    listarServicos().then(setServicos).catch((e) => setErro(e.message));
  }, []);

  const alterar = (campo) => (evento) =>
    setForm({ ...form, [campo]: evento.target.value });

  async function submeter(evento) {
    evento.preventDefault();
    setErro('');
    setSucesso('');
    setEnviando(true);

    try {
      const atendimento = await registrarEntrada({
        ...form,
        servicoId: Number(form.servicoId),
      });
      setSucesso(
        `${atendimento.veiculo.placa} entrou na fila para ${atendimento.servico.nome}.`
      );
      setForm(FORMULARIO_VAZIO);
    } catch (e) {
      setErro(e.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="cartao" onSubmit={submeter}>
      <h2>Entrada de veiculo</h2>

      {erro && <p className="aviso erro">{erro}</p>}
      {sucesso && <p className="aviso sucesso">{sucesso}</p>}

      <div className="linha">
        <div className="campo">
          <label htmlFor="placa">Placa</label>
          <input
            id="placa"
            value={form.placa}
            onChange={alterar('placa')}
            placeholder="ABC1234"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="modelo">Modelo</label>
          <input
            id="modelo"
            value={form.modelo}
            onChange={alterar('modelo')}
            placeholder="VW Gol"
            required
          />
        </div>
      </div>

      <div className="linha">
        <div className="campo">
          <label htmlFor="cor">Cor</label>
          <input id="cor" value={form.cor} onChange={alterar('cor')} />
        </div>

        <div className="campo">
          <label htmlFor="nomeCliente">Cliente</label>
          <input
            id="nomeCliente"
            value={form.nomeCliente}
            onChange={alterar('nomeCliente')}
            required
          />
        </div>
      </div>

      <div className="linha">
        <div className="campo">
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            value={form.telefone}
            onChange={alterar('telefone')}
            placeholder="11988887777"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="servicoId">Tipo de lavagem</label>
          <select
            id="servicoId"
            value={form.servicoId}
            onChange={alterar('servicoId')}
            required
          >
            <option value="">Selecione...</option>
            {servicos.map((servico) => (
              <option key={servico.id} value={servico.id}>
                {servico.nome} ({servico.duracaoEstimadaMinutos} min)
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="primario" type="submit" disabled={enviando}>
        {enviando ? 'Registrando...' : 'Registrar entrada'}
      </button>
    </form>
  );
}
