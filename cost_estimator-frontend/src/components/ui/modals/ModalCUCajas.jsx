import { Button, Form, Input, Modal, Space, message } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { axiosInstance } from "../../../axios/axiosInstance";
import { useAuthContext } from "../../../context/AuthContext";
import { AlertError } from "../AlertError";

export const ModalCUCajas = forwardRef((props, ref) => {
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
        title_box: data[0],
      });
    } else {
      form.resetFields();
      setIsEdit(false);
    }
  };

  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const createCajas = async () => {
    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("title_box", formValues.title_box);
    formData.append("fk_user_id_created", userLogged.id);
    formData.append("fk_shop_id", storeLogged.id);

    setIsLoadingButton(true);

    await axiosInstance
      .post("/api/createCaja", formData)
      .then((response) => {
        message.success("Caja creada con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadTable();
      })
      .catch((error) => {
        if (error.response.data.errors.title_box) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("Ya existe una caja con ese número");
        } else {
          message.error("No se ha podido agregar la caja");
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
    formData.append("title_box", formValues.title_box);
    formData.append("fk_user_id_updated", userLogged.id);
    formData.append("fk_shop_id", storeLogged.id);

    setIsLoadingButton(true);

    await axiosInstance
      .put("/api/updateCaja/" + id, formData)
      .then((response) => {
        message.success("Caja editada con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadTable();
      })
      .catch((error) => {
        if (error.response.data.errors.title_box) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("Ya existe una caja con ese número");
        } else {
          message.error("No se ha podido editar la caja");
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  return (
    <Modal
      title={isEdit ? "Editar Caja" : "Agregar Caja"}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form
        form={form}
        className="pt-4"
        layout="vertical"
        onFinish={isEdit ? updateImpuesto : createCajas}
      >
        {/* tittle */}
        <Form.Item
          hasFeedback
          name="title_box"
          label="N° de Caja"
          rules={[
            { required: true, message: "Ingresa número de caja" },
            { min: 1, message: "Mínimo 1 caracteres" },
            {
              validator: (_, value) =>
                value && !/^\s+$/.test(value)
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        "El número de caja no puede contener solo espacios en blanco"
                      )
                    ),
            },
            {
              pattern: new RegExp(/^[0-9]+$/),
              message: "Solo ingresa números por favor",
            },
          ]}
        >
          <Input placeholder="Ingresa número de caja" />
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
              {isEdit ? "Editar Caja" : "Agregar Caja"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
});
