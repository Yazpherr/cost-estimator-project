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
import { ModalCUClientes } from "../../components/ui/modals/ModalCUClientes";
import { useAuthContext } from "../../context/AuthContext";
import fechaFormateada from "../../helpers/fechaFormateada";
import { formatPrecioCLP } from "../../helpers/formatPrecioCLP";
import { WhatsappIcon } from "../../components/ui/icons/WhatsappIcon";
import { EmailIcon } from "../../components/ui/icons/EmailIcon";

export const ClientesPrivate = () => {
  const { isAuthenticated, storeLogged, userLogged } = useAuthContext();
  const childRef = useRef(null);
  //data producto
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  //modal contact
  const [isModalContact, setIsModalContact] = useState(false);
  const [dataContact, setDataContact] = useState([]);
  //data product more information
  const [dataMoreInformation, setDataMoreInformation] = useState([]);
  const [isModalMoreInformation, setIsModalMoreInformation] = useState(false);

  //loading
  const [loadingTable, setLoadingTable] = useState(false);

  //filtro
  const [valueFiltro, setValueFiltro] = useState("");

  useEffect(() => {
    if (isAuthenticated && storeLogged != null) {
      getClients();
    }
  }, [isAuthenticated, storeLogged]);

  const getClients = async () => {
    setLoadingTable(true);
    await axiosInstance
      .get("/api/getClients/" + storeLogged.id)
      .then((response) => {
        setData(response.data);
        setOriginalData(response.data);
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
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
      render: (text) => <p>{text}</p>,
      sorter: {
        compare: (a, b) => a.dni.localeCompare(b.sku),
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
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
      render: (text) =>
        text !== null ? (
          <a
            href={`https://api.whatsapp.com/send/?phone=%2B${text}`}
            target="_blank"
            className="flex items-center text-primary hover:text-green-500 gap-1"
          >
            <WhatsappIcon className="size-6" />
            {text}
          </a>
        ) : (
          <SinDatoBadget text="teléfono" />
        ),
    },
    {
      title: "Contacto",
      dataIndex: "direccion",
      key: "direccion",
      render: (text, record) => (
        <button
          onClick={() => showModalContact([record.email, record.address])}
          className="bg-[#F4F4F5] rounded-xl flex gap-2 items-center p-2"
        >
          <EyeIcon className="size-6 text-[#1F1F1F]" /> Ver más
        </button>
      ),
    },
    {
      title: "Acciones",
      dataIndex: "id_client",
      key: "id_client",
      width: 100,
      render: (id_client, record) => (
        <Space size="middle">
          {/* EDIT */}
          <Tooltip placement="top" className="cursor-pointer" title="Editar">
            <button
              onClick={() =>
                childRef.current.childFunction(id_client, "Edit", [
                  record.dni,
                  record.name,
                  record.lastname,
                  record.email,
                  record.address,
                  record.phone,
                ])
              }
            >
              <EditIcon className="size-6 text-yellow-500" />
            </button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  function filterKeyWord(currValue) {
    setValueFiltro(currValue);
    if (currValue === "") {
      setData(originalData);
    } else {
      const filteredData = data.filter(
        (entry) =>
          entry.name.toLowerCase().includes(currValue.toLowerCase()) ||
          entry.lastname.toLowerCase().includes(currValue.toLowerCase()) ||
          entry.dni.toLowerCase().includes(currValue.toLowerCase())
      );
      setData(filteredData);
    }
  }

  const showModalContact = (data) => {
    setIsModalContact(true);

    const contactData = {
      email: data[0],
      address: data[1],
    };

    setDataContact(contactData);
  };

  return (
    <>
      <div className="flex justify-between gap-4 mb-12 flex-wrap items-center">
        <h2 className="sora-font text-3xl sm:text-4xl font-bold">Clientes</h2>
        <div className="flex w-full sm:w-fit justify-end ">
          <Button
            color="primary"
            className="h-fit flex gap-2 items-center border-none bg-primary text-white"
            onClick={() => childRef.current.childFunction(null, "Agregar")}
          >
            <AddIcon className="size-5 flex" />
            Agregar Cliente
          </Button>
        </div>
      </div>

      <ModalCUClientes ref={childRef} reloadTable={getClients} />

      {/* filtro */}
      <div className="mb-4 flex flex-col max-w-[280px] gap-y-2">
        <label className="text-negro">Buscar por palabra clave:</label>
        <Input
          placeholder="Ingresa palabra clave"
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

      {/* Modal Contact */}
      <Modal
        title="Contacto"
        open={isModalContact}
        footer={
          <Button onClick={() => setIsModalContact(false)}>Cerrar</Button>
        }
        onCancel={() => setIsModalContact(false)}
      >
        <div className="mt-3">
          <label>Correo electrónico</label>
          {dataContact.email !== null ? (
            <a
              href={`mailto:${dataContact.email}`}
              target="_blank"
              className="flex items-center text-primary hover:text-green-500 gap-1"
            >
              <EmailIcon className="size-6" />
              {dataContact.email}
            </a>
          ) : (
            <div>
              <SinDatoBadget text="correo electrónico" />
            </div>
          )}
        </div>
        <div className="mt-3">
          <label>Dirección</label>
          {dataContact.address !== null ? (
            <p>{dataContact.address}</p>
          ) : (
            <div>
              <SinDatoBadget text="dirección" />
            </div>
          )}
        </div>
      </Modal>

      {/* More information */}
      <Modal
        title="Más Información - Datos de producto"
        open={isModalMoreInformation}
        footer={
          <Button onClick={() => setIsModalMoreInformation(false)}>
            Cerrar
          </Button>
        }
        onCancel={() => setIsModalMoreInformation(false)}
      >
        <div className="mt-3">
          <label>Código de barra</label>
          <p>{dataMoreInformation.barcode}</p>
        </div>
        <div className="mt-3">
          <label>SKU</label>
          <p>
            {dataMoreInformation.sku === null ? (
              <SinDatoBadget text="SKU" />
            ) : (
              dataMoreInformation.sku
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Nombre de producto</label>
          <p>{dataMoreInformation.name_product}</p>
        </div>
        <div className="mt-3">
          <label>Detalles</label>
          <p>
            {dataMoreInformation.details === null ? (
              <SinDatoBadget text="detalles" />
            ) : (
              dataMoreInformation.details
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Marca</label>
          <p>
            {dataMoreInformation.brand === null ? (
              <SinDatoBadget text="marca" />
            ) : (
              dataMoreInformation.brand
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Modelo</label>
          <p>
            {dataMoreInformation.model === null ? (
              <SinDatoBadget text="modelo" />
            ) : (
              dataMoreInformation.model
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Precio compra</label>
          <p>
            {dataMoreInformation.purchase_price === null ? (
              <SinDatoBadget text="precio compra" />
            ) : (
              dataMoreInformation.purchase_price
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Precio venta</label>
          <p>
            {dataMoreInformation.sale_price &&
              formatPrecioCLP(dataMoreInformation.sale_price)}
          </p>
        </div>
        <div className="mt-3">
          <label>Precio Oferta</label>
          <p>
            {dataMoreInformation.is_offer_price &&
            dataMoreInformation.is_offer_price === 1 ? (
              formatPrecioCLP(dataMoreInformation.offer_price)
            ) : (
              <SinDatoBadget text="precio oferta" />
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Stock</label>
          <p>{dataMoreInformation.quantity}</p>
        </div>
        <div className="mt-3">
          <label>Stock crítico</label>
          <p>
            {dataMoreInformation.critical_stock === null ? (
              <SinDatoBadget text="stock crítico" />
            ) : (
              dataMoreInformation.critical_stock
            )}
          </p>
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
            {dataMoreInformation.created_at_product &&
              fechaFormateada(dataMoreInformation.created_at_product) +
                " " +
                dataMoreInformation.created_at_product.substring(11, 19)}
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
            {dataMoreInformation.updated_at_product ? (
              dataMoreInformation.updated_at_product ===
              dataMoreInformation.created_at_product ? (
                <SinDatoBadget text="edición" />
              ) : (
                fechaFormateada(dataMoreInformation.updated_at_product) +
                " " +
                dataMoreInformation.updated_at_product.substring(11, 19)
              )
            ) : null}
          </p>
        </div>
      </Modal>
    </>
  );
};
