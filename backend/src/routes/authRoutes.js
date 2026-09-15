/**
 * Camada de Rotas -- mapeia URL para controller e declara a validacao de entrada.
 */
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const asyncHandler = require('../middlewares/asyncHandler');
const validar = require('../middlewares/validar');

const router = express.Router();

router.post(
  '/auth/login',
  [
    body('login').notEmpty().withMessage('Informe o login.').trim(),
    body('senha').notEmpty().withMessage('Informe a senha.'),
    validar,
  ],
  asyncHandler(authController.login)
);

module.exports = router;
