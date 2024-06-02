import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { LOGOUT } from "./Paths";

export const ProtectedRouteLogout = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <Outlet />
    </>
  );
};
