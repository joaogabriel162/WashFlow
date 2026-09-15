/**
 * Encaminha para o errorHandler qualquer erro lancado dentro de um
 * controller assincrono -- sem isto o Express 4 deixaria a requisicao
 * pendurada, sem resposta.
 */
module.exports = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
