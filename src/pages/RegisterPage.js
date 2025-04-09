import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage() {
  // Estados locales para el formulario de registro
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes integrar la lógica de registro o la conexión con una API
    console.log('Registrando usuario:', nombre, email, password);
  };

  return (
    <div className="register-page">
      <section className="register-hero">
        <h2>Únete a Fortuna Royale Casino</h2>
        <p>Regístrate y comienza a disfrutar de la mejor experiencia en juegos y apuestas deportivas.</p>
      </section>
      <div className="register-card">
        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              placeholder="Ingresa tu nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>
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
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
