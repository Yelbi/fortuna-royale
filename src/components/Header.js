import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Fortuna Royale Casino</h1>
      </div>
      <nav className={`nav ${menuAbierto ? 'activo' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={() => setMenuAbierto(false)}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/casino" onClick={() => setMenuAbierto(false)}>
              Casino
            </Link>
          </li>
          <li>
            <Link to="/apuestas" onClick={() => setMenuAbierto(false)}>
              Apuestas Deportivas
            </Link>
          </li>
        </ul>
        <div className="auth-buttons">
          <Link to="/register" className="btn" onClick={() => setMenuAbierto(false)}>
            Registrarse
          </Link>
          <Link to="/login" className="btn" onClick={() => setMenuAbierto(false)}>
            Iniciar Sesión
          </Link>
        </div>
      </nav>
      <div className="hamburguesa" onClick={toggleMenu}>
        <div className={`linea ${menuAbierto ? 'abierta' : ''}`}></div>
        <div className={`linea ${menuAbierto ? 'abierta' : ''}`}></div>
        <div className={`linea ${menuAbierto ? 'abierta' : ''}`}></div>
      </div>
    </header>
  );
}

export default Header;
