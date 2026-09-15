/**
 * Camada de Apresentacao (MVC: Controller) -- cadastros de apoio.
 */
const cadastroService = require('../services/cadastroService');

const ok = (res, dados) => res.json({ sucesso: true, dados });
const criado = (res, dados, mensagem) =>
  res.status(201).json({ sucesso: true, mensagem, dados });

async function listarClientes(req, res) {
  return ok(res, await cadastroService.listarClientes());
}

async function criarCliente(req, res) {
  const cliente = await cadastroService.criarCliente(req.body);
  return criado(res, cliente, 'Cliente cadastrado.');
}

async function listarVeiculos(req, res) {
  return ok(res, await cadastroService.listarVeiculos());
}

async function criarVeiculo(req, res) {
  const veiculo = await cadastroService.criarVeiculo(req.body);
  return criado(res, veiculo, 'Veiculo cadastrado.');
}

async function listarServicos(req, res) {
  return ok(res, await cadastroService.listarServicos());
}

async function criarServico(req, res) {
  const servico = await cadastroService.criarServico(req.body);
  return criado(res, servico, 'Servico cadastrado.');
}

module.exports = {
  listarClientes,
  criarCliente,
  listarVeiculos,
  criarVeiculo,
  listarServicos,
  criarServico,
};
