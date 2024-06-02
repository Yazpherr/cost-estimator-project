import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Skeleton,
  Space,
  Upload,
  message,
} from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { axiosInstance } from "../../../axios/axiosInstance";
import { useAuthContext } from "../../../context/AuthContext";
import { UploadIcon } from "../icons/UploadIcon";
import { BASE_URL_FILES } from "../../../constants/BaseURL";
import { AlertError } from "../AlertError";

export const ModalCUTienda = forwardRef((props, ref) => {
  const { userLogged, getShop } = useAuthContext();

  const { dataTienda } = props;

  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  //activity_shop
  const [activityShop, setActivityShop] = useState("");
  //Loadings
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  //Actividad Input Otro
  const [idActividad, setIdActividad] = useState("");
  //Upload antd
  const [uploadedFile, setUploadedFile] = useState(null);
  //conLogo?
  const [conLogo, setConLogo] = useState(false);
  const [deleteLogoSend, setDeleteLogoSend] = useState(0);
  //var -advertencia mg excedidos
  const [isTamañoArchivoExcedido, setIsTamañoArchivoExcedido] = useState(false);
  //data tienda
  const [nameShop, setNameShop] = useState("");
  const [routeLogo, setRouteLogo] = useState("");


  const [form] = Form.useForm();
  const customizeRequiredMark = (label, { required }) => (
    <>
      {label}
      {!required && (
        <span className="ml-1 font-normal text-gray-400">(Opcional)</span>
      )}
    </>
  );

  const childFunction = async (id, action, data) => {
    setOpen(true);
    setConLogo(false);
    setDeleteLogoSend(0);
    setIsTamañoArchivoExcedido(false);
    setUploadedFile(null);
    if (action === "Edit") {
      setId(id);
      setIsEdit(true);
      form.resetFields();

      const valuesActivities = [
        "Venta de Ropa y Accesorios",
        "Venta de repuestos",
        "Minimarket",
        "Venta de insumos de aseo",
        "Venta de alimentos",
      ];

      const actividadValue = valuesActivities.includes(data.activity_shop)
        ? data.activity_shop
        : "Otro";

      form.setFieldsValue({
        dni: data.dni,
        name: data.name,
        email: data.email === null ? undefined : data.email,
        address: data.address === null ? undefined : data.address,
        phone: data.phone === null ? undefined : data.phone + "",
        actividad_select: actividadValue,
      });

      if(actividadValue === "Otro"){
        setIdActividad(6)

        form.setFieldsValue({
          activity_shop: data.activity_shop,
        });
      }
      setActivityShop(data.activity_shop);
      setConLogo(data.route_logo !== null ? true : false);

      setNameShop(data.name)
      setRouteLogo(data.route_logo)

    } else {
      form.resetFields();
      setIsEdit(false);
    }
  };

  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const createShop = async () => {
    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("dni", formValues.dni);
    formData.append("name", formValues.name);
    formData.append(
      "email",
      formValues.email === undefined ? "" : formValues.email
    );
    formData.append(
      "address",
      formValues.address === undefined ? "" : formValues.address
    );
    formData.append(
      "phone",
      formValues.phone === undefined ? "" : formValues.phone
    );
    formData.append("route_logo", uploadedFile);
    formData.append("activity_shop", activityShop);
    formData.append("fk_user_id", userLogged.id);

    setIsLoadingButton(true);

    await axiosInstance
      .post("/api/createShop", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        message.success("Tienda creada con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadData();
      })
      .catch((error) => {
        console.log(error);
        message.error("No se ha podido crear la tienda");
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  const updateShop = async () => {
    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("dni", formValues.dni);
    formData.append("name", formValues.name);
    formData.append(
      "email",
      formValues.email === undefined ? "" : formValues.email
    );
    formData.append(
      "address",
      formValues.address === undefined ? "" : formValues.address
    );
    formData.append(
      "phone",
      formValues.phone === undefined ? "" : formValues.phone
    );
    formData.append("route_logo", uploadedFile);
    formData.append("activity_shop", activityShop);
    formData.append("route_logo", uploadedFile);
    formData.append("delete_logo", deleteLogoSend);

    setIsLoadingButton(true);

    await axiosInstance
      .post(
        "/api/updateShop/" + id ,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        message.success("Tienda editada con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadTienda();
        getShop();
      })
      .catch((error) => {
        console.log(error.response);
        message.error("No se ha podido editar la tienda");
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  //Imagen Antd
  const fileProps = {
    name: "file",
    listType: "picture",
    multiple: false,
    beforeUpload: (file) => {
      const isLt5M = file.size / 1024 / 1024 <= 5;
      if (!isLt5M) {
        setIsTamañoArchivoExcedido(true);
        return false;
      }
      setIsTamañoArchivoExcedido(false);
      return false;
    },
    onChange(info) {
      if (info.file.status !== "done") {
        try {
          let reader = new FileReader();
          reader.readAsDataURL(info.file);
          setUploadedFile(info.file);
        } catch (error) {
          setUploadedFile(null);
        }
      }
    },
    onRemove: () => {
      setIsTamañoArchivoExcedido(false);
    },
    onPreview: () => false, // Devolver false para evitar la redirección
  };

  const deleteLogo = () => {
    setConLogo(false);
    setDeleteLogoSend(1);
  };

  return (
    <Modal
      title={isEdit ? "Editar Tienda" : "Agregar Tienda"}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form
        form={form}
        className="pt-4"
        layout="vertical"
        requiredMark={customizeRequiredMark}
        onFinish={isEdit ? updateShop : createShop}
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
          <Input
            type="text"
            maxLength={10}
            placeholder="Ingresa tu RUT o DNI"
          />
        </Form.Item>

        {/* Nombre de la tienda */}
        <Form.Item
          hasFeedback
          name="name"
          label="Nombre de la tienda"
          rules={[
            { required: true, message: "Ingresa nombre de la tienda" },
            { min: 2, message: "Mínimo 2 caracteres" },
            { max: 40, message: "Máximo 40 caracteres" },
          ]}
        >
          <Input type="text" placeholder="Ingresa nombre de la tienda" />
        </Form.Item>

        {/* Actividad */}
        <Form.Item
          hasFeedback
          name="actividad_select"
          label="Actividad ¿A qué se dedica?"
          rules={[
            {
              required: true,
              message: "Selecciona actividad",
            },
          ]}
        >
          <Select
            hasFeedback
            name="actividad"
            onChange={(value) => {
              setIdActividad(value);
              if (value !== 6) {
                setActivityShop(value);
              }
            }}
            placeholder="Selecciona actividad"
            options={[
              {
                value: "Venta de Ropa y Accesorios",
                label: "Venta de Ropa y Accesorios",
              },
              {
                value: "Venta de repuestos",
                label: "Venta de repuestos",
              },
              {
                value: "Minimarket",
                label: "Minimarket",
              },
              {
                value: "Venta de insumos de aseo",
                label: "Venta de insumos de aseo",
              },
              {
                value: "Venta de alimentos",
                label: "Venta de alimentos",
              },
              {
                value: "6",
                label: "Otro",
              },
            ]}
          ></Select>
        </Form.Item>

        {/* Actividad - Otro */}
        {idActividad == 6 && (
          <Form.Item
            hasFeedback
            name="activity_shop"
            label="Otra actividad"
            rules={[
              { required: true, message: "Ingresa actividad" },
              { min: 3, message: "Mínimo 3 caracteres" },
            ]}
          >
            <Input
              type="text"
              onChange={(e) => {
                setActivityShop(e.target.value);
              }}
              placeholder="Ingresa actividad"
            />
          </Form.Item>
        )}

        {/* Imagen */}
        <Form.Item hasFeedback name="ruta_logo" label="Logo">
          <Space
            direction="vertical"
            className="w-full"
            style={{
              width: "100%",
            }}
            size="large"
          >
            <Upload {...fileProps} maxCount={1} accept=".jpg,.png,.jpeg,.webp">
              <Button
                icon={<UploadIcon className="w-[24px] h-[24px]" />}
                className="flex h-fit border-2 border-[#D1D5DB] text-gray-400"
              >
                Subir logo
              </Button>
            </Upload>
          </Space>
        </Form.Item>

        {isTamañoArchivoExcedido && (
          <div className="mb-4 -mt-3">
            <AlertError
              titulo="text"
              descripcion="El tamaño del logo excede los 5MB permitidos."
            />
          </div>
        )}

        {/* Imagen edit view */}
        {isEdit && (
          <div className={`-mt-2 flex ${conLogo && "mb-6"} flex-col`}>
            <div className="flex justify-center mt-2">
              {conLogo ? (
                <img
                  className="w-full max-w-[220px]  
                  max-h-[420px] sm:max-h-[220px] object-cover rounded-lg"
                  src={BASE_URL_FILES + routeLogo}
                  alt={`logo-tienda-${nameShop}`}
                />
              ) : null}
            </div>
            <div className="flex justify-center">
              {conLogo && (
                <Button
                  onClick={() => deleteLogo()}
                  className="text-gray-400 delete-button-select-opcion text-sm mt-1
                 hover:text-red-500 transition-all block"
                >
                  Eliminar logo
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Direccion y telefono */}
        <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
          {/* Direccion */}
          <Form.Item
            hasFeedback
            name="address"
            label="Dirección"
            rules={[{ min: 4, message: "Mínimo 4 caracteres" }]}
          >
            <Input type="text" placeholder="Ingresa dirección" />
          </Form.Item>

          {/* Télefono */}
          <Form.Item
            hasFeedback
            name="phone"
            label="Teléfono"
            rules={[
              {
                min: 9,
                message: "Mínimo 9 números",
              },
              { max: 9, message: "Máximo 9 números" },

              {
                pattern: new RegExp(/^[0-9]+$/),
                message: "Solo ingresa números por favor",
              },
            ]}
          >
            <Input
              maxLength={9}
              addonBefore="+56"
              type="tel"
              inputmode="numeric"
              placeholder="Ingresa teléfono"
            />
          </Form.Item>
        </div>

        {/* Email */}
        <Form.Item
          hasFeedback
          name="email"
          label="Correo electrónico"
          rules={[
            { max: 70, message: "Máximo 70 caracteres" },
            {
              pattern: /^\S+@\S+\.\S+$/,
              message: "Correo electrónico invalido",
            },
          ]}
        >
          <Input type="email" placeholder="Ingresa correo electrónico" />
        </Form.Item>

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
              disabled={isTamañoArchivoExcedido}
              htmlType="submit"
            >
              {isEdit ? "Editar Tienda" : "Agregar Tienda"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
});
