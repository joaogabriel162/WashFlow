/**
 * Camada de configuracao.
 * Centraliza regras de validacao e o vocabulario de dominio, para que
 * nenhuma outra camada precise repetir numeros ou strings magicas.
 */

const PERFIS = {
  FUNCIONARIO: 'FUNCIONARIO',
  GERENTE: 'GERENTE',
};

const STATUS_ATENDIMENTO = {
  AGUARDANDO: 'AGUARDANDO',
  EM_LAVAGEM: 'EM_LAVAGEM',
  SECAGEM: 'SECAGEM',
  FINALIZADO: 'FINALIZADO',
};

/**
 * Ordem oficial do fluxo de patio. O avanco de status so pode seguir
 * esta sequencia -- e o que garante que o painel da fila seja confiavel.
 */
const FLUXO_STATUS = [
  STATUS_ATENDIMENTO.AGUARDANDO,
  STATUS_ATENDIMENTO.EM_LAVAGEM,
  STATUS_ATENDIMENTO.SECAGEM,
  STATUS_ATENDIMENTO.FINALIZADO,
];

/** Status que ainda ocupam o patio, portanto compoem a fila. */
const STATUS_EM_ANDAMENTO = FLUXO_STATUS.filter(
  (status) => status !== STATUS_ATENDIMENTO.FINALIZADO
);

const VALIDACAO = {
  PLACA_REGEX: /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/,
  TELEFONE_REGEX: /^[0-9]{10,11}$/,
};

module.exports = {
  PERFIS,
  STATUS_ATENDIMENTO,
  FLUXO_STATUS,
  STATUS_EM_ANDAMENTO,
  VALIDACAO,
};
