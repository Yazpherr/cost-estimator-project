// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserPlus, FaSignOutAlt, FaHome } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const activeClass = "bg-blue-500 text-white rounded-md";
  const inactiveClass = "text-gray-700 hover:bg-blue-100";

  return (
    <div className="min-h-screen bg-white w-64 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center h-20 border-b border-gray-200">
          <h1 className="text-2xl font-bold">Speed Project</h1>
        </div>
        <nav className="mt-10">
          <Link to="/register-project-manager" className={`flex items-center mt-4 py-2 px-6 ${location.pathname === '/register-project-manager' ? activeClass : inactiveClass}`}>
            <FaUserPlus className="mr-3" />
            Register Project Manager
          </Link>
          {/* Ocultar la opción de Admin Panel por ahora */}
          {/* <Link to="/admin-panel" className={`flex items-center mt-4 py-2 px-6 ${location.pathname === '/admin-panel' ? activeClass : inactiveClass}`}>
            <FaHome className="mr-3" />
            Admin Panel
          </Link> */}
        </nav>
      </div>
      <div className="mb-4">
        <Link to="/logout" className="flex items-center py-2 px-6 text-gray-700 hover:bg-blue-100">
          <FaSignOutAlt className="mr-3" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
