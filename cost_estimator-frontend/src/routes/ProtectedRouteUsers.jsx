import { Layout } from "antd";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SideBar } from "../components/navegation/SideBar";
import { useAuthContext } from "../context/AuthContext";
import { LOGIN, MISTIENDAS } from "./Paths";
import { ValidateSelectBox } from "../components/ui/ValidateSelectBox";

export const ProtectedRouteUsers = () => {
  const { isAuthenticated, userLogged } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to={LOGIN} replace />;
  } else if (isAuthenticated) {
    if (userLogged != null) {
    }
  }

  const { Header, Content, Sider } = Layout;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div>
        {/* MOVIL */}
        <div
          style={{
            padding: 0,
            background: "white",
          }}
          className="border-b"
        >
          <SideBar />
        </div>
      </div>

      {/* PC TABLET */}
      <Layout className="gap-x-8" style={{ background: "white" }}>
        <ValidateSelectBox/>
        {/*         <div className="hidden md:block border-r border-gray-300">
          <Sider
            width={257}
            style={{
              background: "white",
              overflow: "auto",
              height: "100vh",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <SideBar />
          </Sider>
        </div> */}
        <Content className="px-6 mt-[22px]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
