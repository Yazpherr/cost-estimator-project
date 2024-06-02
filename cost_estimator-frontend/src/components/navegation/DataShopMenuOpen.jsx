import { Avatar, Tooltip } from "antd";
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { BASE_URL_FILES } from "../../constants/BaseURL";
import { MITIENDAPRIVATE } from "../../routes/Paths";
import { ConfigIcon } from "../ui/icons/ConfigIcon";

export const DataShopMenuOpen = forwardRef((props, ref) => {
  const { name, logo } = props;

  const handleClickEnlace = () => {
    props.closeMenu();
  };

  return (
    <>
      <div className="flex justify-between items-center border-t py-5 pl-6 pr-4 border-gray-300">
        <div className="flex items-center gap-2">
          {logo !== null ? (
            <Avatar
              size={36}
              src={
                <img
                  className="w-full"
                  src={BASE_URL_FILES + logo}
                  alt="logo-tienda"
                />
              }
            >
              {name[0]}
            </Avatar>
          ) : (
            <Avatar className="bg-white border-2 border-primary text-primary">
              {name[0]}
            </Avatar>
          )}
          <div>
            <p className="text-plomo text-xs">Tu tienda:</p>

            <Tooltip placement="top" className="cursor-pointer" title={name}>
              <p className="font-medium text-sm">
                {name.length > 15 ? `${name.slice(0, 15)}...` : name}{" "}
              </p>
            </Tooltip>
          </div>
        </div>

        <div>
          <button className="flex" onClick={handleClickEnlace}>
            <Link
              className="text-primary hover:text-green-500"
              to={MITIENDAPRIVATE}
            >
              <ConfigIcon size={20} color="#808080" />
            </Link>
          </button>
        </div>
      </div>

    </>
  );
});
