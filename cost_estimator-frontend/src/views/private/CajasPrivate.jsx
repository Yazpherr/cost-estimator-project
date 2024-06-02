import {
  Button,
  Dropdown,
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
import { ModalCUCajas } from "../../components/ui/modals/ModalCUCajas";
import { MoreVertical } from "../../components/ui/icons/MoreVertical";
import { UserMenos } from "../../components/ui/icons/UserMenos";

export const CajasPrivate = () => {
  const { isAuthenticated, storeLogged, userLogged } = useAuthContext();
  const childRef = useRef(null);
  //data producto
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  //data product more information
  const [dataMoreInformation, setDataMoreInformation] = useState([]);
  const [isModalMoreInformation, setIsModalMoreInformation] = useState(false);

  //loading
  const [loadingTable, setLoadingTable] = useState(false);

  //filtro
  const [valueFiltro, setValueFiltro] = useState("");

  useEffect(() => {
    if (isAuthenticated && storeLogged != null) {
      getBoxes();
    }
  }, [isAuthenticated, storeLogged]);

  const getBoxes = async () => {
    setLoadingTable(true);
    await axiosInstance
      .get("/api/getBoxes/" + storeLogged.id)
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
      title: "N° de Caja",
      dataIndex: "title_box",
      key: "title_box",
      render: (text) => <p>{text}</p>,
      sorter: {
        compare: (a, b) => a.title_box.localeCompare(b.title_box),
        multiple: 1,
      },
    },
    {
      title: "Ocupada por",
      dataIndex: "name_occupied_by",
      key: "name_occupied_by",
      render: (text, record) => (
        <p>
          {text === null ? (
            <SinDatoBadget text="uso" />
          ) : (
            text + " " + record.lastname_occupied_by
          )}
        </p>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (text) => {
        if (text === "desactive") {
          return (
            <span
              className="inline-flex items-center gap-x-1.5 py-1.5
             px-3 rounded-full text-xs font-medium bg-red-100 text-red-500"
            >
              Desactivada
            </span>
          );
        } else if (text === "busy") {
          return (
            <span
              className="inline-flex items-center gap-x-1.5 py-1.5
             px-3 rounded-full text-xs font-medium bg-yellow-200 text-yellow-700"
            >
              Ocupada
            </span>
          );
        }
        if (text === "available") {
          return (
            <span
              className="inline-flex items-center gap-x-1.5
             py-1.5 px-3 rounded-full text-xs font-medium
             bg-badged text-primary"
            >
              Disponible
            </span>
          );
        }
      },
      filters: [
        {
          text: "Ocupadas",
          value: "busy",
        },
        {
          text: "Activadas",
          value: "available",
        },
        {
          text: "Desactivadas",
          value: "desactive",
        },
      ],
      onFilter: (value, record) => String(record.status) === value,
    },
    {
      title: "Acciones",
      dataIndex: "id_box",
      key: "id_box",
      width: 100,
      render: (id_box, record) => (
        <Dropdown
          placement="top"
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <button
                    className="w-full flex gap-2 items-center"
                    onClick={() =>
                      childRef.current.childFunction(id_box, "Edit", [
                        record.title_box,
                      ])
                    }
                  >
                    <EditIcon className="size-5 text-yellow-500" />
                    <span>Editar</span>
                  </button>
                ),
              },
              record.status === "busy" && {
                key: "3",
                label: (
                  <button
                    className="flex gap-2 items-center"
                    onClick={() => {
                      vacateBox(id_box);
                    }}
                  >
                    <UserMenos className="size-5 text-plomo" />
                    <span>Desocupar</span>
                  </button>
                ),
              },

              record.status !== "busy" && {
                key: "2",
                label:
                  record.status === "desactive" ? (
                    <button
                      onClick={() => {
                        changeStatus(id_box);
                      }}
                      className="flex gap-2 items-center"
                    >
                      <CheckIcon className="size-5 text-primary" />
                      <span className="text-primary">Habilitar</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        changeStatus(id_box);
                      }}
                      className="flex gap-2 items-center"
                    >
                    <DeleteIcon className="size-5 text-red-500" />
                      <span className="text-red-500">Desactivar</span>
                    </button>
                  ),
              },
            ],
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <MoreVertical className="size-6 text-negro" />
          </a>
        </Dropdown>
      ),
    },
  ];

  function filterKeyWord(currValue) {
    setValueFiltro(currValue);
    if (currValue === "") {
      setData(originalData);
    } else {
      const filteredData = originalData.filter((entry) => {
        const title_box = entry.title_box;

        return title_box.includes(currValue.toLowerCase());
      });
      setData(filteredData);
    }
  }

  const changeStatus = async (id) => {
    message.loading("Cambiando estado de la caja...");

    await axiosInstance
      .put("/api/changeStatusBox/" + id + "/" + userLogged.id)
      .then((response) => {
        message.destroy();
        message.success(`El estado de la caja se ha cambiado correctamente.`);
        getBoxes();
      })
      .catch((error) => {
        message.destroy();
        console.log(error);
        message.error(`El estado de la caja no se ha podido cambiar.`);
      });
  };

  const vacateBox = async (id) => {
    message.loading("Desocupando la caja...");

    await axiosInstance
      .put("/api/vacateBox/" + id + "/" + userLogged.id)
      .then((response) => {
        message.destroy();
        message.success(`Se ha desocupado la caja correctamente.`);
        getBoxes();
      })
      .catch((error) => {
        message.destroy();
        console.log(error);
        message.error(`No se ha podido desocupar la caja.`);
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
        <h2 className="sora-font text-3xl sm:text-4xl font-bold">Cajas</h2>
        <div className="flex w-full sm:w-fit justify-end ">
          <Button
            color="primary"
            className="h-fit items-center flex gap-2 border-none bg-primary text-white"
            onClick={() => childRef.current.childFunction(null, "Agregar")}
          >
            <AddIcon className="size-5 flex" />
            Agregar Caja
          </Button>
        </div>
      </div>


      <ModalCUCajas ref={childRef} reloadTable={getBoxes} />

      {/* filtro */}
      <div className="mb-4 flex flex-col max-w-[280px] gap-y-2">
        <label className="text-negro">Buscar por N° de caja:</label>
        <Input
          placeholder="Ingresa número de caja"
          value={valueFiltro}
          onChange={(e) => filterKeyWord(e.target.value)}
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
