import React, { useState } from 'react';
import { API_URL } from '../../config/config';

const NuevoUsuario = ({ onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    email: '',
    telefono: '',
    perfil: 'Usuario',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rut: formData.rut,
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          perfil: formData.perfil,
          password: formData.password
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al crear usuario');
      }

      onUserCreated();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="nuevo-usuario-form">
      <h3>Nuevo Usuario</h3>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="email">Email</label>
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="perfil">Perfil</label>
          <select
            id="perfil"
            name="perfil"
            value={formData.perfil}
            onChange={handleChange}
            required
          >
            <option value="Usuario">Usuario</option>
            <option value="Administrador">Administrador</option>
          </select>
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

        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            Crear Usuario
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevoUsuario;
