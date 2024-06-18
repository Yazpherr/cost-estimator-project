import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", closeMenu);
    return () => {
      window.removeEventListener("resize", closeMenu);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src="/speed-project-ico.svg"
              alt="Speed Project"
              className="h-8 mr-2"
            />
            <h1 className="text-2xl font-bold">Speed Project</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/register"
              className="font-semibold w-28 border border-blue-800 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-800 hover:text-white transition duration-500 ease-in-out text-center"
            >
              Registrarse
            </Link>
            <Link
              to="/login"
              className="font-semibold w-28 bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-md hover:from-blue-800 hover:to-blue-900 transition duration-300 ease-in-out text-center border-2 border-transparent hover:border-blue-500"
            >
              Ingresar
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-200 z-10">
          <Link
            to="/register"
            className="block w-full border border-blue-800 text-blue-800 px-4 py-2 rounded-md m-2 hover:bg-blue-800 hover:text-white transition duration-500 ease-in-out text-center"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="block w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-md m-2 hover:from-blue-800 hover:to-blue-900 transition duration-300 ease-in-out text-center border-2 border-transparent hover:border-blue-500"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
