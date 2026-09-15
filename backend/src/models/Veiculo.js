/**
 * Camada de Modelo (MVC: Model).
 * Veiculo atendido pelo lava-rapido, identificado pela placa.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Veiculo = sequelize.define(
  'Veiculo',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    placa: { type: DataTypes.STRING, allowNull: false, unique: true },
    modelo: { type: DataTypes.STRING, allowNull: false },
    cor: { type: DataTypes.STRING, allowNull: true },
  },
  { tableName: 'veiculos' }
);

module.exports = Veiculo;
