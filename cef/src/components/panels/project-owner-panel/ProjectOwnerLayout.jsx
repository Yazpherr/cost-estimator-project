import { Outlet } from "react-router-dom";
import SidebarLarge from "../../UI/SidebarLarge";
import SidebarResponsive from "../../UI/SidebarResponsive";
import { FaHome, FaProjectDiagram } from "react-icons/fa";

const ProjectOwnerLayout = () => {
  const menuItems = [
    { name: "Inicio", path: "/project-owner/home", icon: <FaHome /> },
    { name: "Proyectos", path: "/project-owner/projects", icon: <FaProjectDiagram /> },
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
