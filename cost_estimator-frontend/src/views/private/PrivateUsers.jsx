import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { MISTIENDAS, SELECCIONARCAJA } from "../../routes/Paths";

export const PrivateUsers = () => {
  const { isAuthenticated, userLogged } = useAuthContext();
  //navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (userLogged != null) {
        if (userLogged.role === "admin") {
          return navigate(MISTIENDAS);
        } else if (userLogged.role === "vendedor") {
          return navigate(SELECCIONARCAJA);
        }
      }
    }
  }, [isAuthenticated, userLogged, navigate]);

  return <div>Cargando...</div>;
};
