/**
 * DTO de usuario.
 * Existe para garantir que senhaHash jamais saia da API (RNF04).
 */
const paraUsuarioDTO = (usuario) => ({
  id: usuario.id,
  nome: usuario.nome,
  login: usuario.login,
  perfil: usuario.perfil,
});

module.exports = { paraUsuarioDTO };
