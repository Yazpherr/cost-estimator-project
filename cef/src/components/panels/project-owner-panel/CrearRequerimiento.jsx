import { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Spin, notification } from "antd";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('/api/crear-requerimiento', formData)
      .then(response => {
        setLoading(false);
        notification.success({
          message: 'Requerimiento creado',
          description: 'El requerimiento se ha creado exitosamente.'
        });
        console.log(response.data);
      })
      .catch(error => {
        setLoading(false);
        notification.error({
          message: 'Error',
          description: 'Hubo un error al crear el requerimiento. Por favor, intenta nuevamente.'
        });
        console.error("Hubo un error al crear el requerimiento:", error);
      });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Crear Requerimiento</h1>
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
    </div>
  );
};

export default CrearRequerimiento;
