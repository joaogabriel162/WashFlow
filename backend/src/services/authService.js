/**
 * Camada de Negocio -- autenticacao (RNF04 - Seguranca).
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioRepository = require('../repositories/usuarioRepository');
const AppError = require('../middlewares/appError');
const { paraUsuarioDTO } = require('../dtos/usuarioDTO');

async function autenticar(login, senha) {
  const usuario = await usuarioRepository.buscarPorLogin(login);

  // Mensagem unica para login inexistente e senha errada: responder de
  // forma diferente revelaria quais logins existem.
  const credenciaisInvalidas = new AppError('Login ou senha invalidos.', 401);

  if (!usuario || !usuario.ativo) {
    throw credenciaisInvalidas;
  }

  const senhaConfere = await bcrypt.compare(senha, usuario.senhaHash);
  if (!senhaConfere) {
    throw credenciaisInvalidas;
  }

  const token = jwt.sign(
    { id: usuario.id, login: usuario.login, perfil: usuario.perfil },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );

  return { token, usuario: paraUsuarioDTO(usuario) };
}

module.exports = { autenticar };
