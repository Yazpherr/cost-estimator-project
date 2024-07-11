import { Outlet } from 'react-router-dom';
import SidebarLarge from '../../UI/SidebarLarge';
import SidebarResponsive from '../../UI/SidebarResponsive';
import TeamMemberIcon  from "../../UI/icons/TeamMemberIcon"
import ProfesionIcon   from "../../UI/icons/ProfesionIcon"


const AdminLayout = () => {
  const menuItems = [
    { name: "Products Owners", path: "/admin/crear-product-owner", icon: <TeamMemberIcon /> },
    { name: "Profesion", path: "/admin/profesion", icon: <ProfesionIcon  /> },
    // { name: "Puntos de Funcion", path: "/admin/puntos-de-funcion", icon: <FaUserPlus /> },
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
