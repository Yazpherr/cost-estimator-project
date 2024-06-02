import { Button } from "antd";
import React from "react";

export const CardBox = ({ idBox, titleBox, status, occupyBox, occupiedBy }) => {
  function onClicOccupyBox(id) {
    occupyBox(id);
  }

  return (
    <>
      <div
        className={`
        max-w-[600px] w-full mx-auto rounded-xl
       mb-12 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
       border-[2px] ${
         status === "available"
           ? "border-primary"
           : status === "busy"
           ? "border-yellow-300"
           : status === "desactive"
           ? "border-red-500"
           : null
       }
        `}
      >
        {/*Estado */}
        <div className="flex justify-center">
          {status === "available" ? (
            <span className="text-primary bg-badged p-2 rounded-xl mt-4 block max-w-fit">
              Disponible
            </span>
          ) : status === "busy" ? (
            <span className="text-yellow-700 bg-yellow-200 p-2 rounded-xl mt-4 block max-w-fit">
              Ocupada
            </span>
          ) : status === "desactive" ? (
            <span className="text-red-500 bg-red-100 p-2 rounded-xl mt-4 block max-w-fit">
              Desactivada
            </span>
          ) : null}
        </div>

        {/* Titulo de caja */}
        <div className="my-8">
          <p className="text-negro text-5xl font-medium text-center">
            {titleBox}
          </p>
        </div>

        {/* Seleccionar */}
        {status === "available" && (
          <div className="flex justify-center mb-4">
            <Button
              onClick={() => onClicOccupyBox(idBox)}
              className="h-fit border-none text-primary"
            >
              Seleccionar
            </Button>
          </div>
        )}

        {/* Ocupada por */}
        {status === "busy" && (
          <div className="mb-4 py-[14px]">
            <p className="text-plomo text-center">Ocupada por: {occupiedBy}</p>
          </div>
        )}

        {/* Desactivada*/}
        {status === "desactive" && (
          <div className="mb-4 py-[14px]">
            <p className="text-plomo text-center">No puedes usar esta caja</p>
          </div>
        )}
      </div>
    </>
  );
};
