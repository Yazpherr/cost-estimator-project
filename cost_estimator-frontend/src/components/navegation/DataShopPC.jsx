import { Avatar, Dropdown, Tooltip } from "antd";
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { BASE_URL_FILES } from "../../constants/BaseURL";
import { MITIENDAPRIVATE } from "../../routes/Paths";
import { ConfigIcon } from "../ui/icons/ConfigIcon";
import { DownIcon } from "../ui/icons/DownIcon";

export const DataShopPC = forwardRef((props, ref) => {
  const { name, logo , rol } = props;


  const items = [
    {
      key: "1",
      disabled: true,
      label: (
        <Tooltip placement="top" className="cursor-pointer" title={name}>
          <div>
            <p className="text-plomo text-xs">Tienda:</p>
            <p className="font-medium text-[13px] text-negro">
            {name.length > 15 ? `${name.slice(0, 15)}...` : name}{" "}
          </p>
          </div>
        </Tooltip>
      ),
    },

    rol === 'admin' && 
    {
      key: "3",
      label: (
        <Link
          className="text-primary ml-1 text-[13px] hover:text-green-500"
          to={MITIENDAPRIVATE}
        >
          Configuración
        </Link>
      ),
      icon: <ConfigIcon size={20} color="#808080" />,
    },
  ];

  return (
    <>
      <div className="hidden md:flex justify-end gap-2 items-center">
        <p className="text-[13px] text-plomo">Tienda:</p>
        <div className="flex items-center gap-1">
          {/* Logo */}
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
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <DownIcon className="size-6 text-plomo" />
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
});
