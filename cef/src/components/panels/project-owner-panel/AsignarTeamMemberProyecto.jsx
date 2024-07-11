import { useState, useEffect } from "react";
import { Form, Button, Spin, notification, Modal, Select } from "antd";
import { assignTeamMemberToProject, getAllTeamMembers, getProductOwnerProjects } from "../../../services/api"; // Ruta correcta al archivo api

const AsignarTeamMemberProyecto = () => {
  const [formData, setFormData] = useState({
    project_id: "",
    team_member_id: ""
  });
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [projects, setProjects] = useState([]);

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

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getProductOwnerProjects();
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al obtener los proyectos. Por favor, intenta nuevamente."
      });
    }
  };

  useEffect(() => {
    fetchTeamMembers();
    fetchProjects();
  }, []);

  const handleSelectChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await assignTeamMemberToProject({
        project_id: formData.project_id,
        team_member_id: formData.team_member_id
      });
      setLoading(false);
      notification.success({
        message: "Miembro asignado",
        description: "El miembro del equipo ha sido asignado exitosamente al proyecto."
      });
      setModalVisible(false); // Cerrar el modal después de asignar el miembro del equipo
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al asignar el miembro del equipo al proyecto. Por favor, intenta nuevamente."
      });
      console.error("Hubo un error al asignar el miembro del equipo al proyecto:", error);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>Bienvenido, Project Owner</h1>
      <Button 
        type="primary" 
        style={{ marginBottom: "1rem", position: "absolute", top: "2rem", right: "2rem" }} 
        onClick={() => setModalVisible(true)}
      >
        Asignar Miembro al Proyecto
      </Button>
      <Modal
        title="Asignar Miembro al Proyecto"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form layout="vertical" onSubmit={handleSubmit}>
            <Form.Item label="Proyecto" required>
              <Select
                name="project_id"
                onChange={(value) => handleSelectChange(value, 'project_id')}
                value={formData.project_id}
                required
              >
                {projects.map(project => (
                  <Select.Option key={project.id_pro} value={project.id_pro}>
                    {project.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Miembro del Equipo" required>
              <Select
                name="team_member_id"
                onChange={(value) => handleSelectChange(value, 'team_member_id')}
                value={formData.team_member_id}
                required
              >
                {teamMembers.map(member => (
                  <Select.Option key={member.id_tm} value={member.id_tm}>
                    {member.user.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Asignar Miembro
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default AsignarTeamMemberProyecto;
