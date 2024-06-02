import { Button, Input, Modal, Space, Table } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { SinDatoBadget } from "../../SinDatoBadget";
import { formatPrecioCLP } from "../../../../helpers/formatPrecioCLP";

export const ModalSProductos = forwardRef((props, ref) => {
  const { dataProductsProps, keysSelected } = props;
  const [open, setOpen] = useState(false);
  //Loadings
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  //data
  const [dataProducts, setDataProducts] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  //data selected
  const [dataProductSelected, setDataProductSelected] = useState([]);
  const [dataKeysSelected, setDataKeysSelected] = useState([]);
  //filter
  const [valueFilter, setValueFilter] = useState("");

  const childFunction = (id, action) => {
    setOpen(true);
    setDataProducts(dataProductsProps);
    setValueFilter("");
    setDataKeysSelected(keysSelected);
  };

  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const columns = [
    {
      title: "Código de barra",
      dataIndex: "barcode",
      key: "barcode",
      render: (text) => <p>{text}</p>,
      sorter: {
        compare: (a, b) => a.barcode.localeCompare(b.sku),
        multiple: 2,
      },
      width: 120,
    },
    {
      title: "Nombre",
      dataIndex: "name_product",
      key: "name_product",
      render: (text) => <p>{text}</p>,
      sorter: {
        compare: (a, b) => a.name_product.localeCompare(b.name_product),
        multiple: 3,
      },
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
      render: (text) => (
        <p>{text === null ? <SinDatoBadget text="marca" /> : text}</p>
      ),
      sorter: {
        compare: (a, b) => a.brand.localeCompare(b.brand),
        multiple: 4,
      },
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model",
      render: (text) => (
        <p>{text === null ? <SinDatoBadget text="modelo" /> : text}</p>
      ),
      sorter: {
        compare: (a, b) => a.model.localeCompare(b.model),
        multiple: 5,
      },
    },
    {
      title: "Categoría",
      dataIndex: "name_category",
      key: "name_category",
      render: (text) => (
        <p>{text === null ? <SinDatoBadget text="categoría" /> : text}</p>
      ),
      filters: dataCategory.map((data) => ({
        text: data.name_category,
        value: data.id_category,
      })),
      onFilter: (value, record) => record.id_category === value,
    },
    {
      title: "Precio venta",
      dataIndex: "sale_price",
      key: "sale_price",
      render: (text) => <p>{formatPrecioCLP(text)}</p>,
      sorter: {
        compare: (a, b) => a.sale_price - b.sale_price,
      },
    },
    {
      title: "Precio oferta",
      dataIndex: "offer_price",
      key: "offer_price",
      render: (text, record) => (
        <p className="text-primary">
          {record.is_offer_price === 0 ? (
            <SinDatoBadget text="precio oferta" />
          ) : (
            formatPrecioCLP(text)
          )}
        </p>
      ),
      sorter: {
        compare: (a, b) => a.offer_price - b.offer_price,
      },
    },
    {
      title: "Stock",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div className="flex gap-2 items-center">
          {text !== 0 && text}
          {text === 0 ? (
            <SinDatoBadget text="stock" sinStock={true} />
          ) : (
            record.critical_stock !== null && (
              <>
                {text <= record.critical_stock && (
                  <span
                    className="inline-flex items-center gap-x-1.5 py-1.5 px-3 
          rounded-full text-xs font-medium bg-red-500 text-white"
                  >
                    Crítico
                  </span>
                )}
                {text > record.critical_stock &&
                  text <= record.critical_stock + 2 && (
                    <span
                      className="inline-flex items-center gap-x-1.5 py-1.5 px-3 
          rounded-full text-xs font-medium bg-orange-500 text-white"
                    >
                      Deficiente
                    </span>
                  )}
              </>
            )
          )}
        </div>
      ),
      width: 150,
      sorter: {
        compare: (a, b) => a.cantidad - b.cantidad,
      },
    },
  ];

  function filterKeyWord(currValue) {
    setValueFilter(currValue);
    if (currValue === "") {
      setDataProducts(dataProductsProps);
    } else {
      const filteredData = dataProductsProps.filter((entry) => {
        const barcode = entry.barcode ? entry.barcode.toLowerCase() : "";
        const sku = entry.sku ? entry.sku.toLowerCase() : "";
        const name_product = entry.name_product
          ? entry.name_product.toLowerCase()
          : "";
        const brand = entry.brand ? entry.brand.toLowerCase() : "";
        const model = entry.model ? entry.model.toLowerCase() : "";
        return (
          dataProductSelected.includes(entry.key) ||
          barcode.includes(currValue.toLowerCase()) ||
          sku.includes(currValue.toLowerCase()) ||
          name_product.includes(currValue.toLowerCase()) ||
          brand.includes(currValue.toLowerCase()) ||
          model.includes(currValue.toLowerCase())
        );
      });
      setDataProducts(filteredData);
    }
  }

  const sendRowsSelected = () => {
    const rowsSelected = dataProductSelected.flatMap((item) => {
      if (Array.isArray(item)) {
        return item;
      } else {
        return [item];
      }
    });

    setOpen(false);
    props.sendRowsSelected(rowsSelected);
  };

  return (
    <Modal
      title="Productos"
      centered
      width={900}
      open={open}
      onCancel={() => setOpen(false)}
      footer={
        <Space>
          <Button
            className="cancel-button-modal h-fit border-none text-red-500 hover:bg-red-100 transition-all"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            className="h-fit border-none bg-primary text-white"
            onClick={() => sendRowsSelected()}
          >
            Agregar Productos
          </Button>
        </Space>
      }
    >
      {/* Filtro */}
      <div className="flex flex-col w-full max-w-[300px] gap-y-2 mt-6 mb-4">
        <label className="text-negro">Buscar por palabra clave:</label>
        <Input
          value={valueFilter}
          onChange={(e) => filterKeyWord(e.target.value)}
          placeholder="Ingresa palabra clave"
        />
      </div>

      <Table
        columns={columns}
        dataSource={dataProducts}
        pagination={{
          position: ["topRight", "bottomRight"],
          pageSize: 10,
        }}
        scroll={{
          x: 800,
        }}
        rowSelection={{
          selectedRowKeys: dataKeysSelected,
          type: "checkbox",
          onChange: (selectedRowKeys, e) => {
            setDataProductSelected(selectedRowKeys);
            setDataKeysSelected(selectedRowKeys);
          },
          getCheckboxProps: (record) => ({}),
        }}
      />
    </Modal>
  );
});
