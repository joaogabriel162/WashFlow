/**
 * Camada de Modelo (MVC: Model).
 * Dono do veiculo. Nome e telefone sao dados pessoais sob a LGPD (RNF04).
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define(
  'Cliente',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    // Canal usado pelo Modulo de Notificacoes para avisar que o veiculo ficou pronto.
    telefone: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { tableName: 'clientes' }
);

module.exports = Cliente;
