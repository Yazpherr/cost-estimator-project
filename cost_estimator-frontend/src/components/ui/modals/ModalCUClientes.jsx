import { Button, Form, Input, Modal, Space, message } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { axiosInstance } from "../../../axios/axiosInstance";
import { useAuthContext } from "../../../context/AuthContext";
import { AlertError } from "../AlertError";

export const ModalCUClientes = forwardRef((props, ref) => {
  const { storeLogged, userLogged } = useAuthContext();

  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  //Loadings
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  //Alerts
  const [visibleAlertError, setVisibleAlertError] = useState(false);
  const [tituloAlerta, setTituloAlerta] = useState("");
  const [descripcionAlerta, setDescripcionAlerta] = useState("");

  const [form] = Form.useForm();
  const customizeRequiredMark = (label, { required }) => (
    <>
      {label}
      {!required && (
        <span className="ml-1 font-normal text-gray-400">(Opcional)</span>
      )}
    </>
  );

  const childFunction = (id, action, data) => {
    setOpen(true);
    setVisibleAlertError(false);

    if (action === "Edit") {
      setId(id);
      setIsEdit(true);

      form.resetFields();
      form.setFieldsValue({
        rut: data[0],
        nombre: data[1],
        apellido: data[2],
        email: data[3] === null ? undefined : data[3],
        direccion: data[4] === null ? undefined : data[4],
        telefono: data[5] === null ? undefined : data[5] + "",
      });
    } else {
      form.resetFields();
      setIsEdit(false);
    }
  };

  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const createCliente = async () => {
    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("dni", formValues.rut);
    formData.append("name", formValues.nombre);
    formData.append("lastname", formValues.apellido);
    formData.append(
      "email",
      formValues.email == undefined ? "" : formValues.email
    );
    formData.append(
      "address",
      formValues.direccion === undefined ? "" : formValues.direccion
    );
    formData.append(
      "phone",
      formValues.telefono === undefined ? "" : formValues.telefono
    );
    formData.append("fk_user_id_created", userLogged.id);
    formData.append("fk_shop_id", storeLogged.id);

    setIsLoadingButton(true);

    await axiosInstance
      .post("/api/createCliente", formData)
      .then((response) => {
        message.success("Cliente creado con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadTable();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data.errors.dni) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("Ya existe un cliente con este RUT/DNI");
        } else {
          message.error("No se ha podido agregar el cliente");
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  const updateCliente = async () => {
    setVisibleAlertError(false);

    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("dni", formValues.rut);
    formData.append("name", formValues.nombre);
    formData.append("lastname", formValues.apellido);
    formData.append(
      "email",
      formValues.email == undefined ? "" : formValues.email
    );
    formData.append(
      "address",
      formValues.direccion === undefined ? "" : formValues.direccion
    );
    formData.append(
      "phone",
      formValues.telefono === undefined ? "" : formValues.telefono
    );
    formData.append("fk_user_id_updated", userLogged.id);
    formData.append("fk_shop_id", storeLogged.id);

    setIsLoadingButton(true);

    await axiosInstance
      .put("/api/updateCliente/" + id, formData)
      .then((response) => {
        message.success("Cliente editado con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadTable();
      })
      .catch((error) => {
        if (error.response.data.errors.dni) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("Ya existe un cliente con este RUT/DNI");
        } else {
          message.error("No se ha podido editar el impuesto");
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  return (
    <Modal
      title={isEdit ? "Editar Cliente" : "Agregar Cliente"}
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
        onFinish={isEdit ? updateCliente : createCliente}
      >
        {/* Dni */}
        <Form.Item
          hasFeedback
          name="rut"
          label="RUT/DNI"
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
                        rut: formattedValue,
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
            maxLength={10}
            placeholder="Ingresa tu RUT o DNI"
          />
        </Form.Item>

        {/* Nombre y apellido */}
        <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
          {/* Nombre */}
          <Form.Item
            hasFeedback
            name="nombre"
            label="Nombre"
            rules={[
              { required: true, message: "Ingresa nombre" },
              { min: 2, message: "Mínimo 2 caracteres" },
              { max: 20, message: "Máximo 20 caracteres" },
            ]}
          >
            <Input type="text" placeholder="Ingresa nombre" />
          </Form.Item>

          {/* Apellido */}
          <Form.Item
            hasFeedback
            name="apellido"
            label="Apellidos"
            rules={[
              { required: true, message: "Ingresa apellido" },
              { min: 2, message: "Mínimo 2 caracteres" },
              { max: 20, message: "Máximo 20 caracteres" },
            ]}
          >
            <Input type="text" placeholder="Ingresa apellido" />
          </Form.Item>
        </div>

        {/* Email */}
        <Form.Item
          hasFeedback
          name="email"
          label="Correo electrónico"
          rules={[
            {
              pattern: /^\S+@\S+\.\S+$/,
              message: "Correo electrónico inválido",
            },
            { max: 70, message: "Máximo 70 caracteres" },
          ]}
        >
          <Input type="email" placeholder="Ingresa correo electrónico" />
        </Form.Item>

        {/* Direccion y telefono */}
        <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
          {/* Direccion */}
          <Form.Item
            hasFeedback
            name="direccion"
            label="Dirección"
            rules={[{ min: 4, message: "Mínimo 4 caracteres" }]}
          >
            <Input type="text" placeholder="Ingresa dirección" />
          </Form.Item>

          {/* Télefono */}
          <Form.Item
            hasFeedback
            name="telefono"
            label="Teléfono"
            rules={[
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
              maxLength={9}
              addonBefore="+56"
              type="tel"
              placeholder="Ingresa teléfono"
            />
          </Form.Item>
        </div>

        {/* Alert*/}
        {visibleAlertError && (
          <div>
            <AlertError titulo={tituloAlerta} descripcion={descripcionAlerta} />
          </div>
        )}

        {/* Button */}
        <Form.Item className="m-0 mt-12 p-0 flex justify-end">
          <Space>
            <Button
              className="cancel-button-modal h-fit border-none
               text-red-500 hover:bg-red-100 transition-all"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="h-fit border-none bg-primary text-white"
              loading={isLoadingButton}
              htmlType="submit"
            >
              {isEdit ? "Editar Cliente" : "Agregar Cliente"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
});
