import { useState, useEffect } from "react";
import { Form, Input, Button, Spin, notification, Modal, Table } from "antd";
import { createProfession, getAllProfessions } from "../../../services/api"; // Ruta correcta al archivo api

const Profesion = () => {
  const [formData, setFormData] = useState({
    name: "",
    salary: ""
  });
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [professions, setProfessions] = useState([]);

  const fetchProfessions = async () => {
    setLoading(true);
    try {
      const response = await getAllProfessions();
      setProfessions(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al obtener las profesiones. Por favor, intenta nuevamente."
      });
    }
  };

  useEffect(() => {
    fetchProfessions();
  }, []);

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
      const response = await createProfession(formData);
      setLoading(false);
      notification.success({
        message: "Profesión creada",
        description: "La profesión se ha creado exitosamente."
      });
      setProfessions([...professions, response.data]); // Actualizar la lista de profesiones
      setModalVisible(false); // Cerrar el modal después de crear la profesión
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al crear la profesión. Por favor, intenta nuevamente."
      });
      console.error("Hubo un error al crear la profesión:", error);
    }
  };

  const columns = [
    {
      title: "Profesión",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Salario UF",
      dataIndex: "salary",
      key: "salary"
    }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>Bienvenido Admin</h1>
      <Button 
        type="primary" 
        style={{ marginBottom: "1rem", position: "absolute", top: "2rem", right: "2rem" }} 
        onClick={() => setModalVisible(true)}
      >
        Crear Profesión
      </Button>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={professions} rowKey="id_prof" />
      </Spin>
      <Modal
        title="Crear Profesión"
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
            <Form.Item label="Salario" required>
              <Input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Crear Profesión
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default Profesion;
