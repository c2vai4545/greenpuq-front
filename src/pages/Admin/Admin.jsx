import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const AdminDashboard = () => (
  <div className="admin-dashboard">
    <h2>Panel Principal</h2>
    <div className="dashboard-stats">
      {/* Aquí irán las estadísticas y resúmenes */}
    </div>
  </div>
);

const AdminUsers = () => (
  <div className="admin-users">
    <h2>Gestión de Usuarios</h2>
    {/* Aquí irá la tabla de usuarios */}
  </div>
);

const AdminSettings = () => (
  <div className="admin-settings">
    <h2>Configuración</h2>
    {/* Aquí irán las opciones de configuración */}
  </div>
);

const Admin = () => {
  return (
    <div className="admin-layout">
      <Navbar />
      <main className="admin-container">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="usuarios" element={<AdminUsers />} />
          <Route path="configuracion" element={<AdminSettings />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin; 