import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
  // Estados locales para manejo del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica de autenticación
    console.log('Iniciando sesión con:', email, password);
  };

  return (
    <div className="login-page">
      <section className="login-hero">
        <h2>Bienvenido de nuevo</h2>
        <p>Ingresa para acceder a tu cuenta de Fortuna Royale Casino.</p>
      </section>
      <div className="login-card">
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Correo electrónico:
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
