/**
 * Raiz da Interface Web (container React do C4 Nivel 2).
 * Decide entre a tela de login e a aplicacao autenticada.
 */
import { useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RecepcaoPage from './pages/RecepcaoPage';
import FilaPage from './pages/FilaPage';
import { obterUsuario } from './services/api';
import { sair } from './services/washflowService';

export default function App() {
  const [usuario, setUsuario] = useState(obterUsuario);

  if (!usuario) {
    return <LoginPage aoEntrar={setUsuario} />;
  }

  function encerrar() {
    sair();
    setUsuario(null);
  }

  return (
    <>
      <header className="topo">
        <h1>WashFlow</h1>
        <NavLink to="/recepcao" className={({ isActive }) => (isActive ? 'ativo' : '')}>
          Recepcao
        </NavLink>
        <NavLink to="/fila" className={({ isActive }) => (isActive ? 'ativo' : '')}>
          Fila
        </NavLink>
        <span style={{ fontSize: '0.85rem' }}>
          {usuario.nome} ({usuario.perfil})
        </span>
        <button onClick={encerrar}>Sair</button>
      </header>

      <main className="conteudo">
        <Routes>
          <Route path="/recepcao" element={<RecepcaoPage />} />
          <Route path="/fila" element={<FilaPage />} />
          <Route path="*" element={<Navigate to="/fila" replace />} />
        </Routes>
      </main>
    </>
  );
}
