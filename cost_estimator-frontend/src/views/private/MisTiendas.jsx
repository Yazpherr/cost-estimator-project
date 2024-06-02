import { Button, Empty, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import { Footer } from "../../components/ui/Footer";
import { LoadingSeccion } from "../../components/ui/LoadingSeccion";
import { AddIcon } from "../../components/ui/icons/AddIcon";
import { ModalCUTienda } from "../../components/ui/modals/ModalCUTienda";
import { CardTienda } from "../../components/ui/tienda/CardTienda";
import { useAuthContext } from "../../context/AuthContext";
import { PRODUCTOSPRIVATE } from "../../routes/Paths";

export const MisTiendas = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userLogged, handleStore } = useAuthContext();
  const [data, setData] = useState([]);
  const [isLoadingSeccion, setIsLoadingSeccion] = useState(false);
  const childRef = useRef(null);
  //count tiendas
  const [countShop, setCountShop] = useState(0);
  const [disabledButtonCreateShop, setDisabledButtonCreateShop] =
    useState(true);

  useEffect(() => {
    if (isAuthenticated && userLogged != null) {
      getShopIdUser();
    }
  }, [isAuthenticated, userLogged]);

  const getShopIdUser = async () => {
    setIsLoadingSeccion(true);
    await axiosInstance
      .get("/api/getShopIdUser/" + userLogged.id)
      .then((response) => {
        console.log(response.data);
        setData(response.data);

        if (response.data) {
          setCountShop(1);
          setDisabledButtonCreateShop(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setCountShop(0);
          setDisabledButtonCreateShop(false);
        }
      })
      .finally(function () {
        setIsLoadingSeccion(false);
      });
  };

  function handleButtonSelectStore(value) {
    handleStore(value);
    navigate(PRODUCTOSPRIVATE);
  }

  const cambiarEstado = async (id) => {
    message.loading("Cambiando estado de la tienda...");
    await axiosInstance
      .put("/api/updateStatusTienda/" + id + "/" + userLogged.rut)
      .then((response) => {
        message.destroy();
        message.success(`El estado de la tienda se ha cambiado correctamente.`);
        getShopIdUser();
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.data.error ===
          "El usuario ya tiene registradas 5 tiendas. No se pueden registrar más."
        ) {
          message.destroy();
          message.error(`Ya tienes 5 tiendas activas`);
          return;
        }
        message.error(`El estado de la tienda no se ha podido cambiar.`);
      });
  };

  useEffect(() => {
    let id_shop = localStorage.getItem("store");

    if (id_shop) {
      navigate(PRODUCTOSPRIVATE);
    }
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <div className="flex justify-between gap-4 mb-12 flex-wrap items-center">
          <h2 className="sora-font text-3xl sm:text-4xl font-bold">
            Mi tienda
          </h2>
          <div className="container-button-items-tienda flex w-full items-center gap-4 md:w-fit justify-end ">
            {isLoadingSeccion ? (
              <p className="text-plomo">Cargando...</p>
            ) : (
              <p className="text-plomo">{countShop}/1 Tienda</p>
            )}
            <Button
              disabled={disabledButtonCreateShop}
              color="primary"
              className="h-fit flex gap-2 border-none bg-primary text-white"
              onClick={() => childRef.current.childFunction(null, "Agregar")}
            >
              <AddIcon className="size-5 flex" />
              Agregar Tienda
            </Button>
          </div>
        </div>

        <ModalCUTienda
          ref={childRef}
          reloadData={getShopIdUser}
          cambiarEstado={cambiarEstado}
        />

        {isLoadingSeccion ? (
          <LoadingSeccion />
        ) : data.length === 0 ? (
          <Empty description="Actualmente no tienes tu tienda creada." />
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8`}
          >
            <div
              className={`${
                data.active == 0 && "bg-gray-200"
              } max-w-[600px] w-full mx-auto rounded-xl mb-12 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}
            >
              <CardTienda
                estado={data.active}
                perfil={true}
                handleButtonSelectStore={handleButtonSelectStore}
                cambiarEstado={cambiarEstado}
                id={data.id}
                nombre={data.name}
                activity_shop={data.activity_shop}
                ruta_logo={data.route_logo}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
