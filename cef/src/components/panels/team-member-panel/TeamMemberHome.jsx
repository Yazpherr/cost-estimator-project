import SidebarLarge from "../../UI/SidebarLarge";
import SidebarResponsive from "../../UI/SidebarResponsive";
import { FaHome, FaUserPlus } from "react-icons/fa"; // Asegúrate de incluir todos los íconos necesarios

const TeamMemberHome = () => {
  const menuItems = [
    { name: "Inicio", path: "/team-member", icon: <FaHome /> },
    { name: "Registrar Tarea", path: "/team-member/register-task", icon: <FaUserPlus /> }, // Cambia los nombres y paths según sea necesario
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
        <h1>Bienvenido, Team Member</h1>
        <p>Esta es la página de inicio del Team Member.</p>
      </div>
    </div>
  );
};

export default TeamMemberHome;
