import { useState, useEffect } from "react";
import { Form, Input, Button, Spin, notification, Table, Modal, Select } from "antd";
import { createRequirement, getAllRequirements, getAllTeamMembers } from "../../../services/api"; // Ruta correcta al archivo api

const { Option } = Select;

const CrearRequerimiento = () => {
  const [formData, setFormData] = useState({
    project_id: "",
    name: "",
    component_type: "",
    complexity_level: "",
    function_points: "",
    justification: "",
    team_member_id: ""
  });
  const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

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

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const response = await getAllTeamMembers();
      setTeamMembers(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al obtener los miembros del equipo. Por favor, intenta nuevamente."
      });
    }
  };

  useEffect(() => {
    fetchRequirements();
    fetchTeamMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      team_member_id: value
    });
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await createRequirement(values);
      setLoading(false);
      notification.success({
        message: "Requerimiento creado",
        description: "El requerimiento se ha creado exitosamente."
      });
      setRequirements([...requirements, response.data]); // Actualizar la tabla con el nuevo requerimiento
      setModalVisible(false); // Cerrar el modal después de crear el requerimiento
      form.resetFields();
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
    },
    {
      title: "ID del Miembro del Equipo",
      dataIndex: "team_member_id",
      key: "team_member_id"
    }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>Requerimientos</h1>
      <Button type="primary" style={{ marginBottom: "1rem" }} onClick={() => setModalVisible(true)}>
        Crear Requerimiento
      </Button>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={requirements} rowKey="id_req" />
      </Spin>

      <Modal
        title="Crear Requerimiento"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item label="ID del Proyecto" name="project_id" rules={[{ required: true, message: "Por favor, ingrese el ID del proyecto" }]}>
              <Input
                type="text"
                value={formData.project_id}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Nombre del Requerimiento" name="name" rules={[{ required: true, message: "Por favor, ingrese el nombre del requerimiento" }]}>
              <Input
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Tipo de Componente" name="component_type">
              <Input
                type="text"
                value={formData.component_type}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Nivel de Complejidad" name="complexity_level">
              <Input
                type="number"
                value={formData.complexity_level}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Puntos de Función" name="function_points">
              <Input
                type="number"
                value={formData.function_points}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Justificación" name="justification">
              <Input.TextArea
                value={formData.justification}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Asignar a Miembro del Equipo" name="team_member_id">
              <Select
                placeholder="Seleccione un miembro del equipo"
                onChange={handleSelectChange}
                value={formData.team_member_id}
              >
                {teamMembers.map((member) => (
                  <Option key={member.id_tm} value={member.id_tm}>
                    {member.user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
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
