import React, { useState } from 'react';
import ListaUsuarios from '../../components/Usuarios/ListaUsuarios.jsx';
import NuevoUsuario from '../../components/Usuarios/NuevoUsuario.jsx';

const Usuarios = () => {
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [shouldRefreshList, setShouldRefreshList] = useState(false);

  const handleUserCreated = () => {
    setShowNewUserForm(false);
    setShouldRefreshList(prev => !prev); // Trigger para recargar la lista
  };

  return (
    <div className="usuarios-page">
      <div className="usuarios-header">
        <h2>Gestión de Usuarios</h2>
        <button 
          className="btn-new-user"
          onClick={() => setShowNewUserForm(true)}
        >
          Nuevo Usuario
        </button>
      </div>

      {showNewUserForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <NuevoUsuario 
              onClose={() => setShowNewUserForm(false)}
              onUserCreated={handleUserCreated}
            />
          </div>
        </div>
      )}

      <ListaUsuarios refreshTrigger={shouldRefreshList} />
    </div>
  );
};

export default Usuarios;
