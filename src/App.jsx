import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Usuarios from './pages/Usuarios/Usuarios';
import Configuracion from './pages/Configuracion/Configuracion';

const AppRoute = ({ element: Element, withNavbar = true }) => (
  <>
    {withNavbar && <Navbar />}
    {Element}
  </>
);

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<AppRoute element={<Home />} />} />
          <Route path="/login" element={<AppRoute element={<Login />} withNavbar={false} />} />
          <Route path="/register" element={<AppRoute element={<Register />} withNavbar={false} />} />
          
          {/* Rutas protegidas */}
          <Route path="/admin/usuarios" element={
            <AppRoute element={
              <ProtectedRoute allowedRoles={['Administrador', 'Gerente']}>
                <Usuarios />
              </ProtectedRoute>
            } />
          } />
          <Route path="/admin/configuracion" element={
            <AppRoute element={
              <ProtectedRoute allowedRoles={['Administrador']}>
                <Configuracion />
              </ProtectedRoute>
            } />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 