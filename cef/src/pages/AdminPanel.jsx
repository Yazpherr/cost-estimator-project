// src/pages/AdminPanel.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminPanel = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 text-2xl font-bold">
        <h1>Admin Panel</h1>
        {/* Contenido del panel de administración */}
      </div>
    </div>
  );
};

export default AdminPanel;
