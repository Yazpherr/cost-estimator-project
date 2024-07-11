import { useState } from "react";
import { Form, Input, Button, Spin, notification } from "antd";
import { createProject } from "../../../services/api"; // Asegúrate de ajustar la ruta según tu estructura de carpetas

const CrearProyectoPO = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    total_function_points: "",
    complexity_adjustment_values: "",
    estimated_effort: "",
    estimated_time: "",
    associated_costs: ""
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
    createProject(formData)
      .then(response => {
        setLoading(false);
        notification.success({
          message: 'Proyecto creado',
          description: 'El proyecto se ha creado exitosamente.'
        });
        console.log(response.data);
        // Manejar la respuesta del servidor, como mostrar un mensaje de éxito o redirigir
      })
      .catch(error => {
        setLoading(false);
        notification.error({
          message: 'Error',
          description: 'Hubo un error al crear el proyecto. Por favor, intenta nuevamente.'
        });
        console.error("Hubo un error al crear el proyecto:", error);
        // Manejar el error, como mostrar un mensaje de error
      });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Crear Proyecto</h1>
      <Spin spinning={loading}>
        <Form layout="vertical" onSubmit={handleSubmit}>
          <Form.Item label="Nombre del Proyecto" required>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Item>
          <Form.Item label="Descripción">
            <Input.TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Puntos Totales de Función">
            <Input
              type="number"
              name="total_function_points"
              value={formData.total_function_points}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Valores de Ajuste de Complejidad">
            <Input
              type="number"
              name="complexity_adjustment_values"
              value={formData.complexity_adjustment_values}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Esfuerzo Estimado">
            <Input
              type="number"
              name="estimated_effort"
              value={formData.estimated_effort}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Tiempo Estimado">
            <Input
              type="number"
              name="estimated_time"
              value={formData.estimated_time}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Costos Asociados">
            <Input
              type="number"
              name="associated_costs"
              value={formData.associated_costs}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Crear Proyecto
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default CrearProyectoPO;
