/**
 * Camada de Negocio -- Modulo de Atendimento (recepcao).
 *
 * Concentra a regra do cadastro rapido de entrada: com placa, modelo,
 * telefone e tipo de lavagem, o recepcionista coloca o veiculo no patio
 * em uma unica requisicao (RNF05 - Usabilidade).
 */
const clienteRepository = require('../repositories/clienteRepository');
const veiculoRepository = require('../repositories/veiculoRepository');
const servicoRepository = require('../repositories/servicoRepository');
const atendimentoRepository = require('../repositories/atendimentoRepository');
const AppError = require('../middlewares/appError');

/**
 * Registra a entrada de um veiculo no patio.
 *
 * Cliente e veiculo sao reaproveitados quando ja existem: no balcao, o
 * recepcionista nao deve precisar saber se aquele carro ja e cadastrado.
 */
async function registrarEntrada(
  { placa, modelo, cor, nomeCliente, telefone, servicoId },
  usuarioId
) {
  const servico = await servicoRepository.buscarPorId(servicoId);
  if (!servico || !servico.ativo) {
    throw new AppError('Servico nao encontrado.', 404);
  }

  const placaNormalizada = placa.toUpperCase().replace(/[^A-Z0-9]/g, '');

  let cliente = await clienteRepository.buscarPorTelefone(telefone);
  if (!cliente) {
    cliente = await clienteRepository.criar({ nome: nomeCliente, telefone });
  }

  let veiculo = await veiculoRepository.buscarPorPlaca(placaNormalizada);
  if (!veiculo) {
    veiculo = await veiculoRepository.criar({
      placa: placaNormalizada,
      modelo,
      cor,
      clienteId: cliente.id,
    });
  }

  // Um veiculo nao pode ocupar duas posicoes na fila ao mesmo tempo.
  const jaNaFila = await atendimentoRepository.buscarEmAndamentoPorVeiculo(
    veiculo.id
  );
  if (jaNaFila) {
    throw new AppError(
      `O veiculo ${placaNormalizada} ja esta na fila.`,
      409
    );
  }

  const atendimento = await atendimentoRepository.criar({
    veiculoId: veiculo.id,
    servicoId: servico.id,
    usuarioId,
  });

  return atendimentoRepository.buscarPorId(atendimento.id);
}

module.exports = { registrarEntrada };
