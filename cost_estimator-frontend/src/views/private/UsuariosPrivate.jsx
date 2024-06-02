import {
  Button,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  message
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../axios/axiosInstance";
import { SinDatoBadget } from "../../components/ui/SinDatoBadget";
import { CheckIcon } from "../../components/ui/icons/CheckIcon";
import { DeleteIcon } from "../../components/ui/icons/DeleteIcon";
import { EditIcon } from "../../components/ui/icons/EditIcon";
import { EmailIcon } from "../../components/ui/icons/EmailIcon";
import { EyeIcon } from "../../components/ui/icons/EyeIcon";
import { useAuthContext } from "../../context/AuthContext";
import { AddIcon } from "./../../components/ui/icons/AddIcon";
import { WhatsappIcon } from "./../../components/ui/icons/WhatsappIcon";
import { ModalCUUsuarios } from "./../../components/ui/modals/ModalCUUsuarios";
import fechaFormateada from "./../../helpers/fechaFormateada";

export const UsuariosPrivate = () => {
  const { isAuthenticated, storeLogged } = useAuthContext();
  const childRef = useRef(null);
  //data
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  //loading
  const [loadingTable, setLoadingTable] = useState(false);
  //data more information
  const [dataUserMoreInformation, setDataUserMoreInformation] = useState([]);
  const [isShowModalUserMoreInformation, setIsShowModalUserMoreInformation] =
    useState(false);
  //filtro
  const [valueFiltro, setValueFiltro] = useState("");

  useEffect(() => {
    if (isAuthenticated && storeLogged != null) {
      getUsersShops();
    }
  }, [isAuthenticated, storeLogged]);

  const getUsersShops = async () => {
    setLoadingTable(true);
    await axiosInstance
      .get("/api/getUsersShop/" + storeLogged.id)
      .then((response) => {
        setOriginalData(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        setLoadingTable(false);
      });
  };

  const columns = [
    {
      title: "RUT o DNI",
      dataIndex: "dni",
      key: "dni",
      render: (text) => <p>{text}</p>,
      sorter: {
        compare: (a, b) => a.dni.localeCompare(b.dni),
        multiple: 1,
      },
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 2,
      },
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
      render: (text) => <p>{text}</p>,
      sorter: {
        compare: (a, b) => a.lastname.localeCompare(b.lastname),
        multiple: 3,
      },
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      render: (text) => {
        if (text === "admin") {
          return (
            <span
              className="inline-flex items-center gap-x-1.5
           py-1.5 px-3 rounded-full text-xs font-medium
           bg-yellow-200 text-yellow-700"
            >
              Administrador
            </span>
          );
        } else if (text === "vendedor") {
          return (
            <span
              className="inline-flex items-center gap-x-1.5
           py-1.5 px-3 rounded-full text-xs font-medium
           bg-orange-200 text-orange-700"
            >
              Vendedor
            </span>
          );
        } else if (text === "ventas") {
          return (
            <span
              className="inline-flex items-center gap-x-1.5
           py-1.5 px-3 rounded-full text-xs font-medium
           bg-lime-200 text-lime-700"
            >
              Encargado de Ventas
            </span>
          );
        } else if (text === "cajero") {
          return (
            <span
              className="inline-flex items-center gap-x-1.5
           py-1.5 px-3 rounded-full text-xs font-medium
           bg-purple-200 text-purple-700"
            >
              Cajero
            </span>
          );
        }
      },
      filters: [
        {
          value: "vendedor",
          text: "Vendedor",
        },
        {
          text: "Administrador",
          value: "admin",
        },
      ],
      onFilter: (value, record) => String(record.role) === value,
    },
    {
      title: "Fecha de creación",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <p>{fechaFormateada(text)}</p>,
      sorter: {
        compare: (a, b) => new Date(b.created_at) - new Date(a.created_at),
        multiple: 4,
      },
    },
    {
      title: "Estado",
      dataIndex: "active",
      key: "active",
      width: 130,
      render: (text) => {
        if (text === "active") {
          return (
            <span
              className="inline-flex items-center gap-x-1.5
             py-1.5 px-3 rounded-full text-xs font-medium
             bg-badged text-primary"
            >
              Activado
            </span>
          );
        } else {
          return (
            <span
              className="inline-flex items-center gap-x-1.5 py-1.5
             px-3 rounded-full text-xs font-medium bg-red-100 text-red-500"
            >
              Desactivado
            </span>
          );
        }
      },
      filters: [
        {
          text: "Activados",
          value: "active",
        },
        {
          text: "Desactivados",
          value: "desactive",
        },
      ],
      onFilter: (value, record) => String(record.active) === value,
    },
    {
      title: "Acciones",
      dataIndex: "id",
      key: "id",

      width: 100,
      render: (id, record) => (
        <Space size="middle">
          {/*MAS INFORMACION*/}
          <Tooltip
            placement="top"
            className="cursor-pointer"
            title="Ver más información"
          >
            <button
              onClick={() =>
                showModalMoreInformation([
                  record.dni,
                  record.name,
                  record.lastname,
                  record.role,
                  record.email,
                  record.country,
                  record.region,
                  record.comuna,
                  record.phone,
                ])
              }
            >
              <EyeIcon className="size-6" />
            </button>
          </Tooltip>

          {/* EDIT */}
          <Tooltip placement="top" className="cursor-pointer" title="Editar">
            <button
              onClick={() =>
                childRef.current.childFunction(id, "Edit", [
                  record.dni,
                  record.name,
                  record.lastname,
                  record.role,
                  record.email,
                  record.country,
                  record.region,
                  record.comuna,
                  record.phone,
                ])
              }
            >
              <EditIcon className="size-6 text-yellow-500" />
            </button>
          </Tooltip>

          {record.active === "active" ? (
            <Popconfirm
              title="¿Estás seguro/a que deseas desactivar a este usuario/a?"
              okText="Sí, desactivar"
              cancelText="No, cancelar"
              cancelButtonProps={{
                style: { borderRadius: 12 },
              }}
              okButtonProps={{
                style: {
                  backgroundColor: "#ef4444",
                  border: 0,
                },
              }}
              onConfirm={() => {
                changeStatus(id);
              }}
            >
              <Tooltip
                placement="left"
                className="cursor-pointer"
                title="Desactivar"
              >
                <button>
                  <DeleteIcon className="size-6 text-red-500" />
                </button>
              </Tooltip>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="¿Estás seguro/a que deseas activar a este usuario/a?"
              okText="Sí, activar"
              cancelText="No, cancelar"
              cancelButtonProps={{
                style: { borderRadius: 12 },
              }}
              okButtonProps={{
                style: {
                  backgroundColor: "#14A800",
                  border: 0,
                },
              }}
              onConfirm={() => {
                changeStatus(id);
              }}
            >
              <Tooltip
                placement="left"
                className="cursor-pointer"
                title="Activar"
              >
                <button>
                  <CheckIcon className="size-6 text-primary" />
                </button>
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const showModalMoreInformation = (data) => {
    const userData = {
      dni: data[0],
      name: data[1],
      lastname: data[2],
      role: data[3],
      email: data[4],
      country: data[5],
      region: data[6],
      comuna: data[7],
      phone: data[8],
    };
    setDataUserMoreInformation(userData);
    setIsShowModalUserMoreInformation(true);
  };

  function filtrarPorPalabraClave(currValue) {
    setValueFiltro(currValue);
    if (currValue === "") {
      setData(originalData);
    } else {
      const filteredData = data.filter(
        (entry) =>
          entry.name.toLowerCase().includes(currValue.toLowerCase()) ||
          entry.lastname.toLowerCase().includes(currValue.toLowerCase()) ||
          entry.dni.toLowerCase().includes(currValue.toLowerCase()) ||
          entry.role.toLowerCase().includes(currValue.toLowerCase())
      );
      setData(filteredData);
    }
  }

  const changeStatus = async (id) => {
    message.loading("Cambiando estado del usuario/a...");

    await axiosInstance
      .put("/api/changeStatusUser/" + id)
      .then((response) => {
        message.destroy();
        message.success(`El estado del usuario/a se ha cambiado correctamente.`);
        getUsersShops();
      })
      .catch((error) => {
        message.destroy();
        console.log(error);
        message.error(`El estado del usuario/a no se ha podido cambiar.`);
      });
  };

  return (
    <>
      <div className="flex justify-between gap-4 mb-12 flex-wrap items-center">
        <h2 className="sora-font text-3xl sm:text-4xl font-bold">Usuarios</h2>
        <div className="flex w-full sm:w-fit justify-end ">
          <Button
            color="primary"
            className="h-fit items-center  flex gap-2 border-none bg-primary text-white"
            onClick={() => childRef.current.childFunction(null, "Agregar")}
          >
            <AddIcon className="size-5 flex" />
            Agregar Usuario
          </Button>
        </div>
      </div>

      <ModalCUUsuarios ref={childRef} reloadTable={getUsersShops} />

      {/* filtro */}
      <div className="mb-4 flex flex-col max-w-[280px] gap-y-2">
        <label className="text-negro">Buscar por palabra clave:</label>
        <Input
          placeholder="Ingresa algún valor"
          value={valueFiltro}
          onChange={(e) => filtrarPorPalabraClave(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["topRight", "bottomRight"],
        }}
        loading={loadingTable}
        scroll={{
          x: 1000, // Establece un ancho mínimo de 800px
        }}
      />

      <Modal
        title="Más Información - Datos de usuario"
        open={isShowModalUserMoreInformation}
        footer={
          <Button onClick={() => setIsShowModalUserMoreInformation(false)}>
            Cerrar
          </Button>
        }
        onCancel={() => setIsShowModalUserMoreInformation(false)}
      >
        <div className="mt-3">
          <label>RUT/DNI</label>
          <p>{dataUserMoreInformation.dni}</p>
        </div>
        <div className="mt-3">
          <label>Nombre</label>
          <p>{dataUserMoreInformation.name}</p>
        </div>
        <div className="mt-3">
          <label>Apellido</label>
          <p>{dataUserMoreInformation.lastname}</p>
        </div>
        <div className="mt-3">
          <label>Rol</label>
          <p>{dataUserMoreInformation.role}</p>
        </div>
        <div className="mt-3">
          <label>Correo electrónico</label>
          {dataUserMoreInformation.email !== "" ? (
            <a
              href={`mailto:${dataUserMoreInformation.email}`}
              target="_blank"
              className="flex items-center text-primary hover:text-green-500 gap-1"
            >
              <EmailIcon className="size-6" />
              {dataUserMoreInformation.email}
            </a>
          ) : (
            <div>
              <SinDatoBadget text="correo electrónico" />
            </div>
          )}
        </div>
        <div className="mt-3">
          <label>Teléfono</label>
          {dataUserMoreInformation.phone !== "" ? (
            <a
              href={`https://api.whatsapp.com/send/?phone=%2B${dataUserMoreInformation.phone}`}
              target="_blank"
              className="flex items-center text-primary hover:text-green-500 gap-1"
            >
              <WhatsappIcon className="size-6" />
              {dataUserMoreInformation.phone}
            </a>
          ) : (
            <div>
              <SinDatoBadget text="teléfono" />
            </div>
          )}
        </div>
        <div className="mt-3">
          <label>País</label>
          <p>
            {dataUserMoreInformation.country === null
              ? "Sin país"
              : dataUserMoreInformation.country &&
                (dataUserMoreInformation.country.includes("|")
                  ? dataUserMoreInformation.country.substring(
                      dataUserMoreInformation.country.indexOf("|") + 1
                    )
                  : dataUserMoreInformation.country)}
          </p>
        </div>
        <div className="mt-3">
          <label>Región</label>
          <p>
            {" "}
            {dataUserMoreInformation.region === null
              ? "Sin región"
              : dataUserMoreInformation.region &&
                (dataUserMoreInformation.region.includes("|")
                  ? dataUserMoreInformation.region.substring(
                      dataUserMoreInformation.region.indexOf("|") + 1
                    )
                  : dataUserMoreInformation.region)}
          </p>
        </div>
        <div className="mt-3">
          <label>Comuna</label>
          <p>
            {" "}
            {dataUserMoreInformation.comuna === null
              ? "Sin comuna"
              : dataUserMoreInformation.comuna &&
                (dataUserMoreInformation.comuna.includes("|")
                  ? dataUserMoreInformation.comuna.substring(
                      dataUserMoreInformation.comuna.indexOf("|") + 1
                    )
                  : dataUserMoreInformation.comuna)}
          </p>
        </div>
      </Modal>
    </>
  );
};
