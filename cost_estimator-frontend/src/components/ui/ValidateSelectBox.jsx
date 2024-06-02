import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SELECCIONARCAJA } from "../../routes/Paths";
import { useAuthContext } from "../../context/AuthContext";

export const ValidateSelectBox = () => {
  const { isAuthenticated, userLogged } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (userLogged != null) {
        if (userLogged.role === "vendedor") {
          let id_box = localStorage.getItem("box");

          if (!id_box) {
            if (
              location.pathname !== "/priv/mi-perfil" &&
              location.pathname !== "/priv/mi-tienda" &&
              location.pathname !== "/logout"
            ) {
              navigate(SELECCIONARCAJA);
            }
          }
        }
      }
    }
  }, [isAuthenticated, userLogged, navigate]);
};
