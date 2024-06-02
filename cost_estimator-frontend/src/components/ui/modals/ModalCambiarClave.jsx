import { Button, Form, Input, Modal, Space, message } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { axiosInstance } from "../../../axios/axiosInstance";
import { useAuthContext } from "../../../context/AuthContext";
import { AlertError } from "../AlertError";

export const ModalCambiarClave = forwardRef((props, ref) => {
  //password button
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [passwordVisible3, setPasswordVisible3] = useState(false);

  const { dataUser } = props;

  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  //Loadings
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  //Alerts
  const [visibleAlertError, setVisibleAlertError] = useState(false);
  const [tituloAlerta, setTituloAlerta] = useState("");
  const [descripcionAlerta, setDescripcionAlerta] = useState("");

  const [form] = Form.useForm();

  const childFunction = () => {
    setId(dataUser.id);
    setOpen(true);
    form.resetFields();
  };

  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const cambiarPassword = async () => {
    setVisibleAlertError(false);

    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("current_password", formValues.password_actual);
    formData.append("password", formValues.password);
    formData.append("password_confirmation", formValues.password_confirmation);

    setIsLoadingButton(true);

    await axiosInstance
      .put(`/api/changePassword/` + id, formData)
      .then((response) => {
        message.success("Contraseña cambiada con éxito");
        form.resetFields();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message === "La contraseña no coincide") {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("La contraseña actual es incorrecta");
        }
        if (
          error.response.data.message ===
          "La nueva contraseña debe ser diferente de la actual."
        ) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta(
            "La nueva contraseña debe ser diferente de la actual."
          );
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  return (
    <Modal
      title={"Cambiar contraseña"}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form
        form={form}
        className="pt-4"
        layout="vertical"
        onFinish={cambiarPassword}
      >
        {/* Password */}
        <Form.Item
          name="password_actual"
          label="Contraseña actual"
          hasFeedback
          rules={[{ required: true, message: "Ingresa tu contraseña actual" }]}
        >
          <Input.Password
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            placeholder="Ingresa tu contraseña actual"
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          label="Nueva contraseña"
          hasFeedback
          rules={[
            { required: true, message: "Ingresa tu nueva contraseña" },
            { min: 8, message: "Mínimo 8 caracteres" },
          ]}
        >
          <Input.Password
            visibilityToggle={{
              visible: passwordVisible2,
              onVisibleChange: setPasswordVisible2,
            }}
            placeholder="Ingresa tu nueva contraseña"
          />
        </Form.Item>

        {/* Password confirmed */}
        <Form.Item
          name="password_confirmation"
          dependencies={["password"]}
          label="Confirma tu nueva contraseña"
          hasFeedback
          rules={[
            { required: true, message: "Confirma tu nueva contraseña" },
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
              visible: passwordVisible3,
              onVisibleChange: setPasswordVisible3,
            }}
            placeholder="Confirma tu nueva contraseña"
          />
        </Form.Item>

        {/* Alert*/}
        {visibleAlertError && (
          <div className="mb-4">
            <AlertError titulo={tituloAlerta} descripcion={descripcionAlerta} />
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
              {"Cambiar contraseña"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
});
