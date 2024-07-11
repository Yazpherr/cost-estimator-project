import  { useState } from "react";
import { Form, Input, Button, Modal, notification, Spin } from "antd";
import { registerUser } from "../../../services/api"; // Ruta correcta al archivo api

const CrearProductOwner = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await registerUser(values);
      setLoading(false);
      notification.success({
        message: "Registro Exitoso",
        description: "El Product Owner se ha registrado exitosamente.",
      });
      form.resetFields();
      setModalVisible(false); // Cerrar el modal después de registrar el Product Owner
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al registrar el Product Owner. Por favor, intenta nuevamente.",
      });
      console.error("Hubo un error al registrar el Product Owner:", error);
    }
  };

  return (
    <div>
      <h1>Bienvenido, Admin</h1>

      <Button type="primary" onClick={() => setModalVisible(true)}>
        Registrar Product Owner
      </Button>

      <Modal
        title="Registrar Product Owner"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form layout="vertical" form={form} onFinish={handleRegister}>
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: "Por favor, ingrese el nombre" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Por favor, ingrese el email", type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: "Por favor, ingrese la contraseña", min: 6 }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirmar Contraseña"
              name="password_confirmation"
              rules={[{ required: true, message: "Por favor, confirme la contraseña", min: 6 }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Registrar Product Owner
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default CrearProductOwner;
