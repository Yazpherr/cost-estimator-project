import { Avatar, Tooltip } from "antd";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ConfigIcon } from "../ui/icons/ConfigIcon";
import { MIPERFILPRIVATE } from "../../routes/Paths";

export const DataUserMovile = forwardRef((props, ref) => {
  const { name, lastName, email, rol } = props;

  const handleClickEnlace = () => {
    props.closeMenu();
  };

  return (
    <>
      <div className="flex justify-between items-center border-t
       py-5 pl-6 pr-4 border-gray-300">
        <div className="flex items-center gap-2">
          <Avatar className="bg-primary">{name[0]}</Avatar>
          <div>
            <Tooltip
              placement="top"
              className="cursor-pointer"
              title={name + " " + lastName}
            >
              <p className="font-medium text-sm">
                {name.length > 8 ? `${name.slice(0, 8)}...` : name}{" "}
                {lastName.length > 8 ? `${lastName.slice(0, 8)}...` : lastName}
              </p>
            </Tooltip>

            <Tooltip placement="top" className="cursor-pointer" title={email}>
              <p className="font-medium text-xs text-grayCustom">
                {" "}
                {email.length > 20 ? `${email.slice(0, 20)}...` : email}
              </p>
            </Tooltip>
          </div>
        </div>

        <div>
          <div onClick={handleClickEnlace}>
            <Link
              className="text-primary hover:text-green-500"
              to={MIPERFILPRIVATE}
            >
              <ConfigIcon size={20} color="#808080" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});
