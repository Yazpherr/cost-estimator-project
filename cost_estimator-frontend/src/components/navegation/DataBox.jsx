import React from "react";
import { ComputerPriceIcon } from "../ui/icons/ComputerPriceIcon";

export const DataBox = ({ numberBox }) => {
  return (
    <>
      <div className="flex gap-1 items-center">
        <ComputerPriceIcon className="size-6 text-primary" />
        <p className="text-plomo">
          Caja: <span className="text-negro font-medium">{numberBox}</span>
        </p>
      </div>
    </>
  );
};
