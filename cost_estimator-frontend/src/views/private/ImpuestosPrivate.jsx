import {
  Button,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../axios/axiosInstance";
import { SinDatoBadget } from "../../components/ui/SinDatoBadget";
import { AddIcon } from "../../components/ui/icons/AddIcon";
import { CheckIcon } from "../../components/ui/icons/CheckIcon";
import { DeleteIcon } from "../../components/ui/icons/DeleteIcon";
import { EditIcon } from "../../components/ui/icons/EditIcon";
import { EyeIcon } from "../../components/ui/icons/EyeIcon";
import { ModalCUImpuestos } from "../../components/ui/modals/ModalCUImpuestos";
import { useAuthContext } from "../../context/AuthContext";
import fechaFormateada from "../../helpers/fechaFormateada";
import { AlertWarning } from "../../components/ui/AlertWarning";

export const ImpuestosPrivate = () => {
  const { isAuthenticated, storeLogged, userLogged } = useAuthContext();
  const childRef = useRef(null);
  //data producto
  const [dataImpuestos, setDataImpuestos] = useState([]);
  const [originalDataImpuestos, setOriginalDataImpuestos] = useState([]);
  //data users
  const [dataUsers, setDataUsers] = useState([]);
  //data product more information
  const [dataMoreInformation, setDataMoreInformation] = useState([]);
  const [isModalMoreInformation, setIsModalMoreInformation] = useState(false);

  //loading
  const [loadingTable, setLoadingTable] = useState(false);

  //filtro
  const [valueFiltro, setValueFiltro] = useState("");

  useEffect(() => {
    if (isAuthenticated && storeLogged != null) {
      getImpuestos();
    }
  }, [isAuthenticated, storeLogged]);

  const getImpuestos = async () => {
    setLoadingTable(true);
    await axiosInstance
      .get("/api/CombinedQuerysImpuestosSection/" + storeLogged.id)
      .then((response) => {
        setOriginalDataImpuestos(response.data.getImpuestos.original);
        setDataImpuestos(response.data.getImpuestos.original);

        setDataUsers(response.data.getUsersShop.original);
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
      title: "Impuesto",
      dataIndex: "title_tax_impuesto",
      key: "title_tax_impuesto",
      render: (text) => <p>{text}</p>,
      sorter: {
        compare: (a, b) =>
          a.title_tax_impuesto.localeCompare(b.title_tax_impuesto),
        multiple: 1,
      },
    },
    {
      title: "Porcentaje",
      dataIndex: "percentage",
      key: "percentage",
      render: (text) => <p>{text}</p>,
      sorter: {
        compare: (a, b) => a.percentage - b.percentage,
      },
    },
    /*     {
      title: "Creada por",
      dataIndex: "name_created_at",
      key: "name_created_at",
      render: (text, record) => (
        <p>{text + " " + record.lastname_created_at}</p>
      ),
      filters: dataUsers.map((data) => ({
        text: data.name + " " + data.lastname,
        value: data.id,
      })),
      onFilter: (value, record) => record.id_created_at === value,
    }, */
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
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
      onFilter: (value, record) => String(record.status) === value,
    },
    {
      title: "Acciones",
      dataIndex: "id_impuesto",
      key: "id_impuesto",
      width: 100,
      render: (id_impuesto, record) => (
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
                  record.id_impuesto,
                  record.title_tax_impuesto,
                  record.percentage,
                  record.created_at_impuesto,
                  record.updated_at_impuesto,
                  record.name_created_at,
                  record.lastname_created_at,
                  record.name_updated_at,
                  record.lastname_updated_at,
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
                childRef.current.childFunction(id_impuesto, "Edit", [
                  record.title_tax_impuesto,
                  record.percentage,
                ])
              }
            >
              <EditIcon className="size-6 text-yellow-500" />
            </button>
          </Tooltip>
          {record.status === "active" ? (
            <Popconfirm
              title="¿Estás seguro/a que deseas desactivar este impuesto?"
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
                changeStatus(id_impuesto);
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
              title="¿Estás seguro/a que deseas activar este impuesto?"
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
                changeStatus(id_impuesto);
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

  function filterKeyWord(currValue) {
    setValueFiltro(currValue);
    if (currValue === "") {
      setDataImpuestos(originalDataImpuestos);
    } else {
      const filteredData = originalDataImpuestos.filter((entry) => {
        const title_tax_impuesto = entry.title_tax_impuesto;

        return title_tax_impuesto.includes(currValue.toLowerCase());
      });
      setDataImpuestos(filteredData);
    }
  }

  const changeStatus = async (id) => {
    message.loading("Cambiando estado del impuesto...");

    await axiosInstance
      .put("/api/changeStatusImpuesto/" + id + "/" + userLogged.id)
      .then((response) => {
        message.destroy();
        message.success(`El estado del impuesto se ha cambiado correctamente.`);
        getImpuestos();
      })
      .catch((error) => {
        message.destroy();
        console.log(error);
        message.error(`El estado del impuesto no se ha podido cambiar.`);
      });
  };

  const showModalMoreInformation = (data) => {
    const dataTemp = {
      title_tax_impuesto: data[1],
      percentage: data[2],
      created_at_impuesto: data[3],
      updated_at_impuesto: data[4],
      name_created_at: data[5],
      lastname_created_at: data[6],
      name_updated_at: data[7],
      lastname_updated_at: data[8],
    };
    setDataMoreInformation(dataTemp);
    setIsModalMoreInformation(true);
  };

  return (
    <>
      <div className="flex justify-between gap-4 mb-12 flex-wrap items-center">
        <h2 className="sora-font text-3xl sm:text-4xl font-bold">Impuestos</h2>
        <div className="flex w-full sm:w-fit justify-end ">
          <Button
            color="primary"
            className="h-fit items-center flex gap-2 border-none bg-primary text-white"
            onClick={() => childRef.current.childFunction(null, "Agregar")}
          >
            <AddIcon className="size-5 flex" />
            Agregar Impuesto
          </Button>
        </div>
      </div>

      <div className="max-w-[430px] mb-6">
        <AlertWarning
          titulo="¡IMPORTANTE!"
          descripcion="Todos los impuestos que agregues se consolidarán en un solo cargo durante la venta."
          noShowAgain={true}
        />
      </div>

      <ModalCUImpuestos ref={childRef} reloadTable={getImpuestos} />

      {/* filtro */}
      <div className="mb-4 flex flex-col max-w-[280px] gap-y-2">
        <label className="text-negro">Buscar por título de impuesto:</label>
        <Input
          placeholder="Ingresa título de impuesto"
          value={valueFiltro}
          onChange={(e) => filterKeyWord(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        dataSource={dataImpuestos}
        pagination={{
          position: ["topRight", "bottomRight"],
        }}
        loading={loadingTable}
        scroll={{
          x: 1000, // Establece un ancho mínimo de 800px
        }}
      />

      {/* More information */}
      <Modal
        title="Más Información - Datos del Impuesto"
        open={isModalMoreInformation}
        footer={
          <Button onClick={() => setIsModalMoreInformation(false)}>
            Cerrar
          </Button>
        }
        onCancel={() => setIsModalMoreInformation(false)}
      >
        <div className="mt-3">
          <label>Título de impuesto</label>
          <p>{dataMoreInformation.title_tax_impuesto}</p>
        </div>
        <div className="mt-3">
          <label>Tasa del Impuesto (%)</label>
          <p>{dataMoreInformation.percentage}</p>
        </div>
        <div className="mt-3">
          <label>Creado por:</label>
          <p>
            {dataMoreInformation.name_created_at +
              " " +
              dataMoreInformation.lastname_created_at}
          </p>
        </div>
        <div className="mt-3">
          <label>Fecha de creación:</label>
          <p>
            {dataMoreInformation.created_at_impuesto &&
              fechaFormateada(dataMoreInformation.created_at_impuesto) +
                " " +
                dataMoreInformation.created_at_impuesto.substring(11, 19)}
          </p>
        </div>
        <div className="mt-3">
          <label>Última edición por:</label>
          <p>
            {dataMoreInformation.name_updated_at !== null ? (
              dataMoreInformation.name_updated_at +
              " " +
              dataMoreInformation.lastname_updated_at
            ) : (
              <SinDatoBadget text="edición" />
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Fecha de última edición:</label>
          <p>
            {dataMoreInformation.updated_at_impuesto ? (
              dataMoreInformation.updated_at_impuesto ===
              dataMoreInformation.created_at_impuesto ? (
                <SinDatoBadget text="edición" />
              ) : (
                fechaFormateada(dataMoreInformation.updated_at_impuesto) +
                " " +
                dataMoreInformation.updated_at_impuesto.substring(11, 19)
              )
            ) : null}
          </p>
        </div>
      </Modal>
    </>
  );
};
