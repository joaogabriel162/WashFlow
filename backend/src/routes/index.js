/**
 * Camada de Rotas -- agregador.
 */
const express = require('express');
const authRoutes = require('./authRoutes');
const cadastroRoutes = require('./cadastroRoutes');
const atendimentoRoutes = require('./atendimentoRoutes');

const router = express.Router();

router.get('/', (req, res) =>
  res.json({ sucesso: true, mensagem: 'API WashFlow no ar.' })
);

router.use(authRoutes);
router.use(cadastroRoutes);
router.use(atendimentoRoutes);

module.exports = router;
