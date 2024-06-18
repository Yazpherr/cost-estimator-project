import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaProjectDiagram, FaTasks, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';

const SidebarPm = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="bg-white h-screen p-5 shadow-md flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold mb-8">Speed Project</div>
        <nav className="flex flex-col space-y-4">
          <Link to="/project-manager-dashboard/create-project" className={`flex items-center p-2 rounded ${location.pathname === '/project-manager-dashboard/create-project' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
            <FaProjectDiagram className="mr-2" /> Create Project
          </Link>
          <Link to="/project-manager-dashboard/create-requirement" className={`flex items-center p-2 rounded ${location.pathname === '/project-manager-dashboard/create-requirement' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
            <FaTasks className="mr-2" /> Create Requirement
          </Link>
          <Link to="/project-manager-dashboard/assign-team-member" className={`flex items-center p-2 rounded ${location.pathname === '/project-manager-dashboard/assign-team-member' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
            <FaUsers className="mr-2" /> Assign Team Member
          </Link>
          <Link to="/project-manager-dashboard/remove-team-member" className={`flex items-center p-2 rounded ${location.pathname === '/project-manager-dashboard/remove-team-member' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
            <FaUsers className="mr-2" /> Remove Team Member
          </Link>
        </nav>
      </div>
      <div>
        <button onClick={handleLogout} className="flex items-center p-2 rounded text-gray-700 hover:bg-gray-200 w-full">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarPm;
