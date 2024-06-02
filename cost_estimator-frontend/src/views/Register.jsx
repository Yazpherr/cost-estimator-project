import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Skeleton,
  Space,
} from "antd";

const { Option } = Select;

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios/axiosInstance";
import { NavBarSoloLogo } from "../components/navegation/NavBarSoloLogo";
import { AlertError } from "../components/ui/AlertError";
import { Footer } from "../components/ui/Footer";
import { clearUrl } from "../helpers/clearUrl";
import countrystatecity from "../helpers/countrystatecity";
import {
  LOGIN,
  REQUERSTRESETPASSWORD,
  TERMINOSCONDICIONES,
} from "../routes/Paths";
//import { DeleteIcon } from "../components/ui/icons/DeleteIcon";

export const Register = () => {
  const navigate = useNavigate();
  //Password view button
  const [passwordVisible, setPasswordVisible] = useState(false);
  //Button Loading
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  //modal
  const [openModal, setOpenModal] = useState("");
  //Alerts
  const [visibleAlertError, setVisibleAlertError] = useState(false);
  const [tituloAlerta, setTituloAlerta] = useState("");
  const [descripcionAlerta, setDescripcionAlerta] = useState("");
  //País, region, comuna
  let [paisData, setPaisData] = useState([]);
  const [isLoadingPaisData, setIsLoadingPaisData] = useState(false);
  const [hiddenRegionComuna, setHiddenRegionComuna] = useState(false);
  //region
  let [regionData, setRegionData] = useState([]);
  const [isLoadingRegionData, setIsLoadingRegionData] = useState(false);
  const [isDisabledRegionInput, setIsDisabledRegionInput] = useState(true);
  //Comuna
  let [comunaData, setComunaData] = useState([]);
  const [isLoadingComunaData, setIsLoadingComunaData] = useState(false);
  const [isDisabledComunaInput, setIsDisabledComunaInput] = useState(true);
  //varibles por url
  const [sendToWordPress, setSendToWordPress] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
    getPaises();
    AOS.init();

    setSendToWordPress(false);

    // Función para obtener el valor del parámetro
    const getParamI = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const paramIValue = searchParams.get("c");

      if (paramIValue === "1") {
        clearUrl("c");
        setSendToWordPress(true);
      }
    };
    getParamI();
  }, []);

  const getPaises = () => {
    setIsLoadingPaisData(true);

    const paises = Object.keys(countrystatecity);

    setPaisData(paises);

    setIsLoadingPaisData(false);
    setIsDisabledComunaInput(true);
  };

  const getRegiones = async (value) => {
    setIsLoadingRegionData(true);

    const regiones = countrystatecity[value];

    if (value !== "CL|Chile") {
      setHiddenRegionComuna(true);
    } else {
      setHiddenRegionComuna(false);
    }

    setRegionData(regiones);

    form.setFieldsValue({
      region: null,
      comuna: null,
    });

    setIsDisabledComunaInput(true);

    setIsLoadingRegionData(false);
    setIsDisabledRegionInput(false);
  };

  const getComuna = async (value) => {
    setIsLoadingComunaData(true);

    const formValues = form.getFieldsValue();

    const country = formValues.pais;
    const regionCode = value.split("|")[0];

    const regionData = countrystatecity[country];

    // Encuentra la región seleccionada
    const selectedRegion = regionData.find(
      (region) => region.iso2 === regionCode
    );

    form.setFieldsValue({
      comuna: null,
    });

    setComunaData(selectedRegion.comunas);

    setIsLoadingComunaData(false);
    setIsDisabledComunaInput(false);
  };

  const register = async () => {
    setVisibleAlertError(false);
    setIsLoadingButton(true);

    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("dni", formValues.dni);
    formData.append("name", formValues.name);
    formData.append("lastname", formValues.lastname);
    formData.append("phone", formValues.telefono);
    formData.append("country", formValues.pais);
    formData.append(
      "region",
      formValues.region === undefined ? "" : formValues.region
    );
    formData.append(
      "comuna",
      formValues.comuna === undefined ? "" : formValues.comuna
    );
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    formData.append("password_confirmation", formValues.password);
    /*     formData.append("codigo_registro", formValues.codigo_registro); */

    console.log(formValues.telefono);

    await axiosInstance
      .post("/api/register", formData)
      .then((response) => {
        if (sendToWordPress) {
          setOpenModal(true);
          return;
        }
        navigate(LOGIN + "?i=1");
      })
      .catch((error) => {
        console.log(error);
        /*  if (
          error.response.data.message === "El código de registro ha expirado"
        ) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("El código de registro ha expirado");
        } else if (error.response.data.message === "Código no encontrado.") {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("Código no encontrado.");
        } else if (
          error.response.data.message ===
          "El código de registro ya ha sido usado"
        ) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("El código de registro ya ha sido usado");
        } else if (
          error.response.data.message ===
          "El código de registro esta desactivado"
        ) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("El código de registro esta desactivado");
        } else */

        if (error.response.data.errors.dni) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("El RUT o DNI ya existe");
        } else if (error.response.data.errors.email) {
          var mensajeErrorEmail = error.response.data.errors.email[0];

          if (mensajeErrorEmail === "The email has already been taken.") {
            setVisibleAlertError(true);
            setTituloAlerta("Error");
            setDescripcionAlerta(
              "El correo electrónico ya existe, intenta con otro"
            );
          }
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  return (
    <>
      <NavBarSoloLogo Url={LOGIN} />

      <section
        data-aos="fade-in"
        className="flex flex-col justify-between min-h-screen"
      >
        <div>
          <div className="px-6 my-[120px]">
            <div className="mb-12">
              <p className="text-blue-800 font-semibold text-center  uppercase mb-4">
                Registro
              </p>
              <h2 className="sora-font max-w-[800px] mx-auto text-negro text-3xl md:text-5xl font-bold text-center">
                Ingresa tus datos para registrarte
              </h2>
              <p className="text-plomo text-base md:text-lg mt-5 max-w-[500px] mx-auto text-center">

              </p>
            </div>
            <Form
              form={form}
              className="mx-auto max-w-[500px]"
              layout="vertical"
              onFinish={register}
              scrollToFirstError={{
                behavior: "smooth",
                block: "center",
                inline: "center",
              }}
            >

              {/* Dni */}
              <Form.Item
                hasFeedback
                name="dni"
                extra="Formato: 12345678-0"
                label="RUT o DNI"
                rules={[
                  { required: true, message: "Ingresa tu RUT o DNI" },
                  { min: 8, message: "Mínimo 8 caracteres" },
                  { max: 10, message: "Máximo 10 caracteres" },
                  {
                    validator(rule, value) {
                      if (value) {
                        // Eliminar cualquier punto presente en el valor
                        let inputValue = value.replace(/\./g, "");
                        // Eliminar cualquier guion presente en el valor
                        inputValue = inputValue.replace(/-/g, "");

                        // Verificar si el valor es válido
                        if (
                          /^\d{1,2}-?\d{3,8}-?[0-9a-zA-Z]$/.test(inputValue)
                        ) {
                          // Verificar si hay al menos nueve caracteres
                          if (inputValue.replace("-", "").length >= 8) {
                            // Obtener los primeros dígitos (excepto el último)
                            const firstDigits = inputValue.slice(0, -1);
                            // Obtener el último dígito
                            const lastDigit = inputValue.slice(-1);
                            // Formatear el número con un guion entre los primeros dígitos y el último dígito
                            const formattedValue = `${firstDigits}-${lastDigit}`;
                            // Actualizar el valor del input con el valor formateado
                            form.setFieldsValue({
                              dni: formattedValue,
                            });
                          } else {
                            // Si el valor tiene menos de nueve caracteres, rechazar la validación
                            return Promise.reject(
                              "El RUT o DNI debe tener al menos 8 caracteres"
                            );
                          }
                        } else {
                          // Si el valor no cumple con el formato, rechazar la validación
                          return Promise.reject(
                            "El formato del RUT o DNI no es válido"
                          );
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  type="text"
                  maxLength={10}
                  placeholder="Ingresa tu RUT o DNI"
                />
              </Form.Item>

              {/* Name y Lastname */}
              <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
                {/* Name */}
                <Form.Item
                  hasFeedback
                  name="name"
                  label="Nombre"
                  rules={[
                    { required: true, message: "Ingresa tu nombre" },
                    { min: 2, message: "Mínimo 2 caracteres" },
                    { max: 20, message: "Máximo 20 caracteres" },
                    {
                      validator: (_, value) =>
                        value && !/^\s+$/.test(value)
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error(
                                "El nombre no puede contener solo espacios en blanco"
                              )
                            ),
                    },
                  ]}
                >
                  <Input placeholder="Ingresa tu nombre" />
                </Form.Item>
                {/* Lastname */}
                <Form.Item
                  hasFeedback
                  name="lastname"
                  label="Apellido"
                  rules={[
                    { required: true, message: "Ingresa tu apellido" },
                    { min: 2, message: "Mínimo 2 caracteres" },
                    { max: 20, message: "Máximo 20 caracteres" },
                    {
                      validator: (_, value) =>
                        value && !/^\s+$/.test(value)
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error(
                                "El apellido no puede contener solo espacios en blanco"
                              )
                            ),
                    },
                  ]}
                >
                  <Input placeholder="Ingresa tu apellido" />
                </Form.Item>
              </div>
              {/* Email */}
              <Form.Item
                hasFeedback
                name="email"
                label="Correo electrónico"
                rules={[
                  { required: true, message: "Ingresa tu correo electrónico" },
                  { max: 70, message: "Máximo 70 caracteres" },
                  {
                    pattern: /^\S+@\S+\.\S+$/,
                    message: "Correo electrónico inválido",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                />
              </Form.Item>

              {/* Télefono */}
              <Form.Item
                hasFeedback
                name="telefono"
                label="Teléfono"
                rules={[
                  { required: true, message: "Ingresa teléfono" },
                  {
                    max: 9,
                    message: "Máximo 9 números",
                  },
                  {
                    pattern: new RegExp(/^[0-9]+$/),
                    message: "Solo ingresa números por favor",
                  },
                ]}
              >
                <Input
                  className="w-full"
                  addonBefore="+56"
                  maxLength={9}
                  type="tel"
                  placeholder="Ingresa teléfono"
                />
              </Form.Item>

              {/* País */}
              <Form.Item
                hasFeedback
                name="pais"
                label="País"
                rules={[
                  {
                    required: true,
                    message: "Selecciona tu país",
                  },
                ]}
              >
                {isLoadingPaisData ? (
                  <div>
                    <Skeleton.Input
                      className="skeleton-input-vx"
                      active
                      style={{ width: "100%", height: 48, borderRadius: 12 }}
                    />
                  </div>
                ) : (
                  <Select
                    showSearch
                    optionFilterProp="children"
                    onChange={(value) => getRegiones(value)}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    placeholder="Selecciona tu país"
                    options={paisData.map((country) => ({
                      value:
                        country.split("|")[0] + "|" + country.split("|")[1],
                      label: country.split("|")[1],
                    }))}
                  ></Select>
                )}
              </Form.Item>

              {!hiddenRegionComuna && (
                <>
                  {/* Region */}
                  <Form.Item
                    hasFeedback
                    name="region"
                    label="Región"
                    rules={[
                      {
                        required: true,
                        message: "Selecciona tu región",
                      },
                    ]}
                  >
                    {isLoadingRegionData ? (
                      <div>
                        <Skeleton.Input
                          className="skeleton-input-vx"
                          active
                          style={{
                            width: "100%",
                            height: 48,
                            borderRadius: 12,
                          }}
                        />
                      </div>
                    ) : (
                      <Select
                        disabled={isDisabledRegionInput ? true : false}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        name="role"
                        placeholder="Selecciona tu región"
                        onChange={(value) => getComuna(value)}
                        options={regionData.map((region) => ({
                          value: region.iso2 + "|" + region.name,
                          label: region.name,
                        }))}
                      ></Select>
                    )}
                  </Form.Item>

                  {/* Comuna */}
                  <Form.Item
                    hasFeedback
                    name="comuna"
                    label="Comuna"
                    rules={[
                      {
                        required: true,
                        message: "Selecciona tu comuna",
                      },
                    ]}
                  >
                    {isLoadingComunaData ? (
                      <div>
                        <Skeleton.Input
                          className="skeleton-input-vx"
                          active
                          style={{
                            width: "100%",
                            height: 48,
                            borderRadius: 12,
                          }}
                        />
                      </div>
                    ) : (
                      <Select
                        disabled={isDisabledComunaInput ? true : false}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        name="role"
                        placeholder="Selecciona tu comuna"
                        options={comunaData.map((comuna) => ({
                          value: comuna.id + "|" + comuna.name,
                          label: comuna.name,
                        }))}
                      ></Select>
                    )}
                  </Form.Item>
                </>
              )}

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
                {/* Password */}
                <Form.Item
                  name="password"
                  label="Contraseña"
                  hasFeedback
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

                {/* Password confirm */}
                <Form.Item
                  name="password_confirmation"
                  dependencies={["password"]}
                  label="Confirmar contraseña"
                  hasFeedback
                  rules={[
                    { required: true, message: "Confirma tu contraseña" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Las contraseñas no coinciden")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                    placeholder="Confirma tu contraseña"
                  />
                </Form.Item>
              </div>

              {/*terminos y condiciones*/}
              <Form.Item
                name="terminos_condiciones"
                hasFeedback
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                    message: "Debes aceptar los términos y condiciones",
                  },
                ]}
              >
                <Checkbox className="font-normal">
                  Aceptar{" "}
                  <Link
                    to={TERMINOSCONDICIONES}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#5E6D55", textDecoration: "underline" }}
                  >
                    términos y condiciones
                  </Link>
                </Checkbox>
              </Form.Item>

              {/* Alert*/}
              <div className="mb-4">
                {visibleAlertError && (
                  <AlertError
                    titulo={tituloAlerta}
                    descripcion={descripcionAlerta}
                  />
                )}
              </div>

              {/* Button */}
              <Form.Item className="mt-6">
                <Button
                  loading={isLoadingButton}
                  //className="w-full h-[49px] bg-primary text-white border-none"
                  className="w-full h-[49px] bg-gradient-to-r from-blue-500 to-blue-800 text-white px-6 py-3 rounded-md hover:opacity-90 transition duration-300 "
                  htmlType="submit"
                >
                  Registrarme
                </Button>
              </Form.Item>
            </Form>
            <div className="mx-auto max-w-[500px] rounded-xl">
              <div>
                <Link to={LOGIN} className="text-negro text-sm inline-block">
                  ¿Ya tienes cuenta?{" "}
                  <span className="text-blue-800">Inicia sesión aquí</span>
                </Link>
              </div>
              <div>
                <Link
                  to={REQUERSTRESETPASSWORD}
                  className="text-negro text-sm inline-block"
                >
                  ¿Olvidaste tu contraseña?{" "}
                  <span className="text-blue-800">Recuperala aquí</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Modal Cuenta creda mandar al usuario a wordpress */}
          <Modal
            centered
            open={openModal}
            onCancel={() => navigate(LOGIN + "?i=1")}
            footer={
              <Space
                className="flex 
              flex-col-reverse
              sm:flex-row 
              sm:justify-end mt-6"
              >
                <Button
                  className="h-fit border-none bg-primary text-white"
                  onClick={() => {
                    window.location.href =
                      "https://v3.grupovortex.cl/producto/vortex-premium/";
                  }}
                >
                  Ir a comprar
                </Button>
              </Space>
            }
          >
            <div className="sm:flex sm:items-start">
              <div
                className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center 
                rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 text-yellow-500"
                  ariaHidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"></path>
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  id="texto_alerta"
                  className="text-lg font-semibold leading-6 text-negro"
                >
                  ¡Registro exitoso!
                </h3>
                <div className="mt-2">
                  <p className="text-sm md:text-base text-plomo">
                    Has sido agregado correctamente. Ahora puedes ir a comprar
                    Vortex Premium
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        {/* Footer */}
        {/* <Footer /> */}
      </section>
    </>
  );
};
