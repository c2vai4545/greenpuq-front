import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config/config';

const ListaUsuarios = ({ refreshTrigger }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/usuarios`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar usuarios');
      }

      const data = await response.json();
      setUsuarios(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, [refreshTrigger]);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/usuarios/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Error al eliminar usuario');

      setUsuarios(usuarios.filter(user => user.id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="usuarios-list">
      <table>
        <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Perfil</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.rut}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.perfil}</td>
              <td>
                <button 
                  className="btn-delete"
                  onClick={() => handleDeleteUser(usuario.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUsuarios;
