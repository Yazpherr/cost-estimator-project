import { useState, useEffect } from "react";
import { Form, Input, Button, Spin, notification, Modal, Table, Select } from "antd";
import { createTeamMember, getAllTeamMembers, getProfessionsForPO, updateTeamMember } from "../../../services/api"; // Ruta correcta al archivo api

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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [currentTeamMember, setCurrentTeamMember] = useState(null);

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

  const fetchProfessions = async () => {
    setLoading(true);
    try {
      const response = await getProfessionsForPO();
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
    fetchTeamMembers();
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
      const response = await createTeamMember(formData);
      setLoading(false);
      notification.success({
        message: "Miembro del equipo creado",
        description: "El miembro del equipo se ha creado exitosamente."
      });
      fetchTeamMembers(); // Refrescar la tabla después de crear el miembro del equipo
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

  const handleEdit = (record) => {
    setCurrentTeamMember(record);
    setFormData({
      name: record.user.name,
      email: record.user.email,
      profession_id: record.profession.id_prof
    });
    setEditModalVisible(true);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await updateTeamMember(currentTeamMember.id_tm, formData);
      setLoading(false);
      notification.success({
        message: "Miembro del equipo actualizado",
        description: "El miembro del equipo se ha actualizado exitosamente."
      });
      fetchTeamMembers(); // Refrescar la tabla después de actualizar el miembro del equipo
      setEditModalVisible(false); // Cerrar el modal después de actualizar el miembro del equipo
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al actualizar el miembro del equipo. Por favor, intenta nuevamente."
      });
      console.error("Hubo un error al actualizar el miembro del equipo:", error);
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: ["user", "name"],
      key: "name"
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email"
    },
    {
      title: "Profesión",
      dataIndex: ["profession", "name"],
      key: "profession"
    },
    {
      title: "Salario",
      dataIndex: ["profession", "salary"],
      key: "salary"
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <Button onClick={() => handleEdit(record)}>Editar</Button>
      )
    }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>Miembros del Equipo</h1>
      <Button 
        type="primary" 
        style={{ marginBottom: "1rem", position: "absolute", top: "2rem", right: "2rem" }} 
        onClick={() => setModalVisible(true)}
      >
        Crear Miembro del Equipo
      </Button>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={teamMembers} rowKey="id_tm" />
      </Spin>

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
            <Form.Item label="Profesión" required>
              <Select
                name="profession_id"
                value={formData.profession_id}
                onChange={(value) => handleChange({ target: { name: "profession_id", value } })}
                required
              >
                {professions.map(profession => (
                  <Select.Option key={profession.id_prof} value={profession.id_prof}>
                    {profession.name} - Salario: {profession.salary}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Crear Miembro del Equipo
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>

      <Modal
        title="Editar Miembro del Equipo"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form layout="vertical" onFinish={handleUpdate}>
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
            <Form.Item label="Profesión" required>
              <Select
                name="profession_id"
                value={formData.profession_id}
                onChange={(value) => handleChange({ target: { name: "profession_id", value } })}
                required
              >
                {professions.map(profession => (
                  <Select.Option key={profession.id_prof} value={profession.id_prof}>
                    {profession.name} - Salario: {profession.salary}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Actualizar Miembro del Equipo
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default CrearMiembroEquipo;
