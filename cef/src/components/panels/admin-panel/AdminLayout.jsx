import { Outlet } from 'react-router-dom';
import SidebarLarge from '../../UI/SidebarLarge';
import SidebarResponsive from '../../UI/SidebarResponsive';
import { FaHome, FaUserPlus } from 'react-icons/fa';

const AdminLayout = () => {
  const menuItems = [
    { name: "Profesion", path: "/admin/profesion", icon: <FaHome /> },
    { name: "Registrar Proyecto", path: "/admin/register-dentist", icon: <FaUserPlus /> },
  ];

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block border-r border-gray-200">
        <SidebarLarge menuItems={menuItems} />
      </div>
      <div className="block md:hidden border-r border-gray-200">
        <SidebarResponsive menuItems={menuItems} />
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
