/**
 * Camada de Modelo (MVC: Model).
 * Entrada de um veiculo no patio -- e a entidade central do sistema.
 *
 * Nao existe tabela "fila": a fila e a consulta dos atendimentos que ainda
 * nao foram finalizados, ordenados pelo horario de entrada.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { STATUS_ATENDIMENTO } = require('../config/constants');

const Atendimento = sequelize.define(
  'Atendimento',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: {
      type: DataTypes.ENUM(Object.values(STATUS_ATENDIMENTO)),
      allowNull: false,
      defaultValue: STATUS_ATENDIMENTO.AGUARDANDO,
    },
    // Define a ordem de chegada -- o criterio da fila.
    horaEntrada: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    horaInicio: { type: DataTypes.DATE, allowNull: true },
    horaFim: { type: DataTypes.DATE, allowNull: true },
  },
  { tableName: 'atendimentos' }
);

module.exports = Atendimento;
