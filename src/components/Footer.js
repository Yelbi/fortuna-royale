import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Fortuna Royale Casino</h3>
            <p>Tu destino para el entretenimiento de casino y apuestas deportivas. Juega responsablemente.</p>
          </div>
          
          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/casino">Casino</Link></li>
              <li><Link to="/apuestas">Apuestas Deportivas</Link></li>
              <li><Link to="/login">Iniciar Sesión</Link></li>
              <li><Link to="/register">Registrarse</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>Correo: info@fortunaroyale.com</p>
            <p>Teléfono: +123 456 7890</p>
            <div className="social-media">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Fortuna Royale Casino. Todos los derechos reservados.</p>
          <p>Juego responsable. Solo para mayores de 18 años.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;