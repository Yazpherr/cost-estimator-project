import React, { useEffect, useState } from "react";
import { SideBarResponsive } from "./SideBarResponsive";
//Routes
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import {
  CAJASPRIVATE,
  CATEGORIASPRIVATE,
  CLIENTESPRIVATE,
  IMPUESTOSPRIVATE,
  MISTIENDAS,
  POSPRIVATE,
  PRODUCTOSPRIVATE,
  SELECCIONARCAJA,
  USUARIOSPRIVATE,
  VENTASPRIVATE
} from "../../routes/Paths";
import { LoadingScreen } from "../ui/LoadingScreen";
import { ShopIcon } from "../ui/icons/ShopIcon";

import { CartShopIcon } from "../ui/icons/CartShopIcon";
import { ProductsIcon } from "../ui/icons/ProductsIcon";
import { UserIcon } from "../ui/icons/UserIcon";
import { UserLoveIcon } from "../ui/icons/UserLoveIcon";
import { VentaIcon } from "../ui/icons/VentaIcon";
import { ComputerPriceIcon } from "./../ui/icons/ComputerPriceIcon";
import { TaxIcon } from "./../ui/icons/TaxIcon";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

//All Link ADMIN
let linkAdmin = [
  getItem(
    <p className="title_menu_item">POS</p>,
    POSPRIVATE,
    //Icons
    <div className="contenedor_icon_menu_item">
      <CartShopIcon className={"color_icon_menu_item tamaño_icon_menu_item"} />
    </div>
  ),
  getItem(
    <p className="title_menu_item">Inventario</p>,
    "Producto",
    <div className="contenedor_icon_menu_item">
      <ProductsIcon className={"color_icon_menu_item tamaño_icon_menu_item"} />
    </div>,
    [
      getItem("Productos", PRODUCTOSPRIVATE),
      getItem("Categorías", CATEGORIASPRIVATE),
    ]
  ),
  getItem(
    <p className="title_menu_item">Cajas</p>,
    CAJASPRIVATE,
    //Icons
    <div className="contenedor_icon_menu_item">
      <ComputerPriceIcon
        className={"color_icon_menu_item tamaño_icon_menu_item"}
      />
    </div>
  ),
  getItem(
    <p className="title_menu_item">Ventas</p>,
    VENTASPRIVATE,
    //Icons
    <div className="contenedor_icon_menu_item">
      <VentaIcon className={"color_icon_menu_item tamaño_icon_menu_item"} />
    </div>
  ),
  getItem(
    <p className="title_menu_item">Clientes</p>,
    CLIENTESPRIVATE,
    //Icons
    <div className="contenedor_icon_menu_item">
      <UserLoveIcon className={"color_icon_menu_item tamaño_icon_menu_item"} />
    </div>
  ),
  getItem(
    <p className="title_menu_item">Impuestos</p>,
    IMPUESTOSPRIVATE,
    //Icons
    <div className="contenedor_icon_menu_item">
      <TaxIcon className={"color_icon_menu_item tamaño_icon_menu_item"} />
    </div>
  ),
  getItem(
    <p className="title_menu_item">Usuarios</p>,
    USUARIOSPRIVATE,
    //Icons
    <div className="contenedor_icon_menu_item">
      <UserIcon styles={"color_icon_menu_item tamaño_icon_menu_item"} />
    </div>
  ),
];

//Link Vendedor
let linkVendedor = [
  getItem(
    <p className="title_menu_item">POS</p>,
    POSPRIVATE,
    //Icons
    <div className="contenedor_icon_menu_item">
      <CartShopIcon className={"color_icon_menu_item tamaño_icon_menu_item"} />
    </div>
  ),
];

const linkSoloMisTiendas = [
  getItem(
    <p className="title_menu_item">Mis tiendas</p>,
    MISTIENDAS,
    //Icons
    <div className="contenedor_icon_menu_item">
      <ShopIcon styles={"color_icon_menu_item tamaño_icon_menu_item"} />
    </div>
  ),
];

const linkSoloSeleccionarCaja = [
  getItem(
    <p className="title_menu_item">Selección de Cajas</p>,
    SELECCIONARCAJA,
    //Icons
    <div className="contenedor_icon_menu_item">
      <ComputerPriceIcon
        className={"color_icon_menu_item tamaño_icon_menu_item"}
      />
    </div>
  ),
];

const childParentMapping = {};
linkAdmin.forEach((parent) => {
  if (parent.children) {
    parent.children.forEach((child) => {
      childParentMapping[child.key] = parent.key;
    });
  }
});

linkVendedor.forEach((parent) => {
  if (parent.children) {
    parent.children.forEach((child) => {
      childParentMapping[child.key] = parent.key;
    });
  }
});

linkSoloMisTiendas.forEach((parent) => {
  if (parent.children) {
    parent.children.forEach((child) => {
      childParentMapping[child.key] = parent.key;
    });
  }
});

linkSoloSeleccionarCaja.forEach((parent) => {
  if (parent.children) {
    parent.children.forEach((child) => {
      childParentMapping[child.key] = parent.key;
    });
  }
});

export const SideBar = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, userLogged, storeLogged, selectedStore, boxLogged } =
    useAuthContext();
  //Datos User
  const [name, setName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState(null);
  //Datos shop
  const [nameShop, setNameShop] = useState("");
  const [logoShop, setLogoShop] = useState("");
  //Data box
  const [numberBox, setNumberBox] = useState(null);

  const [menuItems, setMenuItems] = useState([]);

  const [isLoadingScreen, setisLoadingScreen] = useState(false);
  const [isLoadingScreenStore, setisLoadingScreenStore] = useState(false);
  const [isLoadingScreenBox, setisLoadingScreenBox] = useState(false);

  let defaultOpenKeys = location.pathname
    ? [childParentMapping[location.pathname]]
    : [];

  //Datos usuario
  useEffect(() => {
    setisLoadingScreen(true);

    if (isAuthenticated) {
      if (userLogged != null) {
        setName(userLogged.name);
        setLastname(userLogged.lastname);
        setEmail(userLogged.email);
        setRol(userLogged.role);

        setisLoadingScreen(false);
      }
    }
  }, [isAuthenticated, userLogged, navigate]);

  //Datos tienda
  useEffect(() => {
    let id_shop = localStorage.getItem("store");

    if (id_shop) {
      setisLoadingScreenStore(true);
      if (storeLogged != null) {
        setisLoadingScreenStore(false);
        setNameShop(storeLogged.name);
        setLogoShop(storeLogged.route_logo);
      }
    } else {
      setisLoadingScreenStore(false);
      setMenuItems(linkSoloMisTiendas);
    }
  }, [storeLogged, selectedStore]);

  //data box
  useEffect(() => {
    let id_box = localStorage.getItem("box");
    setisLoadingScreenBox(true);
    if (id_box) {
      if (boxLogged != null) {
        setNumberBox(boxLogged.title_box);
        setisLoadingScreenBox(false);
      }
    } else {
      setisLoadingScreenBox(false);
    }
  }, [boxLogged, navigate]);

  //cambiar linkAdmin del dashboard segun tipo usuario
  useEffect(() => {
    if (isAuthenticated) {
      if (userLogged != null) {
        //como un usuario normal se encarga el useeffect de arriba
        //admin
        if (userLogged.role === "admin") {
          let id_shop = localStorage.getItem("store");
          if (id_shop) {
            setMenuItems(linkAdmin);
          } else {
            setMenuItems(linkSoloMisTiendas);
          }
        }

        if (userLogged.role === "vendedor") {
          let id_shop = localStorage.getItem("store");
          if (id_shop) {
            let id_box = localStorage.getItem("box");

            if (id_box) {
              setMenuItems(linkVendedor);
            } else {
              setMenuItems(linkSoloSeleccionarCaja);
            }
          } else {
            setMenuItems(linkSoloMisTiendas);
          }
        }
      }
    }
  }, [isAuthenticated, userLogged, navigate]);

  if (isLoadingScreen || isLoadingScreenStore || isLoadingScreenBox) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* Menu movil */}
      <SideBarResponsive
        name={name}
        lastName={lastName}
        email={email}
        nameShop={nameShop}
        storeLogged={storeLogged}
        logoShop={logoShop}
        links={menuItems}
        defaultOpenKeys={defaultOpenKeys}
        rol={rol}
        numberBox={numberBox}
      />
    </>
  );
};
