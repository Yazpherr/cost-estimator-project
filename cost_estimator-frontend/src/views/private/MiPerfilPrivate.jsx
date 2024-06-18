import { Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../axios/axiosInstance";
import { LoadingSeccion } from "../../components/ui/LoadingSeccion";
import { EditIcon } from "../../components/ui/icons/EditIcon";
import { ModalCUUsuarios } from "../../components/ui/modals/ModalCUUsuarios";
import { LockIcon } from "../../components/ui/icons/LockIcon";
import { ModalCambiarClave } from "../../components/ui/modals/ModalCambiarClave";
import { Footer } from "../../components/ui/Footer";
import { SinDatoBadget } from "../../components/ui/SinDatoBadget";

export const MiPerfilPrivate = () => {
  const childRef = useRef(null);
  const childRefCambiarClave = useRef(null);

  const [loadingSeccion, setLoadingSeccion] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    setLoadingSeccion(true);

    let id_user = localStorage.getItem("u");

    await axiosInstance
      .get(`/api/getUserId/${id_user}`)
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
        <h2 className="sora-font text-3xl sm:text-4xl font-bold">Mi Perfil</h2>
      </div>

      <ModalCambiarClave ref={childRefCambiarClave} dataUser={data} />
      <ModalCUUsuarios isMyProfile={true} ref={childRef} reloadUser={getUserId} />

      <section>
        {loadingSeccion ? (
          <LoadingSeccion />
        ) : (
          <div className="flex flex-col justify-between min-h-screen">
            <div>
              <div className="max-w-[380px] mx-auto rounded-xl mb-12 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="flex flex-col justify-between h-full">
                  {/* Buttons */}
                  <div className="flex justify-end mt-4 gap-x-3">
                    {/*Cambiar contraseñ*/}
                    <Tooltip
                      placement="top"
                      className="cursor-pointer"
                      title="Cambiar contraseña"
                    >
                      <button
                        onClick={() =>
                          childRefCambiarClave.current.childFunction()
                        }
                      >
                        <LockIcon className="size-6 text-[#1F1F1F]" />
                      </button>
                    </Tooltip>
                  </div>

                  {/* img */}
                  <div className="w-full flex justify-center mt-4">
                    <div className="bg-primaryBlue flex justify-center items-center w-full h-[140px] sm:h-[200px] max-w-[140px] sm:max-w-[200px] rounded-full">
                      <p className="text-white text-8xl">
                        {data.name && data.name[0]}
                      </p>
                    </div>
                  </div>
                  {/* DATOS  */}
                  <div className="mt-12 w-full max-w-[330px] mx-auto">
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
                      <label>Apellido:</label>
                      <p className="flex items-center text-negro gap-1">
                        {data.lastname}
                      </p>
                    </div>
                    <div className="flex flex-col mb-4">
                      <label>Correo electrónico:</label>
                      <p className="flex items-center text-negro gap-1">
                        {data.email}
                      </p>
                    </div>
                    <div className="flex flex-col mb-4">
                      <label>Teléfono:</label>
                      <p className="flex items-center text-negro gap-1">
                        {data.phone === null || data.phone === "" ? (
                          <SinDatoBadget text="teléfono" />
                        ) : (
                          data.phone
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col mb-4">
                      <label>País:</label>
                      <p className="flex items-center text-negro gap-1">
                        {data.country === null
                          ? "Sin páis"
                          : data.country &&
                            (data.country.includes("|")
                              ? data.country.substring(
                                  data.country.indexOf("|") + 1
                                )
                              : data.country)}
                      </p>
                    </div>

                    {data.country ? (
                      data.country === "CL|Chile" ? (
                        <>
                          <div className="flex flex-col mb-4">
                            <label>Región:</label>
                            <p className="flex items-center text-negro gap-1">
                              {data.region === null
                                ? "Sin dirección"
                                : data.region &&
                                  (data.region.includes("|")
                                    ? data.region.substring(
                                        data.region.indexOf("|") + 1
                                      )
                                    : region.pais)}
                            </p>
                          </div>
                          <div className="flex flex-col mb-4">
                            <label>Comuna:</label>
                            <p className="flex items-center text-negro gap-1">
                              {data.comuna && data.comuna === null
                                ? "Sin dirección"
                                : data.comuna &&
                                  (data.comuna.includes("|")
                                    ? data.comuna.substring(
                                        data.comuna.indexOf("|") + 1
                                      )
                                    : comuna.pais)}
                            </p>
                          </div>
                        </>
                      ) : null
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
