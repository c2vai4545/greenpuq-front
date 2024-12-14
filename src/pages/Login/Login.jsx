import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/config';

const LoginForm = ({ onSubmit, formData, handleChange, error }) => (
  <form className="login-form" onSubmit={onSubmit}>
    <h2>Iniciar Sesión</h2>
    
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

    <button type="submit" className="login-submit-btn">
      Iniciar Sesión
    </button>
  </form>
);

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rut: '',
    password: ''
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
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rut: formData.rut,
          password: formData.password
        })
      });
      
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.usuario));
        
        window.dispatchEvent(new Event('userLogin'));
        
        navigate(data.usuario.perfil === 'Administrador' ? '/admin/usuarios' : '/');
      } else {
        setError(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <LoginForm 
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        error={error}
      />
    </div>
  );
};

export default Login; 