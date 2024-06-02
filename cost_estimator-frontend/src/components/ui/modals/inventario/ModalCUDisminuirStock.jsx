import {
  Button,
  Input,
  InputNumber,
  Modal,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AlertError } from "../../AlertError";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { ModalSProductos } from "./ModalSProductos";
import { useAuthContext } from "../../../../context/AuthContext";
import { axiosInstance } from "../../../../axios/axiosInstance";
import { AddIcon } from "../../icons/AddIcon";

export const ModalCUDisminuirStock = forwardRef((props, ref) => {
  const { storeLogged, userLogged } = useAuthContext();
  const { dataProductsProps } = props;
  const [open, setOpen] = useState(false);
  //disabled
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  //Loadings
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  //Alerts
  const [visibleAlertError, setVisibleAlertError] = useState(false);
  const [tituloAlerta, setTituloAlerta] = useState("");
  const [descripcionAlerta, setDescripcionAlerta] = useState("");
  //data
  const [dataProducts, setDataProducts] = useState([]);
  //use ref
  const childRefProducts = useRef(null);
  //data selected
  const [dataKeysSelected, setDataKeysSelected] = useState([]);
  const [dataProductsSelected, setDataProductsSelected] = useState([]);
  const [dataQuantitySelected, setDataQuantitySelected] = useState({});
  //ingreso manual
  const [valueInputManualProduct, setValueInputManualProduct] = useState("");

  const childFunction = (id, action, data) => {
    setOpen(true);
    setVisibleAlertError(false);

    setDataKeysSelected([]);
    setDataProductsSelected([]);
    setDataQuantitySelected({});

    setIsButtonDisabled(true);
    setValueInputManualProduct("");

    const filteredProducts = dataProductsProps.filter(
      (product) => product.status === "active"
    );
    setDataProducts(filteredProducts);

    setDataProducts(filteredProducts);
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
      title: "Stock",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Cantidad",
      render: (text, record) => (
        <InputNumber
          inputMode="numeric"
          placeholder="Ingresa cantidad"
          className="w-full max-w-[150px]"
          maxLength={9}
          value={dataQuantitySelected[record.key] || 1}
          onChange={(value) => handleInputChangeQuantity(record.key, value)}
        />
      ),
    },
    {
      title: "Acciones",
      dataIndex: "id_product",
      key: "id_product",

      width: 140,
      render: (id_product, record) => (
        <Space size="middle">
          <Tooltip placement="top" className="cursor-pointer" title="Eliminar">
            <button onClick={() => deleteRowSelected(record.key)}>
              <DeleteIcon className="text-red-500 size-6" />
            </button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const getRowsSelected = (rows) => {
    if (rows.length === 0) {
      setIsButtonDisabled(true);

      setDataQuantitySelected({});
      setDataKeysSelected([]);
      setDataProductsSelected([]);

      return;
    }
    setIsButtonDisabled(false);

    setDataKeysSelected(rows);

    const productsSelected = dataProducts.filter((product) =>
      rows.includes(product.key)
    );
    setDataProductsSelected(productsSelected);
  };

  const deleteRowSelected = (key) => {
    const newsProductsSelected = dataProductsSelected.filter(
      (product) => product.key !== key
    );
    setDataProductsSelected(newsProductsSelected);

    const newsKeysSelected = newsProductsSelected.map((product) => product.key);

    // Eliminar el valor del input correspondiente
    const newQuantity = { ...dataQuantitySelected };
    delete newQuantity[key];
    setDataQuantitySelected(newQuantity);

    setDataKeysSelected(newsKeysSelected);

    if (newsProductsSelected.length === 0) {
      setIsButtonDisabled(true);
      return;
    }
    setIsButtonDisabled(false);
  };

  const handleInputChangeQuantity = (key, value) => {
    message.destroy();
    if (!/^\d*\.?\d+$/.test(value)) {
      message.error("Por favor, ingresa una cantidad válida.");
      return;
    }

    // Validar que la cantidad ingresada no exceda el stock disponible
    const product = dataProductsSelected.find((product) => product.key === key);

    if (value > product.quantity) {
      message.error(
        `La cantidad ingresada excede el stock disponible para el producto "${product.name_product}".`
      );
      return;
    }

    setDataQuantitySelected({
      ...dataQuantitySelected,
      [key]: value,
    });
  };

  const addProductManualToTable = () => {
    const foundProduct = dataProducts.find(
      (product) => product.barcode === valueInputManualProduct
    );

    if (foundProduct) {
      const existingProductInTable = dataProductsSelected.find(
        (product) => product.barcode === valueInputManualProduct
      );

      setIsButtonDisabled(false);

      if (existingProductInTable) {
        //existe producto ya en la table
        const product = dataProductsSelected.find(
          (product) => product.barcode === valueInputManualProduct
        );

        //obtener cantidad actual del producto en DETAILS
        let quantitySelected = dataQuantitySelected[product.key] || 1;
        //sumar la cantidad 1
        quantitySelected = quantitySelected + 1;

        //setear cantidad
        setDataQuantitySelected({
          ...dataQuantitySelected,
          [product.key]: quantitySelected,
        });
      } else {
        setDataKeysSelected([foundProduct.key, ...dataKeysSelected]);
        setDataProductsSelected([foundProduct, ...dataProductsSelected]);
      }
    } else {
      return message.error("Producto no encontrado");
    }
  };

  const decreaseStock = async () => {
    setIsLoadingButton(true);

    const dataProducts = {
      products: dataProductsSelected.map((product) => ({
        id_product: product.id_product,
        quantity:
          dataQuantitySelected[product.key] === undefined
            ? 1
            : dataQuantitySelected[product.key],
      })),
      fk_shop_id: storeLogged.id,
      fk_user_id_updated: userLogged.id,
    };

    await axiosInstance
      .post("/api/decreaseStock", dataProducts)
      .then((response) => {
        message.success("Disminución de stock exitosa");
        setOpen(false);
        props.reloadTable();
      })
      .catch((error) => {
        console.log(error.response);

        if (
          error.response.data.error ===
          "La cantidad a disminuir supera al stock disponible"
        ) {
          message.error("La cantidad a disminuir supera al stock disponible");
          return;
        }
        message.error("No se ha podido aumentar el stock");
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  return (
    <Modal
      title={"Disminuir Stock"}
      centered
      width={1000}
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
            loading={isLoadingButton}
            disabled={isButtonDisabled}
            onClick={() => decreaseStock()}
          >
            Disminuir Stock
          </Button>
        </Space>
      }
    >
      {/* Ingreso manual y buscar productos */}
      <div
        className="opciones-flex-input-buttons mb-4  flex justify-between
       flex-wrap gap-1 mt-6"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <div className="container-input-ingreso-manual mb-4 flex flex-col max-w-[280px] gap-y-2">
            <label className="text-negro">Ingreso manual:</label>
            <Input
              placeholder="Ingresa código de barra"
              value={valueInputManualProduct}
              onChange={(e) => setValueInputManualProduct(e.target.value)}
            />
          </div>

          <div className="button-add-product-gestionar-container">
            <Button
              onClick={() => addProductManualToTable()}
              className="mt-[13px] flex items-center gap-2 border-none bg-primary text-white"
            >
              <AddIcon className="size-5 flex" />
              Ingresar Producto
            </Button>
          </div>
        </div>

        <div className="div-button-buscar-product flex justify-end  mt-[30px]">
          <Button
            onClick={() =>
              childRefProducts.current.childFunction(null, "Agregar")
            }
            className="border-primary text-primary"
          >
            Buscar Productos
          </Button>
        </div>
      </div>

      <ModalSProductos
        sendRowsSelected={getRowsSelected}
        dataProductsProps={dataProducts}
        ref={childRefProducts}
        keysSelected={dataKeysSelected}
      />

      {/*  Table */}
      <Table
        scroll={{
          x: 800,
        }}
        columns={columns}
        dataSource={dataProductsSelected}
      />

      {visibleAlertError && (
        <div className="my-4">
          <AlertError titulo={tituloAlerta} descripcion={descripcionAlerta} />
        </div>
      )}
    </Modal>
  );
});
