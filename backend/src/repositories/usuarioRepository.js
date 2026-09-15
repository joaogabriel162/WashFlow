/**
 * Camada de Persistencia.
 * Unica camada autorizada a falar com o banco. Os services consomem estes
 * metodos sem saber que existe Sequelize por tras.
 */
const { Usuario } = require('../models');

const buscarPorLogin = (login) => Usuario.findOne({ where: { login } });

const buscarPorId = (id) => Usuario.findByPk(id);

const criar = (dados) => Usuario.create(dados);

module.exports = { buscarPorLogin, buscarPorId, criar };
