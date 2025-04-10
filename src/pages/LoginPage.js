import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Hero from '../components/common/Hero';
import './LoginPage.css';

function LoginPage() {
  // Estados locales para manejo del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Contexto de autenticación y navegación
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validaciones básicas
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    
    // Simulación de login
    try {
      setIsLoading(true);
      
      // Simulamos una llamada a API con un timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // En un caso real, aquí iría la llamada a la API
      const userData = {
        nombre: 'Usuario Demo',
        email: email,
        avatar: 'https://via.placeholder.com/100'
      };
      
      // Guardamos los datos en el contexto de autenticación
      login(userData);
      
      // Redirigimos al usuario a la página principal
      navigate('/');
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Hero 
        title="Bienvenido de nuevo"
        subtitle="Ingresa para acceder a tu cuenta de Fortuna Royale Casino."
        background="primary"
      />
      
      <div className="container">
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Recordarme</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className={`btn-login ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
            
            <div className="login-divider">
              <span>o</span>
            </div>
            
            <button type="button" className="btn-social btn-google">
              Continuar con Google
            </button>
            
            <button type="button" className="btn-social btn-facebook">
              Continuar con Facebook
            </button>
            
            <p className="register-link">
              ¿No tienes una cuenta? <Link to="/register">Regístrate ahora</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;