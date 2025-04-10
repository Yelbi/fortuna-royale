import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Hero from '../components/common/Hero';
import './RegisterPage.css';

function RegisterPage() {
  // Estados locales para el formulario de registro
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Contexto de autenticación y navegación
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Actualizar el estado del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
    
    // Limpiar error del campo al modificarlo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    // Validar email
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }
    
    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    // Validar términos y condiciones
    if (!formData.terms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Avanzar al siguiente paso
  const nextStep = (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.nombre.trim() || !formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        validateForm();
        return;
      }
      setStep(2);
    } else {
      handleSubmit(e);
    }
  };

  // Volver al paso anterior
  const prevStep = () => {
    setStep(1);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario
    const isValid = validateForm();
    if (!isValid) return;
    
    // Simular registro
    try {
      setIsLoading(true);
      
      // Simulamos una llamada a API con un timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // En un caso real, aquí iría la llamada a la API
      const userData = {
        nombre: formData.nombre,
        email: formData.email,
        avatar: 'https://via.placeholder.com/100'
      };
      
      // Registramos al usuario en el contexto de autenticación
      register(userData);
      
      // Redirigimos al usuario a la página principal
      navigate('/');
    } catch (err) {
      setErrors({ submit: 'Error al registrar usuario. Inténtalo de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Hero 
        title="Únete a Fortuna Royale Casino"
        subtitle="Regístrate y comienza a disfrutar de la mejor experiencia en juegos y apuestas deportivas."
        background="secondary"
      />
      
      <div className="container">
        <div className="register-card">
          <div className="register-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
          </div>
          
          <form className="register-form" onSubmit={nextStep}>
            {errors.submit && (
              <div className="error-message">
                <p>{errors.submit}</p>
              </div>
            )}
            
            {step === 1 && (
              <>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Ingresa tu nombre completo"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  {errors.nombre && <span className="error">{errors.nombre}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn-next">
                    Continuar
                  </button>
                </div>
              </>
            )}
            
            {step === 2 && (
              <>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Crea una contraseña segura"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <span className="error">{errors.password}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar contraseña</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirma tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <span className="error">{errors.confirmPassword}</span>
                  )}
                </div>
                
                <div className="form-group checkbox-group">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                  <label htmlFor="terms">
                    Acepto los <Link to="/terms">Términos y Condiciones</Link> y la{' '}
                    <Link to="/privacy">Política de Privacidad</Link>
                  </label>
                  {errors.terms && <span className="error">{errors.terms}</span>}
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn-back" onClick={prevStep}>
                    Atrás
                  </button>
                  <button 
                    type="submit" 
                    className={`btn-register ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Registrando...' : 'Completar Registro'}
                  </button>
                </div>
              </>
            )}
            
            <p className="login-link">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;