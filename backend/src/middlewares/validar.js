/**
 * Converte o resultado do express-validator em erro 400 padronizado.
 * Usado como ultimo item de cada cadeia de validacao das rotas.
 */
const { validationResult } = require('express-validator');
const AppError = require('./appError');

module.exports = (req, res, next) => {
  const resultado = validationResult(req);

  if (resultado.isEmpty()) {
    return next();
  }

  const erros = resultado.array();
  const erro = new AppError(erros[0].msg, 400);
  erro.erros = erros.map((e) => e.msg);
  return next(erro);
};
