import { useState } from "react";
import { Form, Input, Button, Spin, notification, Modal } from "antd";
import { createTeamMember } from "../../../services/api"; // Ruta correcta al archivo api

const CrearMiembroEquipo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profession_id: ""
  });
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createTeamMember(formData);
      setLoading(false);
      notification.success({
        message: "Miembro del equipo creado",
        description: "El miembro del equipo se ha creado exitosamente."
      });
      console.log(response.data);
      setModalVisible(false); // Cerrar el modal después de crear el miembro del equipo
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al crear el miembro del equipo. Por favor, intenta nuevamente."
      });
      console.error("Hubo un error al crear el miembro del equipo:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Crear Miembro del Equipo</h1>
      <Button type="primary" style={{ marginBottom: "1rem" }} onClick={() => setModalVisible(true)}>
        Crear Miembro del Equipo
      </Button>
      <Modal
        title="Crear Miembro del Equipo"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form layout="vertical" onSubmit={handleSubmit}>
            <Form.Item label="Nombre" required>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Item>
            <Form.Item label="Contraseña" required>
              <Input.Password
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Item>
            <Form.Item label="Confirmar Contraseña" required>
              <Input.Password
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </Form.Item>
            <Form.Item label="ID de Profesión" required>
              <Input
                type="text"
                name="profession_id"
                value={formData.profession_id}
                onChange={handleChange}
                required
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Crear Miembro del Equipo
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default CrearMiembroEquipo;
