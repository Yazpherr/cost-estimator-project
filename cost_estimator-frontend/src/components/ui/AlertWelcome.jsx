import React from "react";

export const AlertWelcome = ({ titulo, descripcion, otraDescripcion }) => {
  return (
    <div
      className="bg-green-50 border-s-4
         border-primary p-4 rounded-[12px]"
      role="alert"
    >
      <div className="flex">
        <div className="ms-3">
          <h3 className="text-negro mb-1 font-semibold text-base">{titulo}</h3>
          <p className="text-sm text-negro text-balance">{descripcion}</p>
          <p className="text-sm text-negro  mt-2">Si tienes algún problema escríbenos a <a className="text-negro font-semibold hover:text-negro" href="mailto:desarrollo@grupovortex.cl">desarrollo@grupovortex.cl</a></p>
        </div>
      </div>
    </div>
  );
};
