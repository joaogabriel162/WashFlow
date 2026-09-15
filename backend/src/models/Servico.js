/**
 * Camada de Modelo (MVC: Model).
 * Tipo de lavagem oferecido (Simples, Completa, Polimento).
 *
 * duracaoEstimadaMinutos e a base do calculo de tempo de espera da fila:
 * sem ele o painel nao consegue prever prazo nenhum.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Servico = sequelize.define(
  'Servico',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false, unique: true },
    preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    duracaoEstimadaMinutos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { tableName: 'servicos' }
);

module.exports = Servico;
