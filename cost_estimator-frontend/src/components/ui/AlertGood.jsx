import React from "react";

export const AlertGood = ({ titulo, descripcion }) => {
  return (
    <div
      className="bg-green-50 border-s-4 border-primary p-4 rounded-[12px]"
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {/* Icon */}
          <span className="inline-flex justify-center items-center size-8 rounded-full
           border-4 border-green-100 bg-green-200
            text-green-800">
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          {/* End Icon */}
        </div>
        <div className="ms-3">
          <h3 className="text-negro font-semibold">{titulo}</h3>
          <p className="text-sm text-negro ">{descripcion}</p>
        </div>
      </div>
    </div>
  );
};
