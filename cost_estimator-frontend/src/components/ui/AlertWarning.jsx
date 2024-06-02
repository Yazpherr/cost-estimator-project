import React, { useEffect, useState } from "react";
import { XIcon } from "./icons/XIcon";

export const AlertWarning = ({
  titulo,
  descripcion,
  otraLinea,
  noShowAgain,
}) => {
  const [noShowAlertMore, setNoShowAlertMore] = useState(false);

  useEffect(() => {
    localStorage.getItem("no-show-alert-tax");

    if (localStorage.getItem("no-show-alert-tax")) {
      setNoShowAlertMore(true);
    }
  }, [noShowAlertMore, []]);

  return (
    <>
      {!noShowAgain ? (
        <>
          <div
            className="bg-yellow-50 border-s-4 
      border-yellow-500 p-4 rounded-[12px]"
            role="alert"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                {/* Icon */}
                <span>
                  <svg
                    className="inline-flex justify-center items-center size-8 rounded-full
              border-4 border-yellow-100 bg-yellow-200
               text-yellow-600 "
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
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </span>
                {/* End Icon */}
              </div>
              <div className="ms-3">
                <h3 className="text-negro font-semibold ">{titulo}</h3>
                <p className="text-sm text-negro ">{descripcion}</p>
                <p className="text-sm text-negro ">{otraLinea}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {!noShowAlertMore && (
            <div
              className="bg-yellow-50 border-s-4 
border-yellow-500 p-4 rounded-[12px]"
              role="alert"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  {/* Icon */}
                  <span>
                    <svg
                      className="inline-flex justify-center items-center size-8 rounded-full
        border-4 border-yellow-100 bg-yellow-200
         text-yellow-600 "
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
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </span>
                  {/* End Icon */}
                </div>
                <div className="ms-3">
                  <div className="flex flex-wrap gap-1 mb-1 justify-between">
                    <h3 className="text-negro font-semibold ">{titulo}</h3>
                    <button
                      onClick={() =>
                        localStorage.setItem("no-show-alert-tax", true) + 
                        setNoShowAlertMore(true)
                      }
                    >
                      <XIcon className="size-4" />
                    </button>
                  </div>
                  <p className="text-sm text-negro ">{descripcion}</p>
                  <p className="text-sm text-negro ">{otraLinea}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
