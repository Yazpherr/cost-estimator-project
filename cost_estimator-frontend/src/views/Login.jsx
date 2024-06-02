import { Button, Form, Input } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBarSoloLogo } from "../components/navegation/NavBarSoloLogo";
import { AlertError } from "../components/ui/AlertError";
import { AlertGood } from "../components/ui/AlertGood";
import { Footer } from "../components/ui/Footer";
import { useAuthContext } from "../context/AuthContext";
import { clearUrl } from "../helpers/clearUrl";
import {
  HOME,
  PRIVATEUSERS,
  REGISTER,
  REQUERSTRESETPASSWORD,
} from "../routes/Paths";

export const Login = () => {
  //navigate
  const navigate = useNavigate();
  //Context
  const { login, isAuthenticated, userLogged } = useAuthContext();
  //View password button
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form] = Form.useForm();
  //Button Loading
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  //Recien registrado el usuario
  const [visibleAlertGood, setVisibleAlertGood] = useState(false);
  //Alerts
  const [visibleAlertError, setVisibleAlertError] = useState(false);
  const [tituloAlerta, setTituloAlerta] = useState("");
  const [descripcionAlerta, setDescripcionAlerta] = useState("");

  //Login
  const handleButtonLogin = async () => {
    setVisibleAlertError(false);
    setVisibleAlertGood(false);

    const formValues = form.getFieldsValue();

    const formData = new FormData();

    formData.append("email", formValues.email);
    formData.append("password", formValues.password);

    setIsLoadingButton(true);

    const [isLogged, rolUser] = await login(formData);
    setIsLoadingButton(false);

    if (!isLogged) {
      setVisibleAlertError(true);
      setTituloAlerta("Error");
      setDescripcionAlerta("Correo electrónico o contraseña incorrectos");
      return;
    } else if (isLogged === "desactive") {
      setVisibleAlertError(true);
      setTituloAlerta("Error");
      setDescripcionAlerta(
        "Usuario deshabilitado, no tienes acceso al sistema"
      );
      return;
    }

    //rol
    //rol - admin
    navigate(PRIVATEUSERS);
  };

  //Si ingresa al login desde la url pero esta autenticado que lo redirija al private
  useEffect(() => {
    if (isAuthenticated) {
      if (userLogged != null) {
        if (userLogged.id_user === 2) {
          return;
        } else if (userLogged.id_user === 3) {
          navigate(PRIVATEUSERS);
          return;
        }
      }
    }
  }, [isAuthenticated, userLogged]);

  useEffect(() => {
    // Función para obtener el valor del parámetro 'i' de la URL para decirle que se registro correctamente
    const getParamI = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const paramIValue = searchParams.get("i");

      if (paramIValue === "1") {
        clearUrl("i");
        setVisibleAlertGood(true);
        setTituloAlerta("¡Registro exitoso!");
        setDescripcionAlerta("Has sido agregado correctamente.");
      }
      if (paramIValue === "2") {
        clearUrl("i");
        setVisibleAlertGood(true);
        setTituloAlerta("Cambio de contraseña exitoso!");
        setDescripcionAlerta("Has cambiado tu contraseña correctamente.");
      }
    };
    window.scrollTo(0, 0);
    // Llama a la función para obtener el valor del parámetro 'i' al cargar la página
    getParamI();
    AOS.init();
  }, []);

  return (
    <>
      <NavBarSoloLogo Url={HOME} />

      <section
        data-aos="fade-in"
        className="flex flex-col justify-between min-h-screen"
      >
        <div>
          <div className="px-6 my-[120px]">
            {/* Titulo de pagina */}
            <div className="mb-12">
              <p className="text-blue-800 font-semibold text-center uppercase mb-4">
                Inicio de sesión
              </p>
              <h2 className="sora-font max-w-[800px] mx-auto text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
                Bienvenido a Speed Project
              </h2>
              <p className="text-plomo text-base md:text-lg mt-5 max-w-[800px] mx-auto text-center">
                Ingresa tus datos para acceder
              </p>
            </div>
            {/* Form */}
            <Form
              form={form}
              className="mx-auto max-w-[500px]"
              layout="vertical"
              onFinish={handleButtonLogin}
            >
              <div className="mb-4">
                {visibleAlertError && (
                  <AlertError
                    titulo={tituloAlerta}
                    descripcion={descripcionAlerta}
                  />
                )}
                {visibleAlertGood && (
                  <AlertGood
                    titulo={tituloAlerta}
                    descripcion={descripcionAlerta}
                  />
                )}
              </div>

              {/* Email */}
              <Form.Item
                name="email"
                hasFeedback
                label="Correo electrónico"
                rules={[
                  { required: true, message: "Ingresa tu correo electrónico" },
                  {
                    pattern: /^\S+@\S+\.\S+$/,
                    message: "Correo electrónico inválido",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Ingresar correo electrónico"
                />
              </Form.Item>

              {/* Password */}
              <Form.Item
                hasFeedback
                name="password"
                label="Contraseña"
                rules={[{ required: true, message: "Ingresa tu contraseña" }]}
              >
                <Input.Password
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                  placeholder="Ingresar contraseña"
                />
              </Form.Item>

              {/* Button */}
              <Form.Item className="mt-6">
                <Button
                  className="w-full h-[49px] bg-gradient-to-r from-blue-500 to-blue-800 text-white px-6 py-3 rounded-md hover:opacity-90 transition duration-300 "
                  // className=" bg-primary text-white border-none"
                  loading={isLoadingButton}
                  htmlType="submit"
                >
                  Iniciar sesión
                </Button>
              </Form.Item>
            </Form>
            {/* Links */}
            <div className="mx-auto max-w-[500px] rounded-xl">
              <div>
                <Link to={REGISTER} className="text-negro text-sm inline-block">
                  ¿Aún no tienes cuenta?{" "}
                  <span className="text-blue-800">Registrate aquí</span>
                </Link>
              </div>
              <div>
                <Link
                  to={REQUERSTRESETPASSWORD}
                  className="text-negro text-sm inline-block"
                >
                  {" "}
                  <span className="text-blue-800">¿Olvidaste tu contraseña?</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </section>
    </>
  );
};
