import { Button, Form, Input, Modal, Space, Table, message } from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ModalCUClientes } from "../ModalCUClientes";
import { axiosInstance } from "../../../../axios/axiosInstance";
import { useAuthContext } from "../../../../context/AuthContext";
import { LoadingSeccion } from "../../LoadingSeccion";

export const ModalSClients = forwardRef((props, ref) => {
  const { dataClientsProps, keySelected } = props;

  const { storeLogged } = useAuthContext();

  const childRefClientAdd = useRef(null);
  const [open, setOpen] = useState(false);
  //disabled buttons
  const [disabledButtonAdd, setDisabledButtonAdd] = useState(true);
  //Loadings
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  //filter
  const [valueFilter, setValueFilter] = useState("");
  //data
  const [data, setData] = useState([]);
  const [dataOriginalClients, setDataOriginalClients] = useState([]);
  //data selected rows
  const [dataClientSelected, setDataClientSelected] = useState([]);
  const [dataKeySelected, setDataKeySelected] = useState([]);

  const childFunction = () => {
    setOpen(true);
    setData(dataClientsProps);
    setDataOriginalClients(dataClientsProps);

    if (keySelected.length > 0) {
      setDataKeySelected([keySelected[0].key]);
      setDisabledButtonAdd(false);
    } else {
      setDataKeySelected([]);
      setDisabledButtonAdd(true);
    }
  };

  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const getClients = async () => {
    setIsLoadingTable(true);
    await axiosInstance
      .get("/api/getClients/" + storeLogged.id)
      .then((response) => {
        setData([response.data[0], ...data ]);
        setDataOriginalClients([response.data[0], ...data ]);

        props.sendNewDataClient([response.data[0], ...data ]);
      })
      .catch((error) => {
        return message.error("No se han podido cargar los clientes");
      })
      .finally(function () {
        setIsLoadingTable(false);
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
      width: 130,
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
  ];

  function filterByDNIRUT(currValue) {
    setValueFilter(currValue);
    if (currValue === "") {
      setData(dataOriginalClients);
    } else {
      const filteredData = dataOriginalClients.filter((entry) =>
        entry.dni.toLowerCase().includes(currValue.toLowerCase())
      );
      setData(filteredData);
    }
  }

  const sendRowsSelected = () => {
    props.sendClientKey(dataClientSelected);
    setOpen(false);
  };

  return (
    <Modal
      title="Clientes"
      centered
      width={800}
      open={open}
      onCancel={() => setOpen(false)}
      footer={
        <Space>
          <Button
            className="cancel-button-modal h-fit border-none
                 text-red-500 hover:bg-red-100 transition-all"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            disabled={disabledButtonAdd}
            onClick={() => sendRowsSelected()}
            className="h-fit border-none bg-primary text-white"
          >
            Agregar Cliente 
          </Button>
        </Space>
      }
    >
      {/* Filtro y agregar cliente */}
      <div className="flex justify-between flex-wrap gap-4 mt-6 mb-2">
        <div className="mb-4 flex flex-col w-full max-w-[300px] gap-y-2">
          <label className="text-negro">Buscar por RUT/DNI:</label>
          <Input
            placeholder="Ingresa RUT/DNI"
            value={valueFilter}
            onChange={(e) => filterByDNIRUT(e.target.value)}
          />
        </div>

        {/* Agregar nuevo cliente */}
        <div className="w-full sm:w-fit flex justify-end sm:mt-[30px]">
          <Button
            onClick={() =>
              childRefClientAdd.current.childFunction(null, "Agregar")
            }
            className="border-primary text-primary"
          >
            Agregar nuevo cliente
          </Button>
        </div>
      </div>

      <ModalCUClientes ref={childRefClientAdd} reloadTable={getClients} />

      <Table
        scroll={{
          x: 800,
        }}
        pagination={{
          position: ["topRight", "bottomRight"],
        }}
        columns={columns}
        loading={isLoadingTable}
        dataSource={data}
        rowSelection={{
          type: "radio",
          selectedRowKeys: dataKeySelected,
          onChange: (key) => {
            setDataClientSelected(key);
            setDataKeySelected(key);
            setDisabledButtonAdd(false);
          },
        }}
      />
    </Modal>
  );
});
