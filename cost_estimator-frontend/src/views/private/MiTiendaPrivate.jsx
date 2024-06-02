import { Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import { LoadingSeccion } from "../../components/ui/LoadingSeccion";
import { SinDatoBadget } from "../../components/ui/SinDatoBadget";
import { EditIcon } from "../../components/ui/icons/EditIcon";
import { ModalCUTienda } from "../../components/ui/modals/ModalCUTienda";
import { CardTienda } from "../../components/ui/tienda/CardTienda";

export const MiTiendaPrivate = () => {
  const navigate = useNavigate();
  const childRef = useRef(null);

  const [loadingSeccion, setLoadingSeccion] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getShop();
  }, []);

  const getShop = async () => {
    setLoadingSeccion(true);

    let id_shop = localStorage.getItem("store");
    let id_user = localStorage.getItem("u");

    await axiosInstance
      .get(`/api/getShopId/${id_shop}/${id_user}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        setLoadingSeccion(false);
      });
  };

  return (
    <>
      <div className="mb-12">
        <h2 className="sora-font text-3xl sm:text-4xl font-bold">Mi Tienda</h2>
      </div>

      <section>
        {loadingSeccion ? (
          <LoadingSeccion />
        ) : (
          <div className="max-w-[380px] mx-auto rounded-xl mb-12 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="flex flex-col justify-between h-full">
              {/* Buttons */}
              <div className="flex justify-end mt-4 gap-x-3">
                {/*Editar*/}
                <Tooltip
                  placement="top"
                  className="cursor-pointer"
                  title="Editar"
                >
                  <button
                    onClick={() =>
                      childRef.current.childFunction(data.id, "Edit", data)
                    }
                  >
                    <EditIcon className="size-6 text-[#eab308]" />
                  </button>
                </Tooltip>
              </div>

              <CardTienda
                estado={data.active}
                perfil={false}
                id={data.id}
                nombre={data.name}
                activity_shop={data.activity_shop}
                ruta_logo={data.route_logo}
              />

              {/* DATOS */}
              <div className="mt-12">
                <div className="flex flex-col mb-4">
                  <label>RUT o DNI:</label>
                  <p className="flex items-center text-negro gap-1">
                    {data.dni}
                  </p>
                </div>
                <div className="flex flex-col mb-4">
                  <label>Nombre:</label>
                  <p className="flex items-center text-negro gap-1">
                    {data.name}
                  </p>
                </div>
                <div className="flex flex-col mb-4">
                  <label>Correo electrónico:</label>
                  <p className="flex items-center text-negro gap-1">
                    {data.email === null ? (
                      <SinDatoBadget text="correo electrónico" />
                    ) : (
                      data.email
                    )}
                  </p>
                </div>
                <div className="flex flex-col mb-4">
                  <label>Teléfono:</label>
                  <p className="flex items-center text-negro gap-1">
                    {data.phone === null ? (
                      <SinDatoBadget text="teléfono" />
                    ) : (
                      data.phone
                    )}
                  </p>
                </div>
                <div className="flex flex-col mb-4">
                  <label>Dirección:</label>
                  <p className="flex items-center text-negro gap-1">
                    {data.address === null ? (
                      <SinDatoBadget text="dirección" />
                    ) : (
                      data.address
                    )}
                  </p>
                </div>
                <div className="flex flex-col mb-4">
                  <label>Actividad:</label>
                  <p className="flex items-center text-negro gap-1">
                    {data.activity_shop}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <ModalCUTienda ref={childRef} dataTienda={data} reloadTienda={getShop} />
    </>
  );
};
