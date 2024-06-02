import { Button, Skeleton } from "antd";
import React, { forwardRef, useImperativeHandle } from "react";
import { BASE_URL_FILES } from "../../../constants/BaseURL";

export const CardTienda = forwardRef((props, ref) => {
  const {
    estado,
    perfil,
    nombre,
    ruta_logo,
    id,
    activity_shop,
  } = props;

  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  function handleButtonSelectStoreProps(value) {
    props.handleButtonSelectStore(value);
  }

  function cambiarEstadoProps(value) {
    props.cambiarEstado(value);
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col items-center justify-center">
        {estado !== "active" && (
          <span className="mt-5 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs
           font-medium bg-red-100 text-red-500">
            Desactivada
          </span>
        )}
        <div className="my-6 min-h-[70px]">
          <p
            className="sora-font font-medium text-lg 
                    text-center break-word-css-name-shop"
          >
            {nombre}
          </p>

          <p
            className="font-normal 
                    text-plomo mt-1 text-balance 
                    text-center 
                    text-sm"
          >
            {activity_shop}
          </p>
        </div>
        <div
          className="cursor-pointer w-full max-w-[220px] mx-auto"
          onClick={() =>
            estado === "active" ? handleButtonSelectStoreProps(id) : null
          }
        >
          {ruta_logo !== null ? (
            <img
              className="w-full max-w-[220px] 
                                            max-h-[420px] sm:max-h-[220px] object-cover rounded-lg"
              src={BASE_URL_FILES + ruta_logo}
              alt={`logo-tienda-${nombre}`}
            />
          ) : (
            <Skeleton.Image className="skeleton-image" />
          )}
        </div>
      </div>
      {perfil && (
        <div className="flex justify-center my-6">
          <Button
            onClick={() =>
              estado === "active"
                ? handleButtonSelectStoreProps(id)
                : cambiarEstadoProps(id)
            }
            className={`h-fit w-full max-w-[140px] ${
              estado === 0 ? "bg-gray-200 " : "bg-badged "
            } border-none text-primary font-medium 
                        transition-all`}
          >
            {estado === 0 ? "Habilitar" : "Ingresar"}
          </Button>
        </div>
      )}
    </div>
  );
});
