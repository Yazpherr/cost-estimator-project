import { useState, useEffect } from "react";
import { Table, Spin, notification, Button, Modal, Form, Input, Select } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { getTeamMemberProjects, getProjectRequirements, updateRequirement } from "../../../services/api"; // Ruta correcta al archivo api

const { Option } = Select;

const componentOptions = [
  { label: "Entrada externa", value: "Entrada externa" },
  { label: "Consulta externa", value: "Consulta externa" },
  { label: "Salida externa", value: "Salida externa" },
  { label: "Archivo lógico interno", value: "Archivo lógico interno" },
  { label: "Archivo lógico externo", value: "Archivo lógico externo" },
  { label: "No funcional", value: "No funcional" }
];

const complexityOptions = [
  { label: "Bajo", value: "bajo" },
  { label: "Medio", value: "medio" },
  { label: "Alto", value: "alto" },
];

const functionPointsTable = {
  "Entrada externa": { bajo: 3, medio: 4, alto: 6 },
  "Consulta externa": { bajo: 3, medio: 4, alto: 6 },
  "Salida externa": { bajo: 4, medio: 5, alto: 7 },
  "Archivo lógico interno": { bajo: 7, medio: 10, alto: 15 },
  "Archivo lógico externo": { bajo: 5, medio: 7, alto: 10 },
  "No funcional": { bajo: 0, medio: 0, alto: 0 }
};

const RequerimientosTM = () => {
  const [projects, setProjects] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingRequirements, setLoadingRequirements] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [isEditingFunctionPoints, setIsEditingFunctionPoints] = useState(false);
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

  const handleComponentTypeChange = (value) => {
    form.setFieldsValue({ component_type: value });
    if (value === "No funcional") {
      form.setFieldsValue({ complexity_level: null, function_points: null });
    } else {
      const currentValues = form.getFieldsValue();
      const complexityLevel = currentValues.complexity_level;
      if (complexityLevel && !isEditingFunctionPoints) {
        const functionPoints = functionPointsTable[value][complexityLevel];
        form.setFieldsValue({ function_points: functionPoints });
      }
    }
  };

  const handleComplexityLevelChange = (value) => {
    form.setFieldsValue({ complexity_level: value });
    const currentValues = form.getFieldsValue();
    const componentType = currentValues.component_type;
    if (componentType && componentType !== "No funcional" && !isEditingFunctionPoints) {
      const functionPoints = functionPointsTable[componentType][value];
      form.setFieldsValue({ function_points: functionPoints });
    }
  };

  const toggleFunctionPointsEdit = () => {
    setIsEditingFunctionPoints(!isEditingFunctionPoints);
    if (!isEditingFunctionPoints) {
      form.setFieldsValue({ justification: '' });
    }
  };

  const projectColumns = [
    {
      title: "ID del Proyecto",
      dataIndex: "id_pro",
      key: "id_pro",
      responsive: ['md']
    },
    {
      title: "Nombre del Proyecto",
      dataIndex: "name",
      key: "name",
      responsive: ['md']
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      responsive: ['md']
    },
    {
      title: "ID del Product Owner",
      dataIndex: "product_owner_id",
      key: "product_owner_id",
      responsive: ['md']
    },
    {
      title: "Total de Puntos de Función",
      dataIndex: "total_function_points",
      key: "total_function_points",
      responsive: ['md']
    },
    {
      title: "Valores de Ajuste de Complejidad",
      dataIndex: "complexity_adjustment_values",
      key: "complexity_adjustment_values",
      responsive: ['md']
    },
    // {
    //   title: "Esfuerzo Estimado",
    //   dataIndex: "estimated_effort",
    //   key: "estimated_effort",
    //   responsive: ['md']
    // },
    {
      title: "Tiempo Sueldos UF",
      dataIndex: "estimated_time",
      key: "estimated_time",
      responsive: ['md']
    },
    {
      title: "Costos Asociados",
      dataIndex: "associated_costs",
      key: "associated_costs",
      responsive: ['md']
    },
    // {
    //   title: "Creado el",
    //   dataIndex: "created_at",
    //   key: "created_at",
    //   responsive: ['md']
    // },
    // {
    //   title: "Actualizado el",
    //   dataIndex: "updated_at",
    //   key: "updated_at",
    //   responsive: ['md']
    // },
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
      responsive: ['md']
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      responsive: ['md']
    },
    {
      title: "Tipo de Componente",
      dataIndex: "component_type",
      key: "component_type",
      responsive: ['md']
    },
    {
      title: "Nivel de Complejidad",
      dataIndex: "complexity_level",
      key: "complexity_level",
      responsive: ['md']
    },
    {
      title: "Puntos de Función",
      dataIndex: "function_points",
      key: "function_points",
      responsive: ['md']
    },
    {
      title: "Justificación",
      dataIndex: "justification",
      key: "justification",
      responsive: ['md']
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
              rules={[{ required: true, message: "Por favor, seleccione el tipo de componente" }]}
            >
              <Select onChange={handleComponentTypeChange}>
                {componentOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Nivel de Complejidad"
              name="complexity_level"
              rules={[{ required: true, message: "Por favor, seleccione el nivel de complejidad" }]}
            >
              <Select onChange={handleComplexityLevelChange}>
                {complexityOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Puntos de Función"
              name="function_points"
              rules={[{ required: true, message: "Por favor, ingrese los puntos de función" }]}
            >
              <Input type="number" disabled={!isEditingFunctionPoints} />
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={toggleFunctionPointsEdit}
              >
                Editar
              </Button>
            </Form.Item>
            <Form.Item
              label="Justificación"
              name="justification"
              rules={[{ required: isEditingFunctionPoints, message: "Por favor, ingrese la justificación" }]}
            >
              <Input.TextArea disabled={!isEditingFunctionPoints} />
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
