import { Drawer, Menu } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../../routes/Paths";
import { LogoutIcon } from "../ui/icons/LogoutIcon";
import { MenuHamburgerIcon } from "../ui/icons/MenuHamburgerIcon";
import { DataBox } from "./DataBox";
import { DataShopMenuOpen } from "./DataShopMenuOpen";
import { DataUserMovile } from "./DataUserMovile";
import { DataUserPC } from "./DataUserPC";
import { DataShopPC } from "./DataShopPC";

export const SideBarResponsive = ({
  name,
  lastName,
  email,
  nameShop,
  logoShop,
  storeLogged,
  links,
  defaultOpenKeys,
  rol,
  numberBox,
}) => {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const onClick = (e) => {
    navigate(e.key);
    setOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  //Desabilitar scroll al abrir el menu responsive
  const handleOpen = () => {
    setOpen(true);
    document.body.classList.add("overflow-hidden"); // Agrega la clase de Tailwind para deshabilitar el scroll
  };

  const handleClose = () => {
    setOpen(false);
    document.body.classList.remove("overflow-hidden"); // Elimina la clase de Tailwind para habilitar el scroll
  };

  return (
    <>
      {/* Button - Logo (Version movil) */}
      <div className="flex justify-between items-center py-2 px-6">
        {/* Button open menu */}
        <button
          className={`hidden md:flex items-center gap-x-2 w-full ${
            numberBox !== null ? "max-w-[334.9px]" : "max-w-[236.19px]"
          }`}
          onClick={handleOpen}
        >
          <MenuHamburgerIcon />
          <span className="text-base font-normal hidden md:block">Menu</span>
        </button>
        {/* Logo */}
        <div className="flex items-center ">
          <img width={100} src="/img/LogoVortex4.png" alt="logo-vortex" />
        </div>

        {/* Number box y Uer data */}
        <div className="flex gap-x-4">
          <div className="hidden md:flex">
            {/* Data box */}
            {numberBox !== null && <DataBox numberBox={numberBox} />}
          </div>

          <div className="flex gap-1 min-w-[80px] ">
            {/* Usuario Data Section */}
            <DataUserPC
              closeMenu={handleClose}
              name={name}
              lastName={lastName}
              email={email}
              rol={rol}
            />

            {/* Data Shop */}
            {storeLogged != null && (
              <DataShopPC
                closeMenu={handleClose}
                name={nameShop}
                logo={logoShop}
                rol={rol}
              />
            )}
          </div>
        </div>

        <div className="flex md:hidden  gap-2">
          <div>
            {/* Data box */}
            {numberBox !== null && <DataBox numberBox={numberBox} />}
          </div>
          {/* Button open menu */}
          <button className="items-center gap-x-2" onClick={handleOpen}>
            <MenuHamburgerIcon />
            <span className="text-base font-normal hidden md:block">Menu</span>
          </button>
        </div>
      </div>

      {/* Open menu */}
      <Drawer
        placement="left"
        onClose={handleClose}
        width={276}
        open={open}
        getContainer={false}
      >
        <div className="m-auto  h-[44%] lg:h-[58%]  flex flex-col justify-between">
          <Menu
            onClick={onClick}
            style={{
              width: 276,
              maxHeight: 400,
              overflowX: "hidden",
              overflowY: "auto",
            }}
            className="mt-6 px-2"
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={defaultOpenKeys}
            selectedKeys={[location.pathname]}
            disabledOverflow={false}
            selectable={false}
            mode="inline"
            items={links}
          ></Menu>
        </div>

        {/* USER, STORE, CLOSE SESSION , MENU */}
        <div className="w-[276px] fixed bottom-0">
          <Link
            to={LOGOUT}
            onClick={handleClose}
            className="hover:bg-[#F0F0F0] pl-[12px] cursor-pointer flex items-center rounded-[12px] h-[40px] mb-4 "
          >
            <div className="flex gap-2 items-center pl-[24px]">
              <div className="contenedor_icon_menu_item">
                <LogoutIcon
                  size={24}
                  styles={"color_icon_menu_item tamaño_icon_menu_item"}
                />
              </div>
              <p className="title_menu_item text-black">Cerrar sesión</p>
            </div>
          </Link>

          <div className="md:hidden block">
            {/* Tienda data section */}
            {storeLogged != null && (
              <DataShopMenuOpen
                closeMenu={handleClose}
                name={nameShop}
                logo={logoShop}
              />
            )}
            {/* Usuario Data Section */}
            <DataUserMovile
              closeMenu={handleClose}
              name={name}
              lastName={lastName}
              email={email}
              rol={rol}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};
