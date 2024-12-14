import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ onSubmit, formData, handleChange, error }) => (
  <form className="register-form" onSubmit={onSubmit}>
    <h2>Crear Cuenta</h2>
    
    {error && <div className="error-message">{error}</div>}
    
    <div className="form-group">
      <label htmlFor="rut">RUT</label>
      <input
        type="text"
        id="rut"
        name="rut"
        value={formData.rut}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="nombre">Nombre Completo</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="email">Correo Electrónico</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="telefono">Teléfono</label>
      <input
        type="tel"
        id="telefono"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="confirmPassword">Confirmar Contraseña</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
    </div>

    <button type="submit" className="register-submit-btn">
      Registrarse
    </button>
  </form>
);

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rut: formData.rut,
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Registro exitoso
        navigate('/login');
      } else {
        setError(data.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="register-container">
      <RegisterForm 
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        error={error}
      />
      <div className="login-link">
        ¿Ya tienes una cuenta? 
        <button onClick={() => navigate('/login')} className="link-button">
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default Register; 