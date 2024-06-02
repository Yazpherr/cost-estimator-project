import { BrowserRouter, Route, Routes } from "react-router-dom";
//Diseño
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";
//PATH ROUTES
import {
  CAJASPRIVATE,
  CATEGORIASPRIVATE,
  CLIENTESPRIVATE,
  IMPUESTOSPRIVATE,
  LOGIN,
  LOGOUT,
  LOGOUTSHOP,
  MIPERFILPRIVATE,
  MISTIENDAS,
  MITIENDAPRIVATE,
  POLITICASPRIVACIDAD,
  POLITICASUSOSOFTWARE,
  POSPRIVATE,
  PRIVATEUSERS,
  PRODUCTOSPRIVATE,
  REGISTER,
  REQUERSTRESETPASSWORD,
  RESETPASSWORD,
  SELECCIONARCAJA,
  TERMINOSCONDICIONES,
  USUARIOSPRIVATE,
  VENTASPRIVATE,
} from "./routes/Paths";

//AuthProvider
import { AuthProvider } from "./context/AuthContext";

//Public Views
import { Error404 } from "./views/Error404";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { RequestResetPassword } from "./views/RequestResetPassword";
import { ResetPassword } from "./views/ResetPassword";
import { PoliticasPrivacidad } from "./views/terminos-politicas/PoliticasPrivacidad";
import { PoliticasUsoSoftware } from "./views/terminos-politicas/PoliticasUsoSoftware";
import { TerminosCondiciones } from "./views/terminos-politicas/TerminosCondiciones";

//Private Views
import { ProtectedRouteUsers } from "./routes/ProtectedRouteUsers";
import { CajasPrivate } from "./views/private/CajasPrivate";
import { ClientesPrivate } from "./views/private/ClientesPrivate";
import { ImpuestosPrivate } from "./views/private/ImpuestosPrivate";
import { Logout } from "./views/private/Logout";
import { LogoutShop } from "./views/private/LogoutShop";
import { MiPerfilPrivate } from "./views/private/MiPerfilPrivate";
import { MiTiendaPrivate } from "./views/private/MiTiendaPrivate";
import { MisTiendas } from "./views/private/MisTiendas";
import { POSPrivate } from "./views/private/POSPrivate";
import { PrivateUsers } from "./views/private/PrivateUsers";
import { UsuariosPrivate } from "./views/private/UsuariosPrivate";
import { VentasPrivate } from "./views/private/VentasPrivate";
import { CategoriasPrivate } from "./views/private/inventario/CategoriasPrivate";
import { ProductosPrivate } from "./views/private/inventario/ProductosPrivate";
import { SeleccionarCajas } from "./views/private/vendedor/SeleccionarCajas";

function App() {
  return (
    <>
      <ConfigProvider
        locale={esES}
        theme={{
          token: {
            fontFamily: "Inter",
            colorText: "#1F1F1F",
            colorPrimary: "#14A800",
          },
          components: {
            Menu: {
              itemSelectedBg: "#E7FFEC",
              itemSelectedColor: "#1F1F1F",
              colorBgElevated: "#1E40AF",
            },
            Input: {
              colorPrimary: "#14A800",
              colorBorder: "#D1D5DB",
              colorTextPlaceholder: "#9CA3AF",
              algorithm: true, // Enable algorithm
              paddingBlock: 12,
              paddingInline: 16,
              borderRadius: 12,
              lineWidth: 2,
            },
            DatePicker: {
              colorPrimary: "#14A800",
              colorBorder: "#D1D5DB",
              colorTextPlaceholder: "#9CA3AF",
              algorithm: true, // Enable algorithm
              paddingBlock: 12,
              paddingInline: 16,
              borderRadius: 12,
              lineWidth: 2,
            },
            InputNumber: {
              colorPrimary: "#14A800",
              colorBorder: "#D1D5DB",
              colorTextPlaceholder: "#9CA3AF",
              algorithm: true, // Enable algorithm
              paddingBlock: 12,
              paddingInline: 16,
              borderRadius: 12,
              lineWidth: 2,
            },
            Select: {
              colorPrimary: "#14A800",
              colorBorder: "#D1D5DB",
              colorTextPlaceholder: "#9CA3AF",
              algorithm: true, // Enable algorithm
              paddingBlock: 12,
              paddingInline: 16,
              borderRadius: 12,
              lineWidth: 2,
            },
            Button: {
              borderRadius: 12,
              defaultHoverBorderColor: null,
              defaultHoverBg: null,
              defaultShadow: null,
              defaultHoverColor: null,
            },
            Table: {
              headerBg: "#F4F4F5",
            },
          },
        }}
      >
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* PUBLIC */}
              <Route path="/" element={<Home />}></Route>
              {/*               <Route path="/" element={<Mantenimiento />}></Route> */}
              <Route path="*" element={<Error404 />}></Route>
              <Route path={LOGIN} element={<Login />}></Route>
              <Route path={REGISTER} element={<Register />}></Route>

              {/* Politicas privadad */}
              <Route
                path={TERMINOSCONDICIONES}
                element={<TerminosCondiciones />}
              ></Route>
              <Route
                path={POLITICASUSOSOFTWARE}
                element={<PoliticasUsoSoftware />}
              ></Route>
              <Route
                path={POLITICASPRIVACIDAD}
                element={<PoliticasPrivacidad />}
              ></Route>
              {/* Olvide contraseña */}
              <Route
                path={REQUERSTRESETPASSWORD}
                element={<RequestResetPassword />}
              ></Route>
              <Route path={RESETPASSWORD} element={<ResetPassword />}></Route>

              {/* Usuarios views */}
              <Route path={PRIVATEUSERS} element={<ProtectedRouteUsers />}>
                <Route path={PRIVATEUSERS} element={<PrivateUsers />}></Route>
                <Route path={LOGOUTSHOP} element={<LogoutShop />}></Route>

                {/* Mis tiendas */}
                <Route path={MISTIENDAS} element={<MisTiendas />}></Route>
                {/* Mi tienda */}
                <Route
                  path={MITIENDAPRIVATE}
                  element={<MiTiendaPrivate />}
                ></Route>
                {/* Usuarios  */}
                <Route
                  path={USUARIOSPRIVATE}
                  element={<UsuariosPrivate />}
                ></Route>
                {/* Inventario */}
                <Route
                  path={PRODUCTOSPRIVATE}
                  element={<ProductosPrivate />}
                ></Route>
                <Route
                  path={CATEGORIASPRIVATE}
                  element={<CategoriasPrivate />}
                ></Route>
                {/*Impuestos */}
                <Route
                  path={IMPUESTOSPRIVATE}
                  element={<ImpuestosPrivate />}
                ></Route>
                {/*Realizar Compra */}
                <Route path={POSPRIVATE} element={<POSPrivate />}></Route>
                {/*Cajas */}
                <Route path={CAJASPRIVATE} element={<CajasPrivate />}></Route>
                {/*Clientes */}
                <Route
                  path={CLIENTESPRIVATE}
                  element={<ClientesPrivate />}
                ></Route>
                {/*Ventas */}
                <Route path={VENTASPRIVATE} element={<VentasPrivate />}></Route>

                {/* VENDEDOR */}
                {/*vendedodor -  seleccionar cajas*/}
                <Route
                  path={SELECCIONARCAJA}
                  element={<SeleccionarCajas />}
                ></Route>

                {/*Mi perfil */}
                <Route
                  path={MIPERFILPRIVATE}
                  element={<MiPerfilPrivate />}
                ></Route>
              </Route>

              {/* LOGOUT */}
              <Route path={LOGOUT} element={<Logout />}></Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
