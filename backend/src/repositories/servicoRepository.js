/**
 * Camada de Persistencia -- servicos (tipos de lavagem).
 */
const { Servico } = require('../models');

const listar = () =>
  Servico.findAll({ where: { ativo: true }, order: [['nome', 'ASC']] });

const buscarPorId = (id) => Servico.findByPk(id);

const buscarPorNome = (nome) => Servico.findOne({ where: { nome } });

const criar = (dados) => Servico.create(dados);

module.exports = { listar, buscarPorId, buscarPorNome, criar };
