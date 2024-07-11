import { useState, useEffect } from "react";
import { Form, Input, Button, Spin, notification, Table, Modal } from "antd";
import { createProject, getProductOwnerProjects, updateProject, calculateTotalFunctionPoints, calculateEstimatedTime, calculateAssociatedCosts } from "../../../services/api";

const CrearProyectoPO = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    total_function_points: null,
    complexity_adjustment_values: null,
    estimated_effort: null,
    estimated_time: null,
    associated_costs: null,
  });
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getProductOwnerProjects();
      const projectsData = response.data;

      // Calcular los puntos de función y el tiempo estimado para cada proyecto
      for (let project of projectsData) {
        await handleCalculateFunctionPoints(project.id_pro);
        await handleCalculateEstimatedTime(project.id_pro);
      }

      setProjects(projectsData);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Hubo un error al obtener los proyectos. Por favor, intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCalculateFunctionPoints = async (projectId) => {
    try {
      await calculateTotalFunctionPoints(projectId);
    } catch (error) {
      console.error("Hubo un error al calcular los puntos de función:", error);
    }
  };

  const handleCalculateEstimatedTime = async (projectId) => {
    try {
      await calculateEstimatedTime(projectId);
    } catch (error) {
      console.error("Hubo un error al calcular el tiempo estimado:", error);
    }
  };

  const calculateWorkDays = (hours) => {
    const hoursPerDay = 8;
    const workDays = hours / hoursPerDay;
    return workDays.toFixed(2); // Redondear a 2 decimales
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (values) => {
    setLoading(true);
    createProject(values)
      .then((response) => {
        setLoading(false);
        notification.success({
          message: "Proyecto creado",
          description: "El proyecto se ha creado exitosamente.",
        });
        fetchProjects(); // Refresh the project list
        setModalVisible(false); // Close the modal
      })
      .catch((error) => {
        setLoading(false);
        notification.error({
          message: "Error",
          description: "Hubo un error al crear el proyecto. Por favor, intenta nuevamente.",
        });
        console.error("Hubo un error al crear el proyecto:", error);
      });
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    form.setFieldsValue(project);
    setEditModalVisible(true);
  };

  const handleUpdateProject = async (values) => {
    setLoading(true);
    try {
      const response = await updateProject(selectedProject.id_pro, values);
      setLoading(false);
      notification.success({
        message: "Proyecto actualizado",
        description: "El proyecto se ha actualizado exitosamente.",
      });
      fetchProjects(); // Refresh the project list
      setEditModalVisible(false); // Close the modal
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al actualizar el proyecto. Por favor, intenta nuevamente.",
      });
      console.error("Hubo un error al actualizar el proyecto:", error);
    }
  };

  const columns = [
    {
      title: "ID del Proyecto",
      dataIndex: "id_pro",
      key: "id_pro",
    },
    {
      title: "Nombre del Proyecto",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Puntos Totales de Función",
      dataIndex: "total_function_points",
      key: "total_function_points",
    },
    // {
    //   title: "Esfuerzo Estimado",
    //   dataIndex: "estimated_effort",
    //   key: "estimated_effort",
    // },
    {
      title: "Tiempo Estimado (Horas Hombre / Días Laborales)",
      key: "estimated_time_days",
      render: (text, record) => (
        <span>{record.estimated_time} horas / {calculateWorkDays(record.estimated_time)} días</span>
      ),
    },
    {
      title: "Costos Asociados UF",
      dataIndex: "associated_costs",
      key: "associated_costs",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEditProject(record)}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Crear Proyecto
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table dataSource={projects} columns={columns} rowKey="id_pro" />
      </Spin>
      <Modal
        title="Crear Proyecto"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form layout="vertical" onFinish={handleSubmit} initialValues={formData}>
            <Form.Item
              label="Nombre del Proyecto"
              name="name"
              rules={[{ required: true, message: "Por favor, ingrese el nombre del proyecto" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Descripción" name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Puntos Totales de Función" name="total_function_points">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Valores de Ajuste de Complejidad" name="complexity_adjustment_values">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Esfuerzo Estimado" name="estimated_effort">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Tiempo Estimado (Horas Hombre)" name="estimated_time">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Costos Asociados" name="associated_costs">
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Crear Proyecto
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      <Modal
        title="Editar Proyecto"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form layout="vertical" form={form} onFinish={handleUpdateProject}>
            <Form.Item
              label="Nombre del Proyecto"
              name="name"
              rules={[{ required: true, message: "Por favor, ingrese el nombre del proyecto" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Descripción" name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Puntos Totales de Función" name="total_function_points">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Valores de Ajuste de Complejidad" name="complexity_adjustment_values">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Esfuerzo Estimado" name="estimated_effort">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Tiempo Estimado (Horas Hombre)" name="estimated_time">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Costos Asociados" name="associated_costs">
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Actualizar Proyecto
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default CrearProyectoPO;
