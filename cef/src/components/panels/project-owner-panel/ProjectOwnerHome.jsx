import SidebarLarge from "../../UI/SidebarLarge";
import SidebarResponsive from "../../UI/SidebarResponsive";
import { FaHome, FaUserPlus } from "react-icons/fa"; // Asegúrate de incluir todos los íconos necesarios

const ProjectOwnerHome = () => {
  const menuItems = [
    { name: "Inicio", path: "/project-owner", icon: <FaHome /> },
    { name: "Registrar Proyecto", path: "/project-owner/register-project", icon: <FaUserPlus /> }, // Cambia los nombres y paths según sea necesario
    { name: "Miembros de equipo", path: "/project-owner/register-project", icon: <FaUserPlus /> }, // Cambia los nombres y paths según sea necesario
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
        <h1>Bienvenido, Project Owner</h1>
        <p>Esta es la página de inicio del Project Owner.</p>
      </div>
    </div>
  );
};

export default ProjectOwnerHome;
