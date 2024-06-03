import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-8">
      <div className="max-w-7xl mx-auto text-center px-4">
        <div className="mb-4">
          <img src="/speed-project-ico.svg" alt="Speed Project Icono" className="mx-auto h-10 mb-2" />
          <h2 className="text-2xl font-bold">Speed Project</h2>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://twitter.com" aria-label="Twitter" className="text-gray-600 hover:text-gray-800 transition duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://facebook.com" aria-label="Facebook" className="text-gray-600 hover:text-gray-800 transition duration-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-600 hover:text-gray-800 transition duration-300">
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">Copyright © Speed Project 2024 | Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;

