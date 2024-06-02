import { Alert, Button, Form, Input } from "antd";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../axios/axiosInstance";
import { LOGIN } from "../routes/Paths";
import { NavBarSoloLogo } from "../components/navegation/NavBarSoloLogo";
import { AlertError } from "../components/ui/AlertError";

export const ResetPassword = () => {
  const navigate = useNavigate();
  //Password view button
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibleConfirmed, setPasswordVisibleConfirmed] =
    useState(false);
  //Button Loading
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  //Token
  const { token } = useParams();
  //Alerts
  const [visibleAlertError, setVisibleAlertError] = useState(false);
  const [visibleAlertGood, setVisibleAlertGood] = useState(false);
  const [tituloAlerta, setTituloAlerta] = useState("");
  const [descripcionAlerta, setDescripcionAlerta] = useState("");

  const [form] = Form.useForm();

  const resetPassword = async () => {
    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("token", token);
    formData.append("password", formValues.password);
    formData.append("password_confirmation", formValues.passwordConfirmed);

    setIsLoadingButton(true);
    setVisibleAlertError(false);

    await axiosInstance
      .post("/api/resetPassword", formData)
      .then((response) => {
        navigate(LOGIN + '?i=2');
      })
      .catch((error) => {
        console.log(error)
        setVisibleAlertError(true);
        setTituloAlerta('Error');
        setDescripcionAlerta('El enlace no es válido o expiró, debes solicitar un nuevo enlace.');
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  return (

    <>
      <NavBarSoloLogo Url={LOGIN} />

      <section className="px-6 my-[120px]">
        {/* Titulo de pagina */}
        <div className="mb-12">
          <p className="text-primary font-semibold text-center  uppercase mb-4">Cambio de contraseña</p>
          <h2 className="sora-font max-w-[800px] mx-auto text-negro text-balance text-3xl md:text-5xl font-bold text-center">
            Crea tu nueva contraseña
          </h2>
          <p className="text-plomo text-base text-balance md:text-lg mt-5 max-w-[800px] mx-auto text-center">Ingresa tu nueva contraseña y vuelve a tener acceso a tus herramientas</p>
        </div>

        <Form
          form={form}
          className="mx-auto max-w-[500px]"
          layout="vertical"
          onFinish={resetPassword}
        >
          {/*ALERTS*/}
          <div className="mb-4">
            {visibleAlertError && <AlertError titulo={tituloAlerta} descripcion={descripcionAlerta} />}
          </div>

          {/* Password */}
          <Form.Item
            hasFeedback
            name="password"
            label="Contraseña"
            rules={[
              { required: true, message: "Ingresa tu contraseña" },
              { min: 8, message: "Mínimo 8 caracteres" },
            ]}
          >
            <Input.Password
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              placeholder="Ingresa tu contraseña"
            />
          </Form.Item>

          {/* Confirmed Password */}
          <Form.Item
            name="passwordConfirmed"
            label="Confirmar contraseña"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor confirma tu contraseña",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Las contrasñeas no coinciden"));
                },
              }),
            ]}
          >
            <Input.Password
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisibleConfirmed,
              }}
              placeholder="Confirma tu contraseña"
            />
          </Form.Item>

          {/* Button */}
          <Form.Item className="mt-6">
            <Button
              className="w-full h-[49px] bg-primary text-white border-none"
              loading={isLoadingButton}
              htmlType="submit"
            >
              Cambiar contraseña
            </Button>
          </Form.Item>
        </Form>

        {/* Links */}
        <div className="mx-auto max-w-[500px] rounded-xl">
          <div>
            <Link to={LOGIN} className="text-negro text-sm inline-block">¿Perdido? <span className="text-primary">Volver al inicio de sesión</span></Link>
          </div>
        </div>
      </section>
    </>
  );
};
