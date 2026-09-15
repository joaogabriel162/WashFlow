/**
 * Camada de Persistencia -- veiculos.
 */
const { Veiculo, Cliente } = require('../models');

const listar = () =>
  Veiculo.findAll({
    include: [{ model: Cliente, as: 'cliente' }],
    order: [['placa', 'ASC']],
  });

const buscarPorPlaca = (placa) =>
  Veiculo.findOne({
    where: { placa },
    include: [{ model: Cliente, as: 'cliente' }],
  });

const criar = (dados) => Veiculo.create(dados);

module.exports = { listar, buscarPorPlaca, criar };
