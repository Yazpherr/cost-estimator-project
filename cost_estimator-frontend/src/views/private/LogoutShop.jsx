import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MISTIENDAS } from "../../routes/Paths";

export const LogoutShop = () => {
  const { logoutShop } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    logoutShop();
    navigate(MISTIENDAS)
  }, []);
  return null;
};