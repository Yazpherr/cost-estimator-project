import { Button, Dropdown, Input, Modal, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../../axios/axiosInstance";
import { LoadingSeccion } from "../../../components/ui/LoadingSeccion";
import { SinDatoBadget } from "../../../components/ui/SinDatoBadget";
import { AddIcon } from "../../../components/ui/icons/AddIcon";
import { CheckIcon } from "../../../components/ui/icons/CheckIcon";
import { DeleteIcon } from "../../../components/ui/icons/DeleteIcon";
import { EditIcon } from "../../../components/ui/icons/EditIcon";
import { EyeIcon } from "../../../components/ui/icons/EyeIcon";
import { HighIcon } from "../../../components/ui/icons/HighIcon";
import { MoreVertical } from "../../../components/ui/icons/MoreVertical";
import { StockIcon } from "../../../components/ui/icons/StockIcon";
import { ModalCUAumentoStock } from "../../../components/ui/modals/inventario/ModalCUAumentoStock";
import { ModalCUProductos } from "../../../components/ui/modals/inventario/ModalCUProductos";
import { useAuthContext } from "../../../context/AuthContext";
import fechaFormateada from "../../../helpers/fechaFormateada";
import { formatPrecioCLP } from "../../../helpers/formatPrecioCLP";
import { BottomIcon } from "./../../../components/ui/icons/BottomIcon";
import { ModalCUDisminuirStock } from "../../../components/ui/modals/inventario/ModalCUDisminuirStock";

export const ProductosPrivate = () => {
  const { isAuthenticated, storeLogged, userLogged } = useAuthContext();
  const childRefProduct = useRef(null);
  const childRefAumentoStock = useRef(null);
  const childRefDisminuirStock = useRef(null);
  //data producto
  const [dataProducts, setDataProducts] = useState([]);
  const [originalDataProducts, setOriginalDataProducts] = useState([]);
  //data users
  const [dataUsers, setDataUsers] = useState([]);
  //data category
  const [dataCategory, setDataCategory] = useState([]);
  //data product more information
  const [dataProductMoreInformation, setDataProductMoreInformation] = useState(
    []
  );
  const [isModalMoreInformation, setIsModalMoreInformation] = useState(false);

  //loading
  const [loadingTable, setLoadingTable] = useState(false);
  const [
    loadingSeccionChangeStockHistory,
    setLoadingSeccionChangeStockHistory,
  ] = useState(false);

  //filtro
  const [valueFiltro, setValueFiltro] = useState("");

  //modal changes stock
  const [isModalChangeStock, setIsModalChangeStock] = useState(false);
  const [dataChangeStockProduct, setDataChangeStockProduct] = useState([]);
  useEffect(() => {
    if (isAuthenticated && storeLogged != null) {
      getProducts();
    }
  }, [isAuthenticated, storeLogged]);

  const getProducts = async () => {
    setLoadingTable(true);
    await axiosInstance
      .get("/api/CombinedQuerysProductSection/" + storeLogged.id)
      .then((response) => {
        console.log(response.data.getProducts.original);

        setOriginalDataProducts(response.data.getProducts.original);
        setDataProducts(response.data.getProducts.original);

        setDataUsers(response.data.getUsersShop.original);
        setDataCategory(response.data.getCategories.original);
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
      title: "Código de barra",
      dataIndex: "barcode",
      key: "barcode",
      render: (text) => <p>{text}</p>,
      sorter: {
        compare: (a, b) => a.barcode.localeCompare(b.sku),
        multiple: 2,
      },
    },
    /*     {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (text) => (
        <p>{text === null ? <SinDatoBadget text="SKU" /> : text}</p>
      ),
      sorter: {
        compare: (a, b) => a.sku.localeCompare(b.sku),
        multiple: 2,
      },
    }, */
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
      dataIndex: "id_product",
      key: "id_product",
      width: 100,
      render: (id_product, record) => (
        <Dropdown
          placement="top"
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <button
                    className="flex gap-2 items-center w-full"
                    onClick={() =>
                      showModalMoreInformation([
                        record.name_product,
                        record.details,
                        record.brand,
                        record.model,
                        record.purchase_price,
                        record.sale_price,
                        record.quantity,
                        record.critical_stock,
                        record.created_at_product,
                        record.updated_at_product,
                        record.name_category,
                        record.name_created_at,
                        record.lastname_created_at,
                        record.name_updated_at,
                        record.lastname_updated_at,
                        record.barcode,
                        record.sku,
                        record.is_offer_price,
                        record.offer_price,
                      ])
                    }
                  >
                    <EyeIcon className="size-5 text-negro" />
                    <span>Más información</span>
                  </button>
                ),
              },
              //Historial de stock
              {
                key: "4",
                label: (
                  <button
                    className="flex gap-2 items-center w-full"
                    onClick={() => showModalHistoryChangeStock(id_product)}
                  >
                    <StockIcon className="size-5 text-negro" />
                    <span className="text-negro">Historial de stock</span>
                  </button>
                ),
              },
              {
                key: "2",
                label: (
                  <button
                    className="flex gap-2 items-center w-full"
                    onClick={() =>
                      childRefProduct.current.childFunction(
                        id_product,
                        "Edit",
                        [
                          record.name_product,
                          record.details,
                          record.brand,
                          record.model,
                          record.purchase_price,
                          record.sale_price,
                          record.quantity,
                          record.critical_stock,
                          record.created_at_product,
                          record.updated_at_product,
                          record.name_category,
                          record.name_created_at,
                          record.lastname_created_at,
                          record.name_updated_at,
                          record.lastname_updated_at,
                          record.id_category,
                          record.barcode,
                          record.sku,
                          record.is_offer_price,
                          record.offer_price,
                        ]
                      )
                    }
                  >
                    <EditIcon className="size-5 text-yellow-500" />
                    <span className="text-yellow-500">Editar</span>
                  </button>
                ),
              },
              {
                key: "3",
                label:
                  record.status === "active" ? (
                    <button
                      className="flex gap-2 items-center w-full"
                      onClick={() => {
                        changeStatus(id_product);
                      }}
                    >
                      <DeleteIcon className="size-5 text-red-500" />
                      <span className="text-red-500">Desactivar</span>
                    </button>
                  ) : (
                    <button
                      className="flex gap-2 items-center w-full"
                      onClick={() => {
                        changeStatus(id_product);
                      }}
                    >
                      <CheckIcon className="size-5 text-primary" />
                      <span className="text-primary">Activar</span>
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
      setDataProducts(originalDataProducts);
    } else {
      const filteredData = originalDataProducts.filter((entry) => {
        const barcode = entry.barcode ? entry.barcode.toLowerCase() : "";
        const name_product = entry.name_product
          ? entry.name_product.toLowerCase()
          : "";
        const brand = entry.brand ? entry.brand.toLowerCase() : "";
        const model = entry.model ? entry.model.toLowerCase() : "";
        return (
          barcode.includes(currValue.toLowerCase()) ||
          name_product.includes(currValue.toLowerCase()) ||
          brand.includes(currValue.toLowerCase()) ||
          model.includes(currValue.toLowerCase())
        );
      });
      setDataProducts(filteredData);
    }
  }

  const changeStatus = async (id) => {
    message.loading("Cambiando estado del producto...");

    await axiosInstance
      .put("/api/changeStatusProduct/" + id + "/" + userLogged.id)
      .then((response) => {
        message.destroy();
        message.success(`El estado del producto se ha cambiado correctamente.`);
        getProducts();
      })
      .catch((error) => {
        message.destroy();
        console.log(error);
        message.error(`El estado del producto no se ha podido cambiar.`);
      });
  };

  const showModalMoreInformation = (data) => {
    const productData = {
      name_product: data[0],
      details: data[1],
      brand: data[2],
      model: data[3],
      purchase_price: data[4],
      sale_price: data[5],
      quantity: data[6],
      critical_stock: data[7],
      created_at_product: data[8],
      updated_at_product: data[9],
      name_category: data[10],
      name_created_at: data[11],
      lastname_created_at: data[12],
      name_updated_at: data[13],
      lastname_updated_at: data[14],
      barcode: data[15],
      sku: data[16],
      is_offer_price: data[17],
      offer_price: data[18],
    };
    setDataProductMoreInformation(productData);
    setIsModalMoreInformation(true);
  };

  const showModalHistoryChangeStock = async (id) => {
    setIsModalChangeStock(true);
    setLoadingSeccionChangeStockHistory(true);
    await axiosInstance
      .get("/api/getStockChangesHystoryByProduct/" + storeLogged.id + "/" + id)
      .then((response) => {
        setDataChangeStockProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        setLoadingSeccionChangeStockHistory(false);
      });
  };

  return (
    <>
      <div className="flex justify-between gap-4 mb-12 flex-wrap items-center">
        <h2 className="sora-font text-3xl sm:text-4xl font-bold">Productos</h2>
        <div className="flex flex-wrap w-full sm:w-fit justify-end gap-2 ">
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <button
                      onClick={() =>
                        childRefAumentoStock.current.childFunction(
                          null,
                          "Agregar"
                        )
                      }
                      className="w-full flex gap-2 text-negro"
                    >
                      <HighIcon className="size-5 " />
                      Aumentar Stock
                    </button>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <button
                      onClick={() =>
                        childRefDisminuirStock.current.childFunction(
                          null,
                          "Agregar"
                        )
                      }
                      className="w-full flex gap-2 text-negro"
                    >
                      <BottomIcon className="size-5" />
                      Disminuir Stock
                    </button>
                  ),
                },
              ],
            }}
          >
            <Button
              className="h-fit flex gap-2 items-center border-primary border
              bg-white text-primary"
              onClick={(e) => e.preventDefault()}
            >
              <StockIcon className="size-5 flex" />
              Gestionar Stock
            </Button>
          </Dropdown>

          {/* Add product */}
          <Button
            color="primary"
            className="h-fit flex gap-2 items-center border-none bg-primary text-white"
            onClick={() =>
              childRefProduct.current.childFunction(null, "Agregar")
            }
          >
            <AddIcon className="size-5 flex" />
            Agregar Producto
          </Button>
        </div>
      </div>

      <ModalCUProductos
        dataCategory={dataCategory}
        ref={childRefProduct}
        reloadTable={getProducts}
      />

      <ModalCUAumentoStock
        dataProductsProps={dataProducts}
        ref={childRefAumentoStock}
        reloadTable={getProducts}
      />

      <ModalCUDisminuirStock
        dataProductsProps={dataProducts}
        ref={childRefDisminuirStock}
        reloadTable={getProducts}
      />

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
        dataSource={dataProducts}
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
          <p>{dataProductMoreInformation.barcode}</p>
        </div>
        <div className="mt-3">
          <label>SKU</label>
          <p>
            {dataProductMoreInformation.sku === null ? (
              <SinDatoBadget text="SKU" />
            ) : (
              dataProductMoreInformation.sku
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Nombre de producto</label>
          <p>{dataProductMoreInformation.name_product}</p>
        </div>
        <div className="mt-3">
          <label>Detalles</label>
          <p>
            {dataProductMoreInformation.details === null ? (
              <SinDatoBadget text="detalles" />
            ) : (
              dataProductMoreInformation.details
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Marca</label>
          <p>
            {dataProductMoreInformation.brand === null ? (
              <SinDatoBadget text="marca" />
            ) : (
              dataProductMoreInformation.brand
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Modelo</label>
          <p>
            {dataProductMoreInformation.model === null ? (
              <SinDatoBadget text="modelo" />
            ) : (
              dataProductMoreInformation.model
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Precio compra</label>
          <p>
            {dataProductMoreInformation.purchase_price === null ? (
              <SinDatoBadget text="precio compra" />
            ) : (
              dataProductMoreInformation.purchase_price
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Precio venta</label>
          <p>
            {dataProductMoreInformation.sale_price &&
              formatPrecioCLP(dataProductMoreInformation.sale_price)}
          </p>
        </div>
        <div className="mt-3">
          <label>Precio Oferta</label>
          <p>
            {dataProductMoreInformation.is_offer_price &&
            dataProductMoreInformation.is_offer_price === 1 ? (
              formatPrecioCLP(dataProductMoreInformation.offer_price)
            ) : (
              <SinDatoBadget text="precio oferta" />
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Stock</label>
          <p>{dataProductMoreInformation.quantity}</p>
        </div>
        <div className="mt-3">
          <label>Stock crítico</label>
          <p>
            {dataProductMoreInformation.critical_stock === null ? (
              <SinDatoBadget text="stock crítico" />
            ) : (
              dataProductMoreInformation.critical_stock
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Creado por:</label>
          <p>
            {dataProductMoreInformation.name_created_at +
              " " +
              dataProductMoreInformation.lastname_created_at}
          </p>
        </div>
        <div className="mt-3">
          <label>Fecha de creación:</label>
          <p>
            {dataProductMoreInformation.created_at_product &&
              fechaFormateada(dataProductMoreInformation.created_at_product) +
                " " +
                dataProductMoreInformation.created_at_product.substring(11, 19)}
          </p>
        </div>
        <div className="mt-3">
          <label>Última edición por:</label>
          <p>
            {dataProductMoreInformation.name_updated_at !== null ? (
              dataProductMoreInformation.name_updated_at +
              " " +
              dataProductMoreInformation.lastname_updated_at
            ) : (
              <SinDatoBadget text="edición" />
            )}
          </p>
        </div>
        <div className="mt-3">
          <label>Fecha de última edición:</label>
          <p>
            {dataProductMoreInformation.updated_at_product ? (
              dataProductMoreInformation.updated_at_product ===
              dataProductMoreInformation.created_at_product ? (
                <SinDatoBadget text="edición" />
              ) : (
                fechaFormateada(dataProductMoreInformation.updated_at_product) +
                " " +
                dataProductMoreInformation.updated_at_product.substring(11, 19)
              )
            ) : null}
          </p>
        </div>
      </Modal>

      {/*Historial de stock */}
      <Modal
        title="Historial de cambios de Stock"
        open={isModalChangeStock}
        width={1100}
        footer={
          <Button onClick={() => setIsModalChangeStock(false)}>Cerrar</Button>
        }
        onCancel={() => setIsModalChangeStock(false)}
      >
        {loadingSeccionChangeStockHistory ? (
          <LoadingSeccion />
        ) : (
          <Table
            dataSource={dataChangeStockProduct}
            className="mt-3"
            columns={[
              {
                title: "Operación",
                dataIndex: "type_operation",
                key: "type_operation",
                render: (text) => (
                  <>
                    {text === "increase" ? (
                      <div className="flex justify-center bg-badged rounded-full p-1">
                        <HighIcon className="size-5 text-primary" />
                        <span className="text-sm text-primary">Aumento</span>
                      </div>
                    ) : (
                      <div className="flex justify-center bg-red-100 rounded-full p-1">
                        <BottomIcon className="size-5 text-red-500" />
                        <span className="text-sm text-red-500">
                          Disminución
                        </span>
                      </div>
                    )}
                  </>
                ),
                filters: [
                  {
                    text: "Aumento",
                    value: "increase",
                  },
                  {
                    text: "Disminución",
                    value: "decrease",
                  },
                ],
                onFilter: (value, record) => String(record.type_operation) === value,
              },
              {
                title: "Nombre",
                dataIndex: "name_product",
                key: "name_product",
                render: (text) => <p>{text}</p>,
              },
              {
                title: "Stock anterior",
                dataIndex: "previous_stock",
                key: "previous_stock",
                render: (text) => <p>{text}</p>,
              },
              {
                title: "Stock a cambiar",
                dataIndex: "stock_to_change",
                key: "stock_to_change",
                render: (text,record) => <p>{
                  record.type_operation === "increase" ?
                  '+' + text
                  : '-' + text
                  }</p>,
              },
              {
                title: "Stock posterior",
                dataIndex: "later_stock",
                key: "later_stock",
                render: (text) => <p>{text}</p>,
              },
              {
                title: "Modificado por",
                dataIndex: "name_created_at",
                key: "name_created_at",
                render: (text, record) => (
                  <p>{text + " " + record.lastname_created_at}</p>
                ),
              },
              {
                title: "Fecha de modificación",
                dataIndex: "created_at_stock_operation",
                key: "created_at_stock_operation",
                render: (text) => (
                  <p>{fechaFormateada(text) + " " + text.substring(11, 19)}</p>
                ),
                sorter: {
                  compare: (a, b) =>
                    new Date(b.created_at_stock_operation) -
                    new Date(a.created_at_stock_operation),
                  multiple: 1,
                },
              },
            ]}
            scroll={{
              x: 900,
            }}
          />
        )}
      </Modal>
    </>
  );
};
