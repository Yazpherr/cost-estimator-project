import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Skeleton,
  Space,
  message,
} from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { axiosInstance } from "../../../axios/axiosInstance";
import { useAuthContext } from "../../../context/AuthContext";
import { AlertError } from "../AlertError";
import countrystatecity from "../../../helpers/countrystatecity";

export const ModalCUUsuarios = forwardRef((props, ref) => {
  const { isMyProfile } = props;

  const { getUser, storeLogged, userLogged } = useAuthContext();

  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  //Loadings
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  //País, region, comuna
  let [paisData, setPaisData] = useState([]);
  const [isLoadingPaisData, setIsLoadingPaisData] = useState(false);
  //region
  let [regionData, setRegionData] = useState([]);
  const [isLoadingRegionData, setIsLoadingRegionData] = useState(false);
  const [isDisabledRegionInput, setIsDisabledRegionInput] = useState(true);
  //Comuna
  let [comunaData, setComunaData] = useState([]);
  const [isLoadingComunaData, setIsLoadingComunaData] = useState(false);
  const [isDisabledComunaInput, setIsDisabledComunaInput] = useState(true);
  //Alerts
  const [visibleAlertError, setVisibleAlertError] = useState(false);
  const [tituloAlerta, setTituloAlerta] = useState("");
  const [descripcionAlerta, setDescripcionAlerta] = useState("");
  //pais , region, comuna
  const [paisSelected, setPaisSelected] = useState("");
  const [hiddenRegionComuna, setHiddenRegionComuna] = useState(false);

  const [form] = Form.useForm();

  const childFunction = (id, action, dataUser) => {
    setOpen(true);
    setIsDisabledRegionInput(true);
    setIsDisabledComunaInput(true);

    setVisibleAlertError(false);

    if (action === "Edit") {
      setId(id);
      setIsEdit(true);

      if (!isMyProfile) {
        if (dataUser[5] !== "CL|Chile") {
          setHiddenRegionComuna(true);
        } else {
          setHiddenRegionComuna(false);
        }

        form.resetFields();
        form.setFieldsValue({
          dni: dataUser[0],
          name: dataUser[1],
          lastname: dataUser[2],
          role: dataUser[3],
          email: dataUser[4],
          pais: dataUser[5],
          region: dataUser[6],
          comuna: dataUser[7],
          phone: dataUser[8],
        });
      } else {
        if (dataUser.country !== "CL|Chile") {
          setHiddenRegionComuna(true);
        } else {
          setHiddenRegionComuna(false);
        }

        form.resetFields();
        form.setFieldsValue({
          dni: dataUser.dni,
          name: dataUser.name,
          lastname: dataUser.lastname,
          role: dataUser.role,
          email: dataUser.email,
          pais: dataUser.country,
          region: dataUser.region,
          comuna: dataUser.comuna,
          phone: dataUser.phone,
        });
      }
    } else {
      form.resetFields();
      setIsEdit(false);
    }
  };

  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const createUser = async () => {
    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("dni", formValues.dni);
    formData.append("name", formValues.name);
    formData.append("lastname", formValues.lastname);
    formData.append("email", formValues.email);
    formData.append("country", formValues.pais);
    formData.append(
      "region",
      formValues.region === undefined ? "" : formValues.region
    );
    formData.append(
      "comuna",
      formValues.comuna === undefined ? "" : formValues.comuna
    );
    formData.append("phone", formValues.phone);
    formData.append("role", formValues.role);
    formData.append("fk_shop_id", storeLogged.id);
    formData.append("id_user", userLogged.id);

    setIsLoadingButton(true);

    await axiosInstance
      .post("/api/createUsersShop", formData)
      .then((response) => {
        message.success("Usuario creado con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadTable();
      })
      .catch((error) => {
        if (
          error.response.data.message ===
          "El DNI ya está registrado para otro usuario en esta tienda"
        ) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("El RUT o DNI ya existe");
        } else if (error.response.data.errors.email) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta(
            "El correo electrónico ya existe, intenta con otro"
          );
        } else {
          message.error("El usuario no se ha podido editar");
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  const updateUser = async () => {
    setVisibleAlertError(false);

    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("dni", formValues.dni);
    formData.append("name", formValues.name);
    formData.append("lastname", formValues.lastname);
    formData.append("email", formValues.email);
    formData.append("country", formValues.pais);
    formData.append(
      "region",
      formValues.region === undefined ? "" : formValues.region
    );
    formData.append(
      "comuna",
      formValues.comuna === undefined ? "" : formValues.comuna
    );
    formData.append("phone", formValues.phone);
    formData.append("role", formValues.role);
    formData.append("fk_shop_id", storeLogged.id);
    formData.append("id_user", userLogged.id);

    setIsLoadingButton(true);

    await axiosInstance
      .put("/api/updateUsersShop/" + id, formData)
      .then((response) => {
        message.success("Usuario editado con éxito");
        form.resetFields();
        setOpen(false);
        getUser();

        if (isMyProfile) {
          props.reloadUser();
        } else {
          props.reloadTable();
        }
      })
      .catch((error) => {
        console.log(error);

        if (
          error.response.data.message ===
          "El DNI ya está registrado para otro usuario en esta tienda"
        ) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("El RUT o DNI ya existe");
        } else if (error.response.data.errors.email) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta(
            "El correo electrónico ya existe, intenta con otro"
          );
        } else {
          message.error("El usuario no se ha podido editar");
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  useEffect(() => {
    getPaises();
  }, []);

  const getPaises = async () => {
    setIsLoadingPaisData(true);

    const paises = Object.keys(countrystatecity);

    setPaisData(paises);

    setIsLoadingPaisData(false);
    setIsDisabledComunaInput(true);
  };

  const getRegiones = async (value) => {
    setPaisSelected(value);
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

  function skeletonsLoading() {
    return (
      <div className="grid grid-cols-1 gap-y-8 pt-4">
        <Skeleton.Input
          active
          style={{ width: "100%", height: 48, borderRadius: 12 }}
        />
        <Skeleton.Input
          active
          style={{ width: "100%", height: 48, borderRadius: 12 }}
        />
        <Skeleton.Input
          active
          style={{ width: "100%", height: 48, borderRadius: 12 }}
        />

        <div className="flex justify-end">
          <Space>
            <Skeleton.Button
              active
              style={{ width: 90, height: 44, borderRadius: 12 }}
            />
            <Skeleton.Button
              active
              style={{ width: 137, height: 44, borderRadius: 12 }}
            />
          </Space>
        </div>
      </div>
    );
  }

  return (
    <Modal
      title={isEdit ? "Editar Usuario" : "Agregar Usuario"}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      {isLoadingData ? (
        skeletonsLoading()
      ) : (
        <Form
          form={form}
          className="pt-4"
          layout="vertical"
          onFinish={isEdit ? updateUser : createUser}
        >
          {/* Dni */}
          <Form.Item
            hasFeedback
            name="dni"
            label="RUT o DNI"
            extra="Formato: 12345678-0"
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
                    if (/^\d{1,2}-?\d{3,8}-?[0-9a-zA-Z]$/.test(inputValue)) {
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
            <Input maxLength={10} placeholder="Ingresa tu RUT o DNI" />
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
                { whitespace: true, message: "Espacios no permitidos" },
              ]}
            >
              <Input placeholder="Ingresa tu apellido" />
            </Form.Item>
          </div>

          {/* Rol */}
          <Form.Item
            hasFeedback
            name="role"
            label="Rol"
            rules={[
              {
                required: true,
                message: "Ingresa el rol del usuario",
              },
            ]}
          >
            <Select
              hasFeedback
              name="role"
              placeholder="Selecciona rol"
              options={[
                {
                  value: "vendedor",
                  label: "Vendedor",
                },
                {
                  value: "admin",
                  label: "Administrador",
                },
              ]}
            ></Select>
          </Form.Item>

          {/* Email */}
          <Form.Item
            hasFeedback
            name="email"
            label="Correo electrónico"
            rules={[
              { required: true, message: "Ingresa tu correo electrónico" },
              {
                pattern: /^\S+@\S+\.\S+$/,
                message: "Correo electrónico invalido",
              },
            ]}
          >
            <Input type="email" placeholder="Ingresa tu correo electrónico" />
          </Form.Item>

          {/* Télefono */}
          <Form.Item
            hasFeedback
            name="phone"
            label="Teléfono"
            rules={[
              {
                required: true,
              },
              {
                min: 9,
                message: "Mínimo 9 números",
              },
              {
                pattern: new RegExp(/^[0-9]+$/),
                message: "Solo ingresa números por favor",
              },
            ]}
          >
            <Input
              className="w-full"
              maxLength={9}
              addonBefore="+56"
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
                name="role"
                placeholder="Selecciona tu país"
                options={paisData.map((country) => ({
                  value: country.split("|")[0] + "|" + country.split("|")[1],
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
                      style={{ width: "100%", height: 48, borderRadius: 12 }}
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
                      style={{ width: "100%", height: 48, borderRadius: 12 }}
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

          {/* Password */}
          {!isEdit && (
            <Form.Item label="Contraseña">
              <p>
                La contraseña se generará automáticamente después de guardar al
                usuario y se enviara a su correo electrónico.
              </p>
            </Form.Item>
          )}

          {/* Alert*/}
          {visibleAlertError && (
            <div className="mb-4">
              <AlertError
                titulo={tituloAlerta}
                descripcion={descripcionAlerta}
              />
            </div>
          )}

          {/* Button */}
          <Form.Item className="m-0 mt-12 p-0 flex justify-end">
            <Space>
              <Button
                className="cancel-button-modal h-fit border-none text-red-500 hover:bg-red-100 transition-all"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                className="h-fit border-none bg-primary text-white"
                loading={isLoadingButton}
                htmlType="submit"
              >
                {isEdit ? "Editar Usuario" : "Agregar Usuario"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
});
