import { Outlet } from "react-router-dom";
import SidebarLarge from "../../UI/SidebarLarge";
import SidebarResponsive from "../../UI/SidebarResponsive";
import { FaHome, FaUserPlus } from "react-icons/fa";

const ProjectOwnerLayout = () => {
  const menuItems = [
    { name: "Inicio", path: "/product-owner/home", icon: <FaHome /> },
    { name: "Proyectos", path: "/product-owner/register-project", icon: <FaUserPlus /> },
    { name: "Requerimiento", path: "/product-owner/register-requirement", icon: <FaUserPlus /> },
    { name: "Miebros de equipo", path: "/product-owner/register-team-member", icon: <FaUserPlus /> }
  ];

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <SidebarLarge menuItems={menuItems} />
      </div>
      <div className="block md:hidden">
        <SidebarResponsive menuItems={menuItems} />
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ProjectOwnerLayout;
