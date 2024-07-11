import { useState, useEffect } from "react";
import { Table, Spin, notification, Button, Modal, Form, Input } from "antd";
import { getTeamMemberProjects, getProjectRequirements, updateRequirement } from "../../../services/api"; // Ruta correcta al archivo api

const RequerimientosTM = () => {
  const [projects, setProjects] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingRequirements, setLoadingRequirements] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [form] = Form.useForm();

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const response = await getTeamMemberProjects();
      setProjects(response.data);
      setLoadingProjects(false);
    } catch (error) {
      setLoadingProjects(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al obtener los proyectos. Por favor, intenta nuevamente."
      });
    }
  };

  const fetchRequirements = async (projectId) => {
    setLoadingRequirements(true);
    try {
      const response = await getProjectRequirements(projectId);
      setRequirements(response.data);
      setLoadingRequirements(false);
      setModalVisible(true);
    } catch (error) {
      setLoadingRequirements(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al obtener los requerimientos. Por favor, intenta nuevamente."
      });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleViewRequirements = (project) => {
    setSelectedProject(project);
    fetchRequirements(project.id_pro);
  };

  const handleEditRequirement = (requirement) => {
    setSelectedRequirement(requirement);
    form.setFieldsValue(requirement);
    setEditModalVisible(true);
  };

  const handleUpdateRequirement = async (values) => {
    setLoadingRequirements(true);
    try {
      const response = await updateRequirement(selectedRequirement.id_req, values);
      setLoadingRequirements(false);
      setEditModalVisible(false);
      notification.success({
        message: "Requerimiento actualizado",
        description: "El requerimiento se ha actualizado exitosamente."
      });
      // Actualizar la lista de requerimientos
      const updatedRequirements = requirements.map((req) =>
        req.id_req === selectedRequirement.id_req ? response.data : req
      );
      setRequirements(updatedRequirements);
    } catch (error) {
      setLoadingRequirements(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al actualizar el requerimiento. Por favor, intenta nuevamente."
      });
    }
  };

  const projectColumns = [
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
      title: "ID del Product Owner",
      dataIndex: "product_owner_id",
      key: "product_owner_id",
    },
    {
      title: "Total de Puntos de Función",
      dataIndex: "total_function_points",
      key: "total_function_points",
    },
    {
      title: "Valores de Ajuste de Complejidad",
      dataIndex: "complexity_adjustment_values",
      key: "complexity_adjustment_values",
    },
    {
      title: "Esfuerzo Estimado",
      dataIndex: "estimated_effort",
      key: "estimated_effort",
    },
    {
      title: "Tiempo Estimado",
      dataIndex: "estimated_time",
      key: "estimated_time",
    },
    {
      title: "Costos Asociados",
      dataIndex: "associated_costs",
      key: "associated_costs",
    },
    {
      title: "Creado el",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Actualizado el",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleViewRequirements(record)}>
          Ver Requerimientos
        </Button>
      ),
    },
  ];

  const requirementColumns = [
    {
      title: "Nombre del Requerimiento",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tipo de Componente",
      dataIndex: "component_type",
      key: "component_type",
    },
    {
      title: "Nivel de Complejidad",
      dataIndex: "complexity_level",
      key: "complexity_level",
    },
    {
      title: "Puntos de Función",
      dataIndex: "function_points",
      key: "function_points",
    },
    {
      title: "Justificación",
      dataIndex: "justification",
      key: "justification",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEditRequirement(record)}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>Bienvenido, Team Member</h1>
      <p>Esta es la página de proyectos del Team Member.</p>

      <Spin spinning={loadingProjects}>
        <Table columns={projectColumns} dataSource={projects} rowKey="id_pro" />
      </Spin>

      <Modal
        title={`Requerimientos del Proyecto: ${selectedProject ? selectedProject.name : ""}`}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        <Spin spinning={loadingRequirements}>
          <Table columns={requirementColumns} dataSource={requirements} rowKey="id_req" />
        </Spin>
      </Modal>

      <Modal
        title="Editar Requerimiento"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Spin spinning={loadingRequirements}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdateRequirement}
          >
            <Form.Item
              label="Nombre del Requerimiento"
              name="name"
              rules={[{ required: true, message: "Por favor, ingrese el nombre del requerimiento" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tipo de Componente"
              name="component_type"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Nivel de Complejidad"
              name="complexity_level"
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Puntos de Función"
              name="function_points"
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Justificación"
              name="justification"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Actualizar Requerimiento
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default RequerimientosTM;
