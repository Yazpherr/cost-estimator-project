import { Button, Form, Input, Modal, Space, message } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { axiosInstance } from "../../../../axios/axiosInstance";
import { useAuthContext } from "../../../../context/AuthContext";
import { AlertError } from "../../AlertError";

export const ModalCUCategorias = forwardRef((props, ref) => {
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

  const childFunction = (id, action, dataUser) => {
    setOpen(true);
    setVisibleAlertError(false);

    if (action === "Edit") {
      setId(id);
      setIsEdit(true);

      form.resetFields();
      form.setFieldsValue({
        name: dataUser[1],
      });
    } else {
      form.resetFields();
      setIsEdit(false);
    }
  };

  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const createCategory = async () => {
    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("fk_user_id_created", userLogged.id);
    formData.append("fk_shop_id", storeLogged.id);

    setIsLoadingButton(true);

    await axiosInstance
      .post("/api/createCategory", formData)
      .then((response) => {
        message.success("Categoría creada con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadTable();
      })
      .catch((error) => {
        if (error.response.data.errors.name) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("Ya existe una categoría con ese nombre");
        } else {
          message.error("No se ha podido agregar la categoría");
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  const updateCategory = async () => {
    setVisibleAlertError(false);

    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("fk_user_id_updated", userLogged.id);
    formData.append("fk_shop_id", storeLogged.id);

    setIsLoadingButton(true);

    await axiosInstance
      .put("/api/updateCategory/" + id, formData)
      .then((response) => {
        message.success("Categoría editada con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadTable();
      })
      .catch((error) => {
        if (error.response.data.errors.name) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("Ya existe una categoría con ese nombre");
        } else {
          message.error("No se ha podido editar la categoría");
        }
        console.log(error);
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  return (
    <Modal
      title={isEdit ? "Editar Categoría" : "Agregar Categoría"}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form
        form={form}
        className="pt-4"
        layout="vertical"
        onFinish={isEdit ? updateCategory : createCategory}
      >
        {/* Name */}
        <Form.Item
          hasFeedback
          name="name"
          label="Nombre"
          rules={[
            { required: true, message: "Ingresa nombre de la categoría" },
            { min: 2, message: "Mínimo 2 caracteres" },
          ]}
        >
          <Input placeholder="Ingresa nombre de la categoría" />
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
              {isEdit ? "Editar Categoría" : "Agregar Categoría"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
});
