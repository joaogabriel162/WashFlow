/**
 * Camada de Persistencia -- clientes.
 */
const { Cliente, Veiculo } = require('../models');

const listar = () =>
  Cliente.findAll({
    include: [{ model: Veiculo, as: 'veiculos' }],
    order: [['nome', 'ASC']],
  });

const buscarPorId = (id) =>
  Cliente.findByPk(id, { include: [{ model: Veiculo, as: 'veiculos' }] });

const buscarPorTelefone = (telefone) => Cliente.findOne({ where: { telefone } });

const criar = (dados) => Cliente.create(dados);

module.exports = { listar, buscarPorId, buscarPorTelefone, criar };
