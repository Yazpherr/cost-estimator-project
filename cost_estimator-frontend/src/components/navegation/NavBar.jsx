import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { LOGIN } from "../../routes/Paths";
import { MenuHamburgerIcon } from "../ui/icons/MenuHamburgerIcon";

export const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <nav className="bg-white fixed w-full z-20 top-0 
    start-0 border-b border-gray-300 px-6">
      <div className="max-w-screen-xl flex flex-wrap 
      items-center justify-between mx-auto py-4 ">
        <div className="flex gap-4">
          <LinkScroll
            to="inicio"
            smooth={true}
            duration={500}
            className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
          >
            <img src="/speed-project-ico.svg" className="h-8" alt="logo-cost-estimator" />
          </LinkScroll>
          {/* Links pc */}
          <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col text-sm font-medium text-negro lg:p-0 lg:flex-row ">
              <li>
                <LinkScroll
                  to="inicio"
                  smooth={true}
                  duration={500}
                  className="block py-2 px-3 cursor-pointer"
                >
                  Inicio
                </LinkScroll>
              </li>
              <li>
                <LinkScroll
                  to="modulos"
                  smooth={true}
                  duration={500}
                  className="block py-2 px-3 cursor-pointer"
                >
                  Módulos
                </LinkScroll>
              </li>
              <li>
                <LinkScroll
                  to="planes"
                  smooth={true}
                  duration={500}
                  className="block py-2 px-3 cursor-pointer"
                >
                  Planes
                </LinkScroll>
              </li>
              <li>
                <LinkScroll
                  to="usuarios"
                  smooth={true}
                  duration={500}
                  className="block py-2 px-3 cursor-pointer"
                >
                  Usuarios
                </LinkScroll>
              </li>
              <li>
                <LinkScroll
                  to="preguntas-frecuentes"
                  smooth={true}
                  duration={500}
                  className="block py-2 px-3 cursor-pointer"
                >
                  Preguntas Frecuentes
                </LinkScroll>
              </li>
              {/*               <li>
                <Link to={INFLUENCERSHOME} className="block py-2 px-3">
                  Influencers
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* LOGIN Y COMENZAR AHORA PC BUTTON RESPONSIVE*/}
        <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reversek">
          <div className="hidden lg:flex items-center gap-6">
            <Link to={LOGIN} className="text-negro font-medium text-sm">
              Iniciar sesión
            </Link>
            <LinkScroll
              to="planes"
              smooth={true}
              duration={500}
              onClick={() => handleCloseMenu()}
              className="text-white bg-primary
                font-medium rounded-lg text-sm px-5 py-3 text-center cursor-pointer"
            >
              Ver planes
            </LinkScroll>
          </div>

          {!openMenu ? (
            <>
              {/* Open menu icon */}
              <button
                type="button"
                onClick={handleOpenMenu}
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden"
              >
                <span className="sr-only">Open main menu</span>
                <MenuHamburgerIcon />
              </button>
            </>
          ) : (
            <>
              {/* close menu */}
              <button
                type="button"
                onClick={handleCloseMenu}
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Menu responsive */}
        <div
          className={`items-center justify-between ${openMenu ? "" : "hidden"}
          w-full lg:flex lg:w-auto lg:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex lg:hidden flex-col text-sm font-medium text-negro lg:p-0 lg:flex-row ">
            <li>
              <LinkScroll
                to="inicio"
                smooth={true}
                duration={500}
                onClick={() => handleCloseMenu()}
                className="block py-2 px-3 cursor-pointer"
              >
                Inicio
              </LinkScroll>
            </li>
            <li>
              <LinkScroll
                to="modulos"
                smooth={true}
                duration={500}
                onClick={() => handleCloseMenu()}
                className="block py-2 px-3 cursor-pointer"
              >
                Módulos
              </LinkScroll>
            </li>
            <li>
              <LinkScroll
                to="planes"
                smooth={true}
                duration={500}
                onClick={() => handleCloseMenu()}
                className="block py-2 px-3 cursor-pointer"
              >
                Planes
              </LinkScroll>
            </li>
            <li>
              <LinkScroll
                to="usuarios"
                smooth={true}
                duration={500}
                onClick={() => handleCloseMenu()}
                className="block py-2 px-3 cursor-pointer"
              >
                Usuarios
              </LinkScroll>
            </li>
            <li>
              <LinkScroll
                to="preguntas-frecuentes"
                smooth={true}
                duration={500}
                className="block py-2 px-3 cursor-pointer"
                onClick={() => handleCloseMenu()}
              >
                Preguntas Frecuentes
              </LinkScroll>
            </li>
{/*             <li>
              <Link to={INFLUENCERSHOME} className="block py-2 px-3">
                Influencers
              </Link>
            </li> */}
            <li>
              <Link to={LOGIN} className="block py-2 px-3">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <LinkScroll
                to="planes"
                smooth={true}
                duration={500}
                onClick={() => handleCloseMenu()}
                className="block py-2 px-3 bg-primary rounded-xl text-white cursor-pointer"
              >
                Comenzar ahora
              </LinkScroll>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
