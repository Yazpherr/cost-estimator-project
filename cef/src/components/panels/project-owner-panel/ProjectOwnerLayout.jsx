import { Outlet } from "react-router-dom";
import SidebarLarge from "../../UI/SidebarLarge";
import SidebarResponsive from "../../UI/SidebarResponsive";
import { FaUserPlus } from "react-icons/fa";
import ProjectIcon from "../../UI/icons/ProjectIcon"
import RequerimentIcon from "../../UI/icons/RequerimentIcon"
import TeamMemberIcon  from "../../UI/icons/TeamMemberIcon"
import AsignacionTeamMember   from "../../UI/icons/AsignacionTeamMember"

const ProjectOwnerLayout = () => {
  const menuItems = [
    // { name: "Inicio", path: "/product-owner/home", icon: <FaHome /> },
    { name: "Proyectos", path: "/product-owner/register-project", icon: <ProjectIcon /> },
    { name: "Requerimiento", path: "/product-owner/register-requirement", icon: <RequerimentIcon /> },
    { name: "Miebros de equipo", path: "/product-owner/register-team-member", icon: <TeamMemberIcon /> },
    { name: "Asignar a TM", path: "/product-owner/asignar-team-member-proyecto", icon: <AsignacionTeamMember  /> }
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
