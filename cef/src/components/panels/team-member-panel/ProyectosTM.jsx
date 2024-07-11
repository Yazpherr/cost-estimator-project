import { useState, useEffect } from "react";
import { Table, Spin, notification } from "antd";
import { getTeamMemberProjects } from "../../../services/api"; // Ruta correcta al archivo api

const ProyectosTM = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getTeamMemberProjects();
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
    fetchProjects();
  }, []);

  const columns = [
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
      title: "Fecha de Inicio",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "Fecha de Finalización",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
    }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <h1>Bienvenido, Project Owner</h1>
      <p>Esta es la página de Proyectos.</p>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={projects} rowKey="id" />
      </Spin>
    </div>
  );
};

export default ProyectosTM;
