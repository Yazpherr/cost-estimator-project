import  { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

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
    window.addEventListener('resize', closeMenu);
    return () => {
      window.removeEventListener('resize', closeMenu);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/speed-project-ico.svg" alt="Speed Project" className="h-8 mr-2" />
            <h1 className="text-2xl font-bold">Speed Project</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-800 hover:text-purple-600">Features</a>
            <a href="#solution" className="text-gray-800 hover:text-purple-600">Solution</a>
            <a href="#reviews" className="text-gray-800 hover:text-purple-600">Reviews</a>
            <a href="#pricing" className="text-gray-800 hover:text-purple-600">Pricing</a>
            <a href="#login" className="text-gray-800 hover:text-purple-600">Login</a>
            <a href="#get-started" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">Get Started</a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-200 z-10">
          <a href="#features" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Features</a>
          <a href="#solution" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Solution</a>
          <a href="#reviews" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Reviews</a>
          <a href="#pricing" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Pricing</a>
          <a href="#login" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Login</a>
          <a href="#get-started" className="block px-4 py-2 bg-purple-600 text-white hover:bg-purple-700">Get Started</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

