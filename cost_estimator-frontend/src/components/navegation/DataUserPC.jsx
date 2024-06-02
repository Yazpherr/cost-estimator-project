import { Avatar, Dropdown, Tooltip } from "antd";
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ConfigIcon } from "../ui/icons/ConfigIcon";
import { MIPERFILPRIVATE } from "../../routes/Paths";
import { DownIcon } from "../ui/icons/DownIcon";

export const DataUserPC = forwardRef((props, ref) => {
  const { name, lastName, email, rol } = props;


  const items = [
    {
      key: "1",
      disabled: true,
      label: (
        <Tooltip
          placement="top"
          className="cursor-default"
          title={name + " " + lastName}
        >
          <div>
            <p className="text-plomo text-xs">Nombre:</p>
            <p className="font-medium text-[13px] text-negro">
              {name.length > 8 ? `${name.slice(0, 8)}...` : name}{" "}
              {lastName.length > 8 ? `${lastName.slice(0, 8)}...` : lastName}
            </p>
          </div>
        </Tooltip>
      ),
    },
    {
      key: "2",
      disabled: true,
      label: (
        <Tooltip placement="top" className="cursor-pointer" title={email}>
          <p className="text-plomo text-xs">Correo electrónico:</p>
          <p className="font-medium text-[13px] text-negro">
            {" "}
            {email.length > 20 ? `${email.slice(0, 20)}...` : email}
          </p>
        </Tooltip>
      ),
    },
    {
      key: "2",
      disabled: true,
      label: (
        <Tooltip placement="top" className="cursor-pointer" title={email}>
          <p className="text-plomo text-xs">Rol:</p>
          <p className="font-medium text-[13px] text-negro">
            {rol === "admin" ? 'Administrador' : rol === 'vendedor' ? 'Vendedor' : null}
          </p>
        </Tooltip>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          className="text-primary ml-1 text-[13px] hover:text-green-500"
          to={MIPERFILPRIVATE}
        >
          Configuración
        </Link>
      ),
      icon: <ConfigIcon size={20} color="#808080" />,
    },
  ];

  return (
    <>
      {/* Data user */}
      <div className="hidden md:flex justify-end gap-2 items-center">
        <p className="text-[13px] text-plomo">Usuario:</p>
        <div className="flex items-center gap-1">
          <Avatar className="bg-primary">{name[0]}</Avatar>
          <div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              placement="bottom"
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
