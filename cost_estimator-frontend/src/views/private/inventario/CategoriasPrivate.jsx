import {
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../../axios/axiosInstance";
import { AddIcon } from "../../../components/ui/icons/AddIcon";
import { CheckIcon } from "../../../components/ui/icons/CheckIcon";
import { DeleteIcon } from "../../../components/ui/icons/DeleteIcon";
import { EditIcon } from "../../../components/ui/icons/EditIcon";
import { ModalCUCategorias } from "../../../components/ui/modals/inventario/ModalCUCategorias";
import { useAuthContext } from "../../../context/AuthContext";
import fechaFormateada from "../../../helpers/fechaFormateada";
import { SinDatoBadget } from "../../../components/ui/SinDatoBadget";

export const CategoriasPrivate = () => {
  const { isAuthenticated, storeLogged, userLogged } = useAuthContext();
  const childRef = useRef(null);
  //dataCategory
  const [dataCategory, setDataCategory] = useState([]);
  const [originalDataCategory, setOriginalDataCategory] = useState([]);
  //data users
  const [dataUsers, setDataUsers] = useState([]);

  //loading
  const [loadingTable, setLoadingTable] = useState(false);

  //filtro
  const [valueFiltro, setValueFiltro] = useState("");

  useEffect(() => {
    if (isAuthenticated && storeLogged != null) {
      getCategories();
    }
  }, [isAuthenticated, storeLogged]);

  const getCategories = async () => {
    setLoadingTable(true);
    await axiosInstance
      .get("/api/CombinedQuerysCategoriesUsers/" + storeLogged.id)
      .then((response) => {
        setOriginalDataCategory(response.data.getCategories.original);
        setDataCategory(response.data.getCategories.original);

        setDataUsers(response.data.getUsersShop.original)
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
      title: "Nombre",
      dataIndex: "name_category",
      key: "name_category",
      render: (text) => <p>{text}</p>,
      sorter: {
        compare: (a, b) => a.name_category.localeCompare(b.name_category),
        multiple: 2,
      },
    },
    {
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
    },
    {
      title: "Fecha de creación",
      dataIndex: "created_at_category",
      key: "created_at_category",
      render: (text) => (
        <p>{fechaFormateada(text) + " " + text.substring(11, 19)}</p>
      ),
      sorter: {
        compare: (a, b) =>
          new Date(b.created_at_category) - new Date(a.created_at_category),
        multiple: 4,
      },
    },
    {
      title: "Última edición por",
      dataIndex: "name_updated_at",
      key: "name_updated_at",
      render: (text, record) => (
        <p>
          {text === null ? (
            <SinDatoBadget text="edición" />
          ) : (
            text + " " + record.lastname_updated_at
          )}
        </p>
      ),
      filters: dataUsers.map((data) => ({
        text: data.name + " " + data.lastname,
        value: data.id,
      })),
      onFilter: (value, record) => record.id_updated_at === value,
    },
    {
      title: "Fecha de última de edición",
      dataIndex: "updated_at_category",
      key: "updated_at_category",
      render: (text, record) => (
        <p>
          {text === record.created_at_category ? (
            <SinDatoBadget text="edición" />
          ) : (
            fechaFormateada(text) + " " + text.substring(11, 19)
          )}
        </p>
      ),

      sorter: {
        compare: (a, b) =>
          new Date(b.updated_at_category) - new Date(a.updated_at_category),
        multiple: 4,
      },
    },
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
              Activada
            </span>
          );
        } else {
          return (
            <span
              className="inline-flex items-center gap-x-1.5 py-1.5
             px-3 rounded-full text-xs font-medium bg-red-100 text-red-500"
            >
              Desactivada
            </span>
          );
        }
      },
      filters: [
        {
          text: "Activadas",
          value: "active",
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
      dataIndex: "id_category",
      key: "id_category",
      width: 100,
      render: (id_category, record) => (
        <Space size="middle">
          {/* EDIT */}
          <Tooltip placement="top" className="cursor-pointer" title="Editar">
            <button
              onClick={() =>
                childRef.current.childFunction(id_category, "Edit", [
                  record.id_category,
                  record.name_category,
                ])
              }
            >
              <EditIcon className="size-6 text-yellow-500" />
            </button>
          </Tooltip>

          {record.status === "active" ? (
            <Popconfirm
              title="¿Estás seguro/a que deseas desactivar esta categoría?"
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
                changeStatus(id_category);
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
              title="¿Estás seguro/a que deseas activar esta categoría?"
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
                changeStatus(id_category);
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

  function filterForName(currValue) {
    setValueFiltro(currValue);
    if (currValue === "") {
      setDataCategory(originalDataCategory);
    } else {
      const filteredData = dataCategory.filter((entry) =>
        entry.name_category.toLowerCase().includes(currValue.toLowerCase())
      );
      setDataCategory(filteredData);
    }
  }

  const changeStatus = async (id) => {
    message.loading("Cambiando estado de la categoría...");

    await axiosInstance
      .put("/api/changeStatusCategory/" + id + '/'+ userLogged.id )
      .then((response) => {
        message.destroy();
        message.success(
          `El estado de la categoría se ha cambiado correctamente.`
        );
        getCategories();
      })
      .catch((error) => {
        message.destroy();
        console.log(error);
        message.error(`El estado de la categoría no se ha podido cambiar.`);
      });
  };

  return (
    <>
      <div className="flex justify-between gap-4 mb-12 flex-wrap items-center">
        <h2 className="sora-font text-3xl sm:text-4xl font-bold">Categorías</h2>
        <div className="flex w-full sm:w-fit justify-end ">
          <Button
            color="primary"
            className="h-fit flex items-center gap-2 border-none bg-primary text-white"
            onClick={() => childRef.current.childFunction(null, "Agregar")}
          >
            <AddIcon className="size-5 flex" />
            Agregar Categoría
          </Button>
        </div>
      </div>

      <ModalCUCategorias ref={childRef} reloadTable={getCategories} />

      {/* filtro */}
      <div className="mb-4 flex flex-col max-w-[280px] gap-y-2">
        <label className="text-negro">Buscar por nombre:</label>
        <Input
          placeholder="Ingresa nombre"
          value={valueFiltro}
          onChange={(e) => filterForName(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        dataSource={dataCategory}
        pagination={{
          position: ["topRight", "bottomRight"],
        }}
        loading={loadingTable}
        scroll={{
          x: 1000, // Establece un ancho mínimo de 800px
        }}
      />
    </>
  );
};
