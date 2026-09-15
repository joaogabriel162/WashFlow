/**
 * Camada de Negocio -- Modulo de Gestao de Fila.
 *
 * Esta e a regra central do WashFlow e o motivo de existir uma camada de
 * servico separada: nem o controller nem o repositorio sabem calcular a
 * fila, so este arquivo sabe.
 *
 * Premissa operacional: o lava-rapido atende um veiculo por vez, na ordem
 * de chegada. A previsao de conclusao de um veiculo e, portanto, a soma do
 * tempo restante de todos os veiculos a frente dele mais o proprio tempo
 * de servico.
 */
const atendimentoRepository = require('../repositories/atendimentoRepository');
const AppError = require('../middlewares/appError');
const { paraItemFilaDTO } = require('../dtos/filaDTO');
const { STATUS_ATENDIMENTO, FLUXO_STATUS } = require('../config/constants');

/**
 * Minutos que ainda faltam para concluir um atendimento.
 * Se ja comecou, desconta o tempo decorrido; se nem comecou, e a duracao cheia.
 */
function minutosRestantes(atendimento, agora) {
  const duracao = atendimento.servico.duracaoEstimadaMinutos;

  if (!atendimento.horaInicio) {
    return duracao;
  }

  const decorridos = Math.floor(
    (agora - new Date(atendimento.horaInicio)) / 60000
  );
  return Math.max(duracao - decorridos, 0);
}

/**
 * Fila atual do patio, em ordem de chegada, com a previsao de conclusao
 * de cada veiculo acumulada posicao a posicao.
 */
async function consultarFila() {
  const atendimentos = await atendimentoRepository.listarEmAndamento();
  const agora = new Date();
  let acumulado = 0;

  return atendimentos.map((atendimento, indice) => {
    acumulado += minutosRestantes(atendimento, agora);
    return paraItemFilaDTO(atendimento, indice + 1, acumulado);
  });
}

/**
 * Avanca o atendimento para o proximo status do fluxo
 * (AGUARDANDO -> EM_LAVAGEM -> SECAGEM -> FINALIZADO).
 *
 * Nao aceita pular etapas nem voltar: o painel do patio so e confiavel se
 * o status refletir o fluxo real do servico.
 */
async function avancarStatus(id) {
  const atendimento = await atendimentoRepository.buscarPorId(id);
  if (!atendimento) {
    throw new AppError('Atendimento nao encontrado.', 404);
  }

  const indiceAtual = FLUXO_STATUS.indexOf(atendimento.status);
  const proximoStatus = FLUXO_STATUS[indiceAtual + 1];

  if (!proximoStatus) {
    throw new AppError('Este atendimento ja foi finalizado.', 409);
  }

  atendimento.status = proximoStatus;

  if (proximoStatus === STATUS_ATENDIMENTO.EM_LAVAGEM) {
    atendimento.horaInicio = new Date();
  }

  if (proximoStatus === STATUS_ATENDIMENTO.FINALIZADO) {
    atendimento.horaFim = new Date();
    // Ponto de integracao do Modulo de Notificacoes (proxima etapa):
    // o disparo do aviso ao cliente sera assincrono, de modo que uma falha
    // no WhatsApp/SMS nao impeca a finalizacao do atendimento (RNF03).
  }

  await atendimentoRepository.salvar(atendimento);
  return atendimentoRepository.buscarPorId(id);
}

module.exports = { consultarFila, avancarStatus };
