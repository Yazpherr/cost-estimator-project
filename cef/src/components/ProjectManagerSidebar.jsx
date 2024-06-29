// src/components/ProjectManagerSidebar.jsx
import { FaProjectDiagram, FaUsers, FaTasks, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const ProjectManagerSidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-white h-screen w-64 px-8 py-4 shadow-lg">
      <div className="flex items-center justify-center mt-4">
        <img src="/logo.svg" alt="Speed Project" className="h-10" />
      </div>
      <nav className="mt-10">
        <Link to="/project-manager-dashboard" className={`flex items-center py-2 px-4 rounded ${location.pathname === '/project-manager-dashboard' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'} transition duration-300`}>
          <FaProjectDiagram className="mr-3" />
          Dashboard
        </Link>
        <Link to="/create-project" className={`flex items-center py-2 px-4 rounded ${location.pathname === '/create-project' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'} transition duration-300`}>
          <FaTasks className="mr-3" />
          Create Project
        </Link>
        <Link to="/assign-team-member" className={`flex items-center py-2 px-4 rounded ${location.pathname === '/assign-team-member' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'} transition duration-300`}>
          <FaUsers className="mr-3" />
          Assign Team Member
        </Link>
        <Link to="/remove-team-member" className={`flex items-center py-2 px-4 rounded ${location.pathname === '/remove-team-member' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'} transition duration-300`}>
          <FaUsers className="mr-3" />
          Remove Team Member
        </Link>
        <Link to="/logout" className="flex items-center py-2 px-4 mt-40 text-red-500 hover:bg-gray-200 rounded transition duration-300">
          <FaSignOutAlt className="mr-3" />
          Logout
        </Link>
      </nav>
    </div>
  );
};

export default ProjectManagerSidebar;
