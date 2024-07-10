import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';

const SidebarResponsive = ({ menuItems }) => {
  const { logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="text-xl p-2"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 h-screen w-64 bg-gray-100 flex flex-col justify-between border-r border-gray-200">
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 text-xl font-bold">DentalNet</div>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index} className="p-2 hover:bg-gray-200">
                  <Link to={item.path} className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center space-x-2 hover:bg-red-600"
            >
              <FaSignOutAlt />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

SidebarResponsive.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired
    })
  ).isRequired
};

export default SidebarResponsive;
