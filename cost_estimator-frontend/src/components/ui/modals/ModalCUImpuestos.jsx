import { Button, Form, Input, Modal, Space, message } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { axiosInstance } from "../../../axios/axiosInstance";
import { useAuthContext } from "../../../context/AuthContext";
import { AlertError } from "../AlertError";

export const ModalCUImpuestos = forwardRef((props, ref) => {
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

  const childFunction = (id, action, data) => {
    setOpen(true);
    setVisibleAlertError(false);

    if (action === "Edit") {
      setId(id);
      setIsEdit(true);

      form.resetFields();
      form.setFieldsValue({
        title_tax: data[0],
        percentage: data[1] + "",
      });
    } else {
      form.resetFields();
      setIsEdit(false);
    }
  };

  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const createImpuesto = async () => {
    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("title_tax", formValues.title_tax);
    formData.append("percentage", formValues.percentage);
    formData.append("fk_user_id_created", userLogged.id);
    formData.append("fk_shop_id", storeLogged.id);

    setIsLoadingButton(true);

    await axiosInstance
      .post("/api/createImpuesto", formData)
      .then((response) => {
        message.success("Impuesto creado con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadTable();
      })
      .catch((error) => {
        if (error.response.data.errors.title_tax) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("Ya existe un impuesto con ese título");
        } else {
          message.error("No se ha podido agregar el impuesto");
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  const updateImpuesto = async () => {
    setVisibleAlertError(false);

    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("title_tax", formValues.title_tax);
    formData.append("percentage", formValues.percentage);
    formData.append("fk_user_id_updated", userLogged.id);
    formData.append("fk_shop_id", storeLogged.id);

    setIsLoadingButton(true);

    await axiosInstance
      .put("/api/updateImpuesto/" + id, formData)
      .then((response) => {
        message.success("Impuesto editado con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadTable();
      })
      .catch((error) => {
        if (error.response.data.errors.title_tax) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("Ya existe un impuesto con ese título");
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
      title={isEdit ? "Editar Impuesto" : "Agregar Impuesto"}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form
        form={form}
        className="pt-4"
        layout="vertical"
        onFinish={isEdit ? updateImpuesto : createImpuesto}
      >
        {/* tittle */}
        <Form.Item
          hasFeedback
          name="title_tax"
          label="Título de Impuesto"
          rules={[
            { required: true, message: "Ingresa título de impuesto" },
            { min: 2, message: "Mínimo 2 caracteres" },
          ]}
        >
          <Input placeholder="Ingresa título de impuesto" />
        </Form.Item>

        {/* Porcentaje */}
        <Form.Item
          hasFeedback
          name="percentage"
          label="Tasa del Impuesto (%)"
          rules={[
            {
              required: true,
              message: "Por favor ingresa la tasa del impuesto",
            },
            {
              max: 9,
              message: "Máximo 9 dígitos",
            },
            {
              validator: (_, value) => {
                if (!value) {
                  // Si el campo está vacío
                  return Promise.resolve(); // La validación pasa
                }
                // Si hay un valor, verifica si es un número válido
                return /^\d+(\.\d+)?$/.test(value.replace(/[,.]/g, ""))
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        "La tasa del impuesto solo puede contener números"
                      )
                    );
              },
            },
          ]}
        >
          <Input
            type="text"
            addonAfter="%"
            maxLength={9}
            inputmode="numeric"
            placeholder="Ingresa la tasa del impuesto"
          />
        </Form.Item>

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
              {isEdit ? "Editar Impuesto" : "Agregar Impuesto"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
});
