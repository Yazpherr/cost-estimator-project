import { Outlet } from "react-router-dom";
import SidebarLarge from "../../UI/SidebarLarge";
import SidebarResponsive from "../../UI/SidebarResponsive";
import ProjectIcon from "../../UI/icons/ProjectIcon"
import RequerimentIcon from "../../UI/icons/RequerimentIcon"


const TeamMemberLayout = () => {
  const menuItems = [
    // { name: "Inicio", path: "/team-member/home", icon: <FaHome /> },
    { name: "Proyectos", path: "/team-member/proyectos-tm", icon: <ProjectIcon /> },
    { name: "Requerimientos", path: "/team-member/requerimientos-tm", icon: <RequerimentIcon /> },
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

export default TeamMemberLayout;
