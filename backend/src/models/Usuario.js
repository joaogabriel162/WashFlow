/**
 * Camada de Modelo (MVC: Model).
 * Operador do sistema -- recepcionista ou gerente do lava-rapido.
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { PERFIS } = require('../config/constants');

const Usuario = sequelize.define(
  'Usuario',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    login: { type: DataTypes.STRING, allowNull: false, unique: true },
    // Nunca armazena a senha em texto puro -- apenas o hash BCrypt (RNF04).
    senhaHash: { type: DataTypes.STRING, allowNull: false },
    perfil: {
      type: DataTypes.ENUM(Object.values(PERFIS)),
      allowNull: false,
      defaultValue: PERFIS.FUNCIONARIO,
    },
    ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { tableName: 'usuarios' }
);

module.exports = Usuario;
