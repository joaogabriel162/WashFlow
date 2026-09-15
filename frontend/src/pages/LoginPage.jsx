/**
 * Tela de Login -- porta de entrada do sistema (RNF04 - Seguranca).
 */
import { useState } from 'react';
import { entrar } from '../services/washflowService';

export default function LoginPage({ aoEntrar }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function submeter(evento) {
    evento.preventDefault();
    setErro('');
    setEnviando(true);

    try {
      aoEntrar(await entrar(login, senha));
    } catch (e) {
      setErro(e.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="login-tela">
      <form className="cartao login-caixa" onSubmit={submeter}>
        <h2>WashFlow</h2>

        {erro && <p className="aviso erro">{erro}</p>}

        <div className="campo">
          <label htmlFor="login">Usuario</label>
          <input
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            autoFocus
          />
        </div>

        <div className="campo">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button className="primario" type="submit" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="login-dica">
          Usuarios de demonstracao:
          <br />
          recepcao / recepcao123 &nbsp;&middot;&nbsp; gerente / gerente123
        </p>
      </form>
    </div>
  );
}
