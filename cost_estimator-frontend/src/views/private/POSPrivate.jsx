import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Radio,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../axios/axiosInstance";
import { LoadingSeccion } from "../../components/ui/LoadingSeccion";
import { AddIcon } from "../../components/ui/icons/AddIcon";
import { DeleteIcon } from "../../components/ui/icons/DeleteIcon";
import { RigthIcon } from "../../components/ui/icons/RigthIcon";
import { UserIcon } from "../../components/ui/icons/UserIcon";
import { ModalSClients } from "../../components/ui/modals/clients/ModalSClients";
import { useAuthContext } from "../../context/AuthContext";
import { formatPrecioCLP } from "../../helpers/formatPrecioCLP";

export const POSPrivate = () => {
  const { isAuthenticated, storeLogged, userLogged, boxLogged } =
    useAuthContext();
  const childRefClients = useRef(null);
  //loading
  const [isLoadingSection, setIsLoadingSection] = useState(false);
  const [isLoadingButtonBuy, setIsLoadingButtonBuy] = useState(false);
  //disabled
  const [isDisabledButtonContinue, setIsDisabledButtonContinue] =
    useState(true);
  //datas
  const [dataClients, setDataClients] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  //details -var
  const [dataProdctsOnDetails, setDataProdctsOnDetails] = useState([]);
  const [quantityProductOnDetails, setQuantityProductOnDetails] = useState({});
  //resumen -var
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  //ingreso manual
  const [valueInputManualProduct, setValueInputManualProduct] = useState("");
  //client
  const [dataClientSelected, setDataClientSelected] = useState([]);
  //method page
  const [paymentMethod, setPaymentMethod] = useState("");
  //modal confirm payment
  const [isModalPaying, setIsModalPaying] = useState(false);
  //modal confirm payment
  const [vueltoClient, setVueltoClient] = useState(0);

  //form metodos de pago
  const [formAddManualProduct] = Form.useForm();
  const [form] = Form.useForm();
  const [formEfectivo] = Form.useForm();

  //n vouhcer
  const [numberVoucher, setNumberVoucher] = useState("");

  const columns = [
    {
      title: "Código de barra",
      dataIndex: "barcode",
      key: "barcode",
      render: (text) => <p>{text}</p>,
      width: 90,
    },
    {
      title: "Nombre",
      dataIndex: "name_product",
      key: "name_product",
      render: (text) => <p>{text}</p>,
      width: 200,
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          inputMode="numeric"
          value={quantityProductOnDetails[record.key] || 1}
          placeholder="Ingresa cantidad"
          className="w-full max-w-[80px]"
          onChange={(value) => handleInputChangeQuantity(record.key, value)}
        />
      ),
      width: 130,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text, record) => {
        let totalAmount;
        let discount = 0;

        if (quantityProductOnDetails[record.key]) {
          if (record.is_offer_price === 1) {
            discount =
              quantityProductOnDetails[record.key] *
              (record.sale_price - record.offer_price);
            totalAmount = formatPrecioCLP(
              quantityProductOnDetails[record.key] * record.sale_price
            );
          } else {
            totalAmount = formatPrecioCLP(
              quantityProductOnDetails[record.key] * record.sale_price
            );
          }
        } else {
          if (record.is_offer_price === 1) {
            discount = 1 * (record.sale_price - record.offer_price);
            totalAmount = formatPrecioCLP(1 * record.sale_price);
          } else {
            totalAmount = formatPrecioCLP(1 * record.sale_price);
          }
        }
        return (
          <div className="flex flex-col">
            <span>{totalAmount}</span>
            {record.is_offer_price === 1 && (
              <span className="text-plomo text-xs">
                -{formatPrecioCLP(discount)}
              </span>
            )}
          </div>
        );
      },
      width: 80,
    },
    {
      title: "",
      dataIndex: "id_product",
      key: "id_product",
      render: (text) => (
        <Tooltip
          placement="top"
          className="cursor-pointer"
          title="Eliminar producto"
        >
          <button onClick={() => deleteItemOnDetails(text)}>
            <DeleteIcon className="text-red-500 size-6" />
          </button>
        </Tooltip>
      ),
      width: 40,
    },
  ];

  useEffect(() => {
    if (isAuthenticated && storeLogged != null) {
      getAllData();
    }
  }, [isAuthenticated, storeLogged]);

  useEffect(() => {}, [quantityProductOnDetails]);

  const getAllData = async () => {
    setIsLoadingSection(true);
    await axiosInstance
      .get("/api/CombinedQuerysPOSSection/" + storeLogged.id)
      .then((response) => {
        setDataClients(response.data.getClients.original);
        setDataProducts(response.data.getProducts.original);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        setIsLoadingSection(false);
      });
  };

  const getClientReload = (data) => {
    setDataClients(data);
  };

  const getClientSelected = (keyClient) => {
    const clientSelected = dataClients.filter((client) =>
      keyClient.includes(client.key)
    );
    setDataClientSelected(clientSelected);
    return message.success("Cliente añadido a la venta");
  };

  const addProductManualToDetails = () => {
    const foundProduct = dataProducts.find(
      (product) => product.barcode === valueInputManualProduct
    );

    if (foundProduct.status === "desactive")
      return message.error("Producto desactivado");

    if (foundProduct) {
      const existingProductInDetails = dataProdctsOnDetails.find(
        (product) => product.barcode === valueInputManualProduct
      );

      if (existingProductInDetails) {
        //existe producto ya en el detalle
        //obtener data del producto
        const product = dataProdctsOnDetails.find(
          (product) => product.barcode === valueInputManualProduct
        );

        //obtener cantidad actual del producto en DETAILS
        let quantitySelected = quantityProductOnDetails[product.key] || 1;

        //sumar la cantidad 1
        quantitySelected = quantitySelected + 1;

        //validar que no sea mayor al stock del producto
        if (quantitySelected > product.quantity) {
          message.error(
            `Ya no hay stock disponible para el producto "${product.name_product}".`
          );
          return;
        }

        console.log(quantityProductOnDetails);

        //setear cantidad
        setQuantityProductOnDetails({
          ...quantityProductOnDetails,
          [product.key]: quantitySelected, // Utilizar product.key en lugar de key
        });
      } else {
        // El producto no existe en dataProdctsOnDetails, se agrega por primera vez
        setDataProdctsOnDetails([foundProduct, ...dataProdctsOnDetails]);
      }
    } else {
      return message.error("Producto no encontrado");
    }
  };

  const handleInputChangeQuantity = (key, value) => {
    message.destroy();
    if (!/^\d*\.?\d+$/.test(value)) {
      message.error("Por favor, ingresa una cantidad válida.");
      return;
    }

    // Validar que la cantidad ingresada no exceda el stock disponible
    const product = dataProdctsOnDetails.find((product) => product.key === key);
    if (value > product.quantity) {
      message.error(
        `La cantidad ingresada excede el stock disponible para el producto "${product.name_product}".`
      );
      return;
    }

    setQuantityProductOnDetails({
      ...quantityProductOnDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    // Calcula el total general cuando cambian las cantidades
    calculateSubtotal();

    if (dataProdctsOnDetails.length > 0) {
      setIsDisabledButtonContinue(false);
    } else {
      setIsDisabledButtonContinue(true);
    }
  }, [quantityProductOnDetails, dataProdctsOnDetails]);

  const calculateSubtotal = () => {
    let subtotalTemp = 0;
    let discountTemp = 0;

    dataProdctsOnDetails.forEach((product) => {
      const quantitySelected = quantityProductOnDetails[product.key] || 1;
      if (product.is_offer_price === 1) {
        subtotalTemp += quantitySelected * product.offer_price;
        discountTemp +=
          quantitySelected * (product.sale_price - product.offer_price);
      } else {
        subtotalTemp += quantitySelected * product.sale_price;
      }
    });
    setSubtotal(subtotalTemp);
    setDiscount(discountTemp);
  };

  const deleteItemOnDetails = (id_product) => {
    const updatedProducts = dataProdctsOnDetails.filter(
      (product) => product.id_product !== id_product
    );

    setDataProdctsOnDetails(updatedProducts);

    const productToDelete = dataProdctsOnDetails.filter(
      (product) => product.id_product === id_product
    );

    // Eliminar el valor del input correspondiente
    const newQuantityProductOnDetails = { ...quantityProductOnDetails };
    delete newQuantityProductOnDetails[productToDelete[0].key];

    setQuantityProductOnDetails(newQuantityProductOnDetails);
  };

  //anular transsacion
  const voidTransaction = () => {
    setDataClientSelected([]);

    setQuantityProductOnDetails({});
    setDataProdctsOnDetails([]);

    setPaymentMethod("");

    const formValues = form.getFieldsValue();
    form.resetFields();
    formAddManualProduct.resetFields();

    return message.success("Transacción anulada correctamente");
  };

  //mostrar modal de pagando
  const showModalPaying = () => {
    setIsModalPaying(true);
  };

  const createSale = async () => {
    setIsLoadingButtonBuy(true);

    const total = subtotal - discount;
    const id_client =
      dataClientSelected.length > 0 ? dataClientSelected[0].id_client : "";

    const formData = {
      products: dataProdctsOnDetails.map((product) => ({
        id_product: product.id_product,
        quantity:
          quantityProductOnDetails[product.key] === undefined
            ? 1 + ""
            : quantityProductOnDetails[product.key] + "",
      })),
      total: total + "",
      fk_user_vendedor_id: userLogged.id,
      fk_caja_id: boxLogged.id,
      fk_client_id: id_client,
      fk_shop_id: storeLogged.id,
      payment_method: paymentMethod,
    };

    if (paymentMethod === "débito" || paymentMethod === "crédito") {
      formData.number_voucher = numberVoucher.trim();
    }

    await axiosInstance
      .post("/api/createSale", formData)
      .then((response) => {
        message.success("Venta creada con éxito");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        setIsLoadingButtonBuy(false);
      });
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="sora-font text-3xl sm:text-4xl font-bold">POS</h2>
      </div>

      {isLoadingSection ? (
        <LoadingSeccion />
      ) : (
        <>
          {/* Codigo de barra + Buttons + agregar cliente */}
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-3 gap-x-6">
            {/*Table, inputs, buttons */}
            <div className=" col-span-2">
              <div className="flex items-center mb-4 gap-2 flex-wrap">
                <Form
                  form={formAddManualProduct}
                  onFinish={addProductManualToDetails}
                  className="flex flex-wrap gap-2"
                  layout="vertical"
                >
                  {/* input manual */}
                  <div className="container-input-ingreso-manual flex flex-col max-w-[280px] gap-y-2">
                    <Form.Item name="monto_cliente" label="Ingreso manual:">
                      <Input
                        placeholder="Ingresa código de barra"
                        value={valueInputManualProduct}
                        onChange={(e) =>
                          setValueInputManualProduct(e.target.value)
                        }
                      />
                    </Form.Item>
                  </div>

                  <div className="button-add-product-pos-container">
                    <Form.Item className="m-0 p-0 flex justify-end">
                      <Button
                        htmlType="submit"
                        className="mt-[34px] flex items-center gap-2 border-none bg-primary text-white"
                      >
                        <AddIcon className="size-5 flex" />
                        Ingresar Producto
                      </Button>
                    </Form.Item>
                  </div>
                </Form>

                <div className="button-add-client-pos-container">
                  <Button
                    onClick={() => childRefClients.current.childFunction()}
                    className="h-fit button-add-client-pos flex gap-2 mt-[13px] border-none bg-white text-primary"
                  >
                    <UserIcon styles="size-5" />
                    Agregar cliente
                  </Button>
                </div>
              </div>

              <Table
                columns={columns}
                dataSource={dataProdctsOnDetails}
                pagination={false}
                scroll={{
                  y: 325,
                  x: 500, // Establece un ancho mínimo de 800px
                }}
              />
            </div>

            {/*Resumen */}
            <div>
              <h3 className="sora-font mb-2 text-xl sm:text-2xl font-bold">
                Resumen
              </h3>

              {/* Articulos ingresados */}
              <div>
                <label className="text-plomo font-normal">
                  Artículos ingresados:{" "}
                  <span className="font-medium text-negro">
                    {dataProdctsOnDetails.length > 0
                      ? dataProdctsOnDetails.reduce((total, record) => {
                          const quantity =
                            quantityProductOnDetails[record.key] || 1;
                          return total + quantity;
                        }, 0)
                      : 0}
                  </span>
                </label>
              </div>

              <hr className="h-px my-4 bg-gray-200 border-0 "></hr>

              {/* Data cliente */}
              <div>
                <label className="text-plomo mb-1 block font-normal">
                  Datos de cliente:
                </label>
                {dataClientSelected.length > 0 ? (
                  <div className="flex justify-between items-center flex-wrap gap-1">
                    <div>
                      <p className="text-plomo">
                        RUT/DNI:{" "}
                        <span className="font-medium text-negro">
                          {dataClientSelected[0].dni}
                        </span>{" "}
                      </p>
                      <p className="text-plomo">
                        Nombre:{" "}
                        <span className="font-medium text-negro">
                          {dataClientSelected[0].name +
                            " " +
                            dataClientSelected[0].lastname}
                        </span>{" "}
                      </p>
                    </div>

                    <Tooltip
                      placement="top"
                      className="cursor-pointer"
                      title="Eliminar cliente"
                    >
                      <button onClick={() => setDataClientSelected([])}>
                        <DeleteIcon className="size-6 text-red-500" />
                      </button>
                    </Tooltip>
                  </div>
                ) : (
                  <span className="font-medium text-negro">Sin cliente</span>
                )}
              </div>

              <hr className="h-px my-4 bg-gray-200 border-0 "></hr>

              {/* Totales */}
              <div>
                {/* SubTotal */}
                <div className="flex justify-between items-center">
                  <p className="text-plomo text-lg sm:text-xl font-normal">
                    Subtotal
                  </p>
                  <span className="font-medium text-lg sm:text-xl text-negro">
                    {formatPrecioCLP(subtotal)}
                  </span>
                </div>
                {/* Descuento */}
                <div className="flex justify-between items-center">
                  <p className="text-primary text-lg sm:text-xl font-normal">
                    Descuento
                  </p>
                  <span className="font-medium text-lg sm:text-xl text-primary">
                    -{formatPrecioCLP(discount)}
                  </span>
                </div>

                <hr className="h-px my-4 bg-gray-200 border-0 "></hr>

                {/* Total */}
                <div className="flex justify-between items-center">
                  <p className="text-negro text-lg sm:text-xl font-medium">
                    Total
                  </p>
                  <span className="font-medium text-lg sm:text-xl text-negro">
                    {formatPrecioCLP(subtotal - discount)}
                  </span>
                </div>
              </div>

              <hr className="h-px my-4 bg-gray-200 border-0 "></hr>
              {/* Metodos de pago */}
              <Form
                form={form}
                layout="vertical"
                scrollToFirstError={{
                  behavior: "smooth",
                  block: "center",
                  inline: "center",
                }}
                onFinish={showModalPaying}
              >
                <div>
                  <label className="text-plomo mb-1 block font-normal">
                    Método de pago:
                  </label>
                </div>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Por favor selecciona un método de pago",
                    },
                  ]}
                  hasFeedback
                  className="mb-1"
                  name="payment_method"
                >
                  <Radio.Group
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="grid grid-cols-2 gap-2"
                  >
                    <Radio
                      className={`w-full border 
                      ${
                        paymentMethod === "débito"
                          ? "border-primary"
                          : "border-gray-300"
                      }
                      font-normal rounded-lg p-2 py-[]`}
                      value="débito"
                    >
                      <p>Débito</p>
                    </Radio>
                    <Radio
                      className={`w-full border 
                      ${
                        paymentMethod === "efectivo"
                          ? "border-primary"
                          : "border-gray-300"
                      }
                      font-normal rounded-lg p-2 py-[]`}
                      value="efectivo"
                    >
                      Efectivo
                    </Radio>
                    <Radio
                      className={`w-full border 
                      ${
                        paymentMethod === "transferencia"
                          ? "border-primary"
                          : "border-gray-300"
                      }
                      font-normal rounded-lg p-2 py-[]`}
                      value="transferencia"
                    >
                      Transferencia
                    </Radio>
                    <Radio
                      className={`w-full border 
                      ${
                        paymentMethod === "crédito"
                          ? "border-primary"
                          : "border-gray-300"
                      }
                      font-normal rounded-lg p-2 py-[]`}
                      value="crédito"
                    >
                      Crédito
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                {/* Buttons */}
                <Form.Item>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      disabled={isDisabledButtonContinue}
                      htmlType="submit"
                      className="w-full flex items-center 
                gap-2 justify-center border-none bg-primary text-white"
                    >
                      Continuar al pago
                      <RigthIcon className="size-5 flex " />
                    </Button>

                    <Popconfirm
                      title="¿Estás seguro/a que deseas anular la transacción?"
                      okText="Sí, anular"
                      cancelText="No, cancelar"
                      cancelButtonProps={{
                        style: { borderRadius: 12 },
                      }}
                      okButtonProps={{
                        style: {
                          backgroundColor: "#ef4444",
                          border: null,
                        },
                      }}
                      onConfirm={() => {
                        voidTransaction();
                      }}
                    >
                      <Button
                        className="h-fit border-none
                  text-red-500 hover:bg-red-100 transition-all"
                      >
                        Anular transacción
                      </Button>
                    </Popconfirm>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>

          {/* Gestionando pago - mostrar pantalla diferente segun el metodo seleciconado */}
          <Modal
            title="Pago"
            centered
            open={isModalPaying}
            footer={null}
            onCancel={() => setIsModalPaying(false)}
          >
            {paymentMethod === "efectivo" ? (
              <Form form={formEfectivo} className="pt-4" layout="vertical">
                {/* Total */}
                <label className="text-lg">Total:</label>
                <p className="text-xl">
                  {formatPrecioCLP(subtotal - discount)}
                </p>

                {/* Monto con el que paga el cliente */}
                <Form.Item
                  name="monto_cliente"
                  label="Paga con:"
                  className="label_monto_payment_efectivo mt-4"
                  rules={[
                    {
                      max: 11,
                      message: "Máximo 11 dígitos",
                    },
                    {
                      validator: (_, value) => {
                        if (!value) {
                          // Si el campo está vacío
                          return Promise.resolve(); // La validación pasa
                        }

                        // Remover puntos y comas actuales del valor
                        const strippedValue = value.replace(/[,.]/g, "");
                        // Formatear el valor con puntos y comas cada tres dígitos
                        const formattedValue = strippedValue.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          "."
                        );

                        // Actualizar el valor del campo de entrada
                        formEfectivo.setFieldsValue({
                          monto_cliente: formattedValue,
                        });

                        let total = subtotal - discount;
                        setVueltoClient(strippedValue - total);

                        // Verificar si es un número válido después del formateo
                        return /^\d+(\.\d+)?$/.test(strippedValue)
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("El monto solo puede contener números")
                            );
                      },
                    },
                  ]}
                >
                  <Input
                    addonBefore="$"
                    type="text"
                    className="w-full"
                    maxLength={11}
                    inputmode="numeric"
                    placeholder="Ingresa monto con el que paga el cliente"
                  />
                </Form.Item>

                {/* Vuelto */}
                <label className="text-lg">Vuelto:</label>

                {vueltoClient >= 0 ? (
                  <p className="text-xl">{formatPrecioCLP(vueltoClient)}</p>
                ) : (
                  <p className="text-xl text-red-500">
                    Ingresa un monto valido
                  </p>
                )}

                {/* buttons */}
                <Form.Item className="m-0 mt-6 p-0 flex justify-end">
                  <Space>
                    <Button
                      className="cancel-button-modal h-fit border-none text-red-500 hover:bg-red-100 transition-all"
                      onClick={() => setIsModalPaying(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="h-fit border-none bg-primary text-white"
                      htmlType="submit"
                    >
                      Pagado
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            ) : paymentMethod === "débito" || paymentMethod === "crédito" ? (
              <div>
                <div className="mb-4">
                  <p className="text-lg">
                    Metodo de pago:{" "}
                    <span className="text-negro font-medium">
                      {paymentMethod === "débito" ? "Débito" : "Crédito"}
                    </span>
                  </p>
                  <p className="text-base mt-1 text-plomo">
                    Indique al cliente el uso del Pin Pad
                  </p>
                </div>
                {/* Boucer */}
                <div className="mb-4">
                  <label className="mb-1 block">
                    N° de Voucher{" "}
                    <span className="text-gray-400 font-normal">
                      (Opcional)
                    </span>
                  </label>
                  <Input
                    value={numberVoucher}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/[^0-9]/g, "");
                      setNumberVoucher(inputValue);
                    }}
                    placeholder="Ingresa N° de voucher"
                  />
                </div>

                <div className="flex justify-center">
                  <img
                    width={340}
                    src="/img/payment_debit_credit.png"
                    alt="pin-pad"
                  />
                </div>

                <Space className="m-0 mt-6 p-0 flex justify-end">
                  <Button
                    className="cancel-button-modal h-fit border-none text-red-500 hover:bg-red-100 transition-all"
                    onClick={() => setIsModalPaying(false)}
                  >
                    Cancelar
                  </Button>
                  <form>
                    <Button
                      loading={isLoadingButtonBuy}
                      onClick={() => createSale()}
                      className="h-fit border-none bg-primary text-white"
                    >
                      {isLoadingButtonBuy ? "Pagando" : "Pagado"}
                    </Button>
                  </form>
                </Space>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <p className="text-lg">
                    Metodo de pago:{" "}
                    <span className="text-negro font-medium">
                      {paymentMethod === "transferencia" && "Transferencia"}
                    </span>
                  </p>
                </div>
                <div>
                  <img src="/img/payment_transferencia.png" alt="pin-pad" />
                </div>

                <Space className="m-0 mt-6 p-0 flex justify-end">
                  <Button
                    className="cancel-button-modal h-fit border-none text-red-500 hover:bg-red-100 transition-all"
                    onClick={() => setIsModalPaying(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="h-fit border-none bg-primary text-white"
                    htmlType="submit"
                  >
                    Pagado
                  </Button>
                </Space>
              </div>
            )}
          </Modal>

          <ModalSClients
            sendClientKey={getClientSelected}
            dataClientsProps={dataClients}
            keySelected={dataClientSelected}
            ref={childRefClients}
            sendNewDataClient={getClientReload}
          />
        </>
      )}
    </>
  );
};
