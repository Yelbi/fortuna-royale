import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  // Cerrar el menú al cambiar de ruta
  useEffect(() => {
    setMenuAbierto(false);
  }, [location]);

  // Evitar scroll cuando el menú está abierto en móvil
  useEffect(() => {
    if (menuAbierto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuAbierto]);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <h1>Fortuna Royale</h1>
          </Link>
        </div>
        
        <nav className={`nav ${menuAbierto ? 'activo' : ''}`}>
          <ul className="nav-links">
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">Inicio</Link>
            </li>
            <li className={location.pathname === '/casino' ? 'active' : ''}>
              <Link to="/casino">Casino</Link>
            </li>
            <li className={location.pathname === '/apuestas' ? 'active' : ''}>
              <Link to="/apuestas">Apuestas Deportivas</Link>
            </li>
          </ul>
          
          <div className="auth-buttons">
            {user ? (
              <>
                <span className="user-greeting">Hola, {user.nombre || 'Usuario'}</span>
                <button onClick={logout} className="btn btn-logout">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-register">
                  Registrarse
                </Link>
                <Link to="/login" className="btn btn-login">
                  Iniciar Sesión
                </Link>
              </>
            )}
            
            <button 
              className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              <span className="theme-toggle-icon">
                {isDarkMode ? '☀️' : '🌙'}
              </span>
            </button>
          </div>
        </nav>
        
        <div className={`hamburguesa ${menuAbierto ? 'abierta' : ''}`} onClick={toggleMenu}>
          <div className="linea"></div>
          <div className="linea"></div>
          <div className="linea"></div>
        </div>
        
        {menuAbierto && <div className="overlay" onClick={toggleMenu}></div>}
      </div>
    </header>
  );
};

export default Header;