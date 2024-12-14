import React from 'react';
import { Menu, X, Home, Users, Settings } from 'lucide-react';

const MenuButton = ({ isOpen, onClick }) => (
  <button 
    className="menu-trigger"
    onClick={onClick}
    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
);

const SidebarHeader = ({ onClose }) => (
  <div className="sidebar-header">
    <h2>Menú</h2>
    <button 
      className="close-menu"
      onClick={onClose}
      aria-label="Cerrar menú"
    >
      <X size={24} />
    </button>
  </div>
);

const SidebarContent = ({ user, navigate, onItemClick }) => (
  <div className="sidebar-content">
    <button onClick={() => { navigate('/'); onItemClick(); }}>
      <Home size={20} className="menu-icon" />
      Inicio
    </button>
    {(user?.perfil === 'Administrador' || user?.perfil === 'Gerente') && (
      <>
        <button onClick={() => { navigate('/admin/usuarios'); onItemClick(); }}>
          <Users size={20} className="menu-icon" />
          Usuarios
        </button>
      </>
    )}
    {user?.perfil === 'Administrador' && (
      <button onClick={() => { navigate('/admin/configuracion'); onItemClick(); }}>
        <Settings size={20} className="menu-icon" />
        Configuración
      </button>
    )}
  </div>
);

const Sidebar = ({ isOpen, onClose, user, navigate }) => {
  return (
    <>
      <div className="navbar-left">
        <MenuButton 
          isOpen={isOpen} 
          onClick={() => onClose(!isOpen)} 
        />
        
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
          <SidebarHeader onClose={() => onClose(false)} />
          <SidebarContent 
            user={user} 
            navigate={navigate} 
            onItemClick={() => onClose(false)}
          />
        </div>
      </div>

      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => onClose(false)}
          role="presentation"
        />
      )}
    </>
  );
};

export default Sidebar;
