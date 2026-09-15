/**
 * DTO da fila.
 * Achata atendimento + veiculo + cliente + servico no formato que o painel
 * consome, para que a View nao precise navegar objetos aninhados.
 */
const paraItemFilaDTO = (atendimento, posicao, tempoEsperaEstimadoMinutos) => ({
  id: atendimento.id,
  posicao,
  status: atendimento.status,
  placa: atendimento.veiculo.placa,
  modelo: atendimento.veiculo.modelo,
  cor: atendimento.veiculo.cor,
  cliente: atendimento.veiculo.cliente
    ? {
        nome: atendimento.veiculo.cliente.nome,
        telefone: atendimento.veiculo.cliente.telefone,
      }
    : null,
  servico: {
    nome: atendimento.servico.nome,
    duracaoEstimadaMinutos: atendimento.servico.duracaoEstimadaMinutos,
  },
  horaEntrada: atendimento.horaEntrada,
  horaInicio: atendimento.horaInicio,
  tempoEsperaEstimadoMinutos,
});

module.exports = { paraItemFilaDTO };
