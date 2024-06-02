import React from "react";

export const SinDatoBadget = ({ text, sinStock }) => {
  return (
    <span
      className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 
      rounded-full text-center text-xs font-medium ${
        sinStock ? "bg-red-500 text-white" : "bg-[#F4F4F5] text-negro"
      }`}
    >
      Sin {text}
    </span>
  );
};
