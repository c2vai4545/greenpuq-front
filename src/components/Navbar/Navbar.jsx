import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, User, LogOut } from 'lucide-react';
import Sidebar from './Sidebar.jsx';

const UserMenu = ({ user, navigate, onLogout }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="user-dropdown-trigger">
      {user.nombre.split(' ')[0]}
      <ChevronDown size={16} />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="dropdown-content">
      <DropdownMenuItem className="dropdown-item" onClick={() => navigate('/perfil')}>
        <User size={16} />
        Mi Perfil
      </DropdownMenuItem>
      <div className="dropdown-divider" />
      <DropdownMenuItem className="dropdown-item" onClick={onLogout}>
        <LogOut size={16} />
        Cerrar Sesión
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const updateUserFromStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    updateUserFromStorage();
    
    // Escuchar el evento custom de login
    window.addEventListener('userLogin', updateUserFromStorage);
    
    // Escuchar cambios en localStorage
    window.addEventListener('storage', (e) => {
      if (e.key === 'user') {
        updateUserFromStorage();
      }
    });

    return () => {
      window.removeEventListener('userLogin', updateUserFromStorage);
      window.removeEventListener('storage', updateUserFromStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Sidebar 
        isOpen={isMenuOpen}
        onClose={setIsMenuOpen}
        user={user}
        navigate={navigate}
      />

      <div className="navbar-brand">
        <h1>GreenPuq</h1>
      </div>
      
      <div className="navbar-buttons">
        {!user ? (
          <button className="login-btn" onClick={() => navigate('/login')}>
            Iniciar Sesión
          </button>
        ) : (
          <UserMenu 
            user={user}
            navigate={navigate}
            onLogout={handleLogout}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar; 