import { Link } from "react-router-dom";

const NavBarSoloLogo = () => {
  return (
    <nav className="bg-white shadow-md py-2 px-8 flex justify-between items-center">
      <Link to="/" className="text-blue-800">
        Volver 
      </Link>
      <img
        src="/speed-project-ico.svg"
        alt="Speed Project"
        className="h-8 mx-auto"
      />
    </nav>
  );
};

export default NavBarSoloLogo;
