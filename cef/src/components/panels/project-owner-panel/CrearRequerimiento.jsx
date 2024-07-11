import { useState, useEffect } from "react";
import { Form, Input, Button, Spin, notification, Table, Modal } from "antd";
import { createRequirement, getAllRequirements } from "../../../services/api"; // Ruta correcta al archivo api

const CrearRequerimiento = () => {
  const [formData, setFormData] = useState({
    project_id: "",
    name: "",
    component_type: "",
    complexity_level: "",
    function_points: "",
    justification: ""
  });
  const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchRequirements = async () => {
    setLoading(true);
    try {
      const response = await getAllRequirements();
      setRequirements(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al obtener los requerimientos. Por favor, intenta nuevamente."
      });
    }
  };

  useEffect(() => {
    fetchRequirements();
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
      const response = await createRequirement(formData);
      setLoading(false);
      notification.success({
        message: "Requerimiento creado",
        description: "El requerimiento se ha creado exitosamente."
      });
      setRequirements([...requirements, response.data]); // Actualizar la tabla con el nuevo requerimiento
      setModalVisible(false); // Cerrar el modal después de crear el requerimiento
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al crear el requerimiento. Por favor, intenta nuevamente."
      });
    }
  };

  const columns = [
    {
      title: "ID del Proyecto",
      dataIndex: "project_id",
      key: "project_id"
    },
    {
      title: "Nombre del Requerimiento",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Tipo de Componente",
      dataIndex: "component_type",
      key: "component_type"
    },
    {
      title: "Nivel de Complejidad",
      dataIndex: "complexity_level",
      key: "complexity_level"
    },
    {
      title: "Puntos de Función",
      dataIndex: "function_points",
      key: "function_points"
    },
    {
      title: "Justificación",
      dataIndex: "justification",
      key: "justification"
    }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>Requerimientos</h1>
      <Button type="primary" style={{ marginBottom: "1rem" }} onClick={() => setModalVisible(true)}>
        Crear Requerimiento
      </Button>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={requirements} rowKey="id" />
      </Spin>

      <Modal
        title="Crear Requerimiento"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form layout="vertical" onSubmit={handleSubmit}>
            <Form.Item label="ID del Proyecto" required>
              <Input
                type="text"
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
                required
              />
            </Form.Item>
            <Form.Item label="Nombre del Requerimiento" required>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Item>
            <Form.Item label="Tipo de Componente">
              <Input
                type="text"
                name="component_type"
                value={formData.component_type}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Nivel de Complejidad">
              <Input
                type="number"
                name="complexity_level"
                value={formData.complexity_level}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Puntos de Función">
              <Input
                type="number"
                name="function_points"
                value={formData.function_points}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Justificación">
              <Input.TextArea
                name="justification"
                value={formData.justification}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Crear Requerimiento
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default CrearRequerimiento;
