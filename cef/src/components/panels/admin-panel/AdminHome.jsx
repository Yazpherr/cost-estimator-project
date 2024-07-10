import SidebarLarge from "../../UI/SidebarLarge";
import SidebarResponsive from "../../UI/SidebarResponsive";
import { FaHome } from "react-icons/fa";

const AdminHome = () => {
  const menuItems = [
    { name: "Inicio", path: "/admin", icon: <FaHome /> },
    { name: "Registrar Dentista", path: "/admin/register-dentist", icon: <FaHome /> },
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
        <h1>Bienvenido, Administrador</h1>
        <p>Esta es la página de inicio del administrador.</p>
      </div>
    </div>
  );
};

export default AdminHome;
