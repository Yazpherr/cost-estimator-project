import { useState, useEffect } from "react";
import { Form, Input, Button, Spin, notification, Modal, Table } from "antd";
import { createProfession, getAllProfessions, updateProfession } from "../../../services/api"; // Ruta correcta al archivo api

const Profesion = () => {
  const [formData, setFormData] = useState({
    name: "",
    salary: ""
  });
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [professions, setProfessions] = useState([]);
  const [currentProfession, setCurrentProfession] = useState(null);

  const fetchProfessions = async () => {
    setLoading(true);
    try {
      const response = await getAllProfessions();
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
    fetchProfessions();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createProfession(formData);
      setLoading(false);
      notification.success({
        message: "Profesión creada",
        description: "La profesión se ha creado exitosamente."
      });
      setProfessions([...professions, response.data]); // Actualizar la lista de profesiones
      setModalVisible(false); // Cerrar el modal después de crear la profesión
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al crear la profesión. Por favor, intenta nuevamente."
      });
      console.error("Hubo un error al crear la profesión:", error);
    }
  };

  const handleEdit = (record) => {
    setCurrentProfession(record);
    setFormData({
      name: record.name,
      salary: record.salary
    });
    setEditModalVisible(true);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await updateProfession(currentProfession.id_prof, formData);
      setLoading(false);
      notification.success({
        message: "Profesión actualizada",
        description: "La profesión se ha actualizado exitosamente."
      });
      setProfessions(professions.map(prof => (prof.id_prof === currentProfession.id_prof ? response.data : prof)));
      setEditModalVisible(false); // Cerrar el modal después de actualizar la profesión
    } catch (error) {
      setLoading(false);
      notification.error({
        message: "Error",
        description: "Hubo un error al actualizar la profesión. Por favor, intenta nuevamente."
      });
      console.error("Hubo un error al actualizar la profesión:", error);
    }
  };

  const columns = [
    {
      title: "Profesión",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Salario UF",
      dataIndex: "salary",
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
      <h1>Bienvenido Admin</h1>
      <Button 
        type="primary" 
        style={{ marginBottom: "1rem", position: "absolute", top: "2rem", right: "2rem" }} 
        onClick={() => setModalVisible(true)}
      >
        Crear Profesión
      </Button>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={professions} rowKey="id_prof" />
      </Spin>
      <Modal
        title="Crear Profesión"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Nombre" name="name" rules={[{ required: true, message: "Por favor, ingrese el nombre" }]}>
              <Input type="text" value={formData.name} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Salario" name="salary" rules={[{ required: true, message: "Por favor, ingrese el salario" }]}>
              <Input type="number" value={formData.salary} onChange={handleChange} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Crear Profesión
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      <Modal
        title="Editar Profesión"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Spin spinning={loading}>
          <Form layout="vertical" onFinish={handleUpdate}>
            <Form.Item label="Nombre" name="name" rules={[{ required: true, message: "Por favor, ingrese el nombre" }]}>
              <Input type="text" value={formData.name} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Salario" name="salary" rules={[{ required: true, message: "Por favor, ingrese el salario" }]}>
              <Input type="number" value={formData.salary} onChange={handleChange} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Actualizar Profesión
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default Profesion;
