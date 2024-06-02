import { Alert, Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../axios/axiosInstance";
import { NavBarSoloLogo } from "../components/navegation/NavBarSoloLogo";
import { LOGIN } from "../routes/Paths";
import { AlertError } from "../components/ui/AlertError";
import { AlertGood } from "../components/ui/AlertGood";
import AOS from "aos";
import "aos/dist/aos.css";

export const RequestResetPassword = () => {
  const [form] = Form.useForm();
  //Button Loading
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  //Alerts
  const [visibleAlertError, setVisibleAlertError] = useState(false);
  const [visibleAlertGood, setVisibleAlertGood] = useState(false);
  const [tituloAlerta, setTituloAlerta] = useState("");
  const [descripcionAlerta, setDescripcionAlerta] = useState("");

  const requestResetPassword = async () => {
    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("email", formValues.email);

    setIsLoadingButton(true);

    setVisibleAlertGood(false);
    setVisibleAlertError(false);

    await axiosInstance
      .post("/api/sendResetLink", formData)
      .then((response) => {
        setVisibleAlertGood(true);
        setTituloAlerta("Correo enviado");
        setDescripcionAlerta("Revisa tu bandeja de entrada");

        form.resetFields();
      })
      .catch((error) => {
        setVisibleAlertError(true);
        setTituloAlerta("Error");
        setDescripcionAlerta("El correo electrónico no se encuentra en nuestros registros");
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <NavBarSoloLogo Url={LOGIN} />

      <section data-aos="fade-in" className="px-6 my-[120px]">
        {/* Titulo de pagina */}
        <div className="mb-12">
          <p className="text-primary font-semibold text-center  uppercase mb-4">
            Recuperar contraseña
          </p>
          <h2 className="sora-font max-w-[800px] mx-auto text-negro text-3xl md:text-5xl font-bold text-center">
            ¿Olvidate tu contraseña? Recuperala Aquí
          </h2>
          <p className="text-plomo text-base text-balance md:text-lg mt-5 max-w-[800px] mx-auto text-center">
            Ingresa tu correo electrónico, si es válido te llegara un enlace en
            la bandeja de entrada, tienes 1 hora para utilizarlo.
          </p>
        </div>

        <Form
          form={form}
          className="mx-auto max-w-[500px]"
          layout="vertical"
          onFinish={requestResetPassword}
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
            label="Correo electrónico"
            rules={[
              { required: true, message: "Ingresa tu correo electrónico" },
              {
                pattern:
                  /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/,
                message: "Email invalido",
              },
            ]}
          >
            <Input type="email" placeholder="Ingresa tu correo electrónico" />
          </Form.Item>

          {/* Button */}
          <Form.Item className="mt-6">
            <Button
              className="w-full h-[49px] bg-primary text-white border-none"
              loading={isLoadingButton}
              htmlType="submit"
            >
              Solicitar enlace
            </Button>
          </Form.Item>
        </Form>

        {/* Links */}
        <div className="mx-auto max-w-[500px] rounded-xl">
          <div>
            <Link to={LOGIN} className="text-negro text-sm inline-block">
              ¿Perdido?{" "}
              <span className="text-blue-800">Volver al inicio de sesión</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
