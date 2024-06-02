import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  message,
  Select,
  Radio,
} from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { axiosInstance } from "../../../../axios/axiosInstance";
import { useAuthContext } from "../../../../context/AuthContext";
import { AlertError } from "../../AlertError";
import TextArea from "antd/es/input/TextArea";

export const ModalCUProductos = forwardRef((props, ref) => {
  const { storeLogged, userLogged } = useAuthContext();
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  //props
  const { dataCategory } = props;
  //Loadings
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  //Alerts
  const [visibleAlertError, setVisibleAlertError] = useState(false);
  const [tituloAlerta, setTituloAlerta] = useState("");
  const [descripcionAlerta, setDescripcionAlerta] = useState("");
  //category
  const [idCategoriaEdit, setIdCategoriaEdit] = useState(undefined);
  //precio oferta
  const [valueCheckedPriceOffer, setValueCheckedPriceOffer] = useState("");

  const [form] = Form.useForm();
  const customizeRequiredMark = (label, { required }) => (
    <>
      {label}
      {!required && (
        <span className="ml-1 font-normal text-gray-400">(Opcional)</span>
      )}
    </>
  );

  const childFunction = (id, action, data) => {
    setOpen(true);
    setVisibleAlertError(false);

    console.log(dataCategory);

    if (action === "Edit") {
      setId(id);
      setIsEdit(true);

      form.resetFields();

      form.setFieldsValue({
        nombre: data[0],
        detalle: data[1] === null ? undefined : data[1],
        marca: data[2] === null ? undefined : data[2],
        modelo: data[3] === null ? undefined : data[3],
        precio_c:
          data[4] !== null
            ? data[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            : undefined,
        precio_v:
          data[5] !== null
            ? data[5].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            : undefined,

        stock: data[6],
        stock_critico: data[7] === null ? undefined : data[7],
        categoria: data[10],
        barcode: data[16],
        sku: data[17] === null ? undefined : data[17],
        is_offer_price: data[18] === null ? undefined : data[18],
        offer_price:
          data[19] === null
            ? undefined
            : data[19].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      });

      setIdCategoriaEdit(data[15] === null ? undefined : data[15]);
      setValueCheckedPriceOffer(data[18] === null ? undefined : data[18]);
    } else {
      form.resetFields();
      setIsEdit(false);
    }
  };

  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const createProduct = async () => {
    const formValues = form.getFieldsValue();

    const formData = new FormData();

    formData.append("barcode", formValues.barcode);
    formData.append("sku", formValues.sku === undefined ? "" : formValues.sku);
    formData.append("name", formValues.nombre);
    formData.append(
      "details",
      formValues.detalle !== undefined ? formValues.detalle : ""
    );
    formData.append(
      "brand",
      formValues.marca !== undefined ? formValues.marca : ""
    );
    formData.append(
      "model",
      formValues.modelo !== undefined ? formValues.modelo : ""
    );
    formData.append(
      "fk_id_category",
      formValues.categoria !== undefined ? formValues.categoria : ""
    );
    formData.append(
      "purchase_price",
      formValues.precio_c && formValues.precio_c !== undefined
        ? formValues.precio_c.replace(/[,.]/g, "")
        : ""
    );
    formData.append("sale_price", formValues.precio_v.replace(/[,.]/g, ""));
    formData.append("quantity", formValues.stock);
    formData.append(
      "critical_stock",
      formValues.stock_critico !== undefined ? formValues.stock_critico : ""
    );
    formData.append("is_offer_price", formValues.is_offer_price);
    formData.append(
      "offer_price",
      formValues.is_offer_price === 0
        ? ""
        : formValues.offer_price.replace(/[,.]/g, "")
    );
    formData.append("fk_user_id_created", userLogged.id);
    formData.append("fk_shop_id", storeLogged.id);

    if(formValues.is_offer_price === 1){
      if (
        parseFloat(formValues.offer_price.replace(/[,.]/g, "")) >=
        parseFloat(formValues.precio_v.replace(/[,.]/g, ""))
      ) {
        return message.error("El precio oferta no puede ser mayor al precio venta")
      }
    }

    setIsLoadingButton(true);

    await axiosInstance
      .post("/api/createProduct", formData)
      .then((response) => {
        message.success("Producto creado con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadTable();
      })
      .catch((error) => {
        if (error.response.data.errors && error.response.data.errors.name) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("Ya existe un producto con ese nombre");
          return;
        } else if (
          error.response.data.message ===
          "El sku ya existe en un producto para esta tienda."
        ) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("Ya existe un producto con ese SKU");
          return;
        } else {
          message.error("No se ha podido editar el producto");
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  const updateProduct = async () => {
    setVisibleAlertError(false);

    const formValues = form.getFieldsValue();

    const formData = new FormData();
    formData.append("barcode", formValues.barcode);
    formData.append("sku", formValues.sku === undefined ? "" : formValues.sku);
    formData.append("name", formValues.nombre);
    formData.append(
      "details",
      formValues.detalle !== undefined ? formValues.detalle : ""
    );
    formData.append(
      "brand",
      formValues.marca !== undefined ? formValues.marca : ""
    );
    formData.append(
      "model",
      formValues.modelo !== undefined ? formValues.modelo : ""
    );
    formData.append(
      "fk_id_category",
      idCategoriaEdit === undefined ? "" : idCategoriaEdit
    );
    formData.append(
      "purchase_price",
      formValues.precio_c && formValues.precio_c !== undefined
        ? formValues.precio_c.replace(/[,.]/g, "")
        : ""
    );
    formData.append("sale_price", formValues.precio_v.replace(/[,.]/g, ""));
    formData.append(
      "critical_stock",
      formValues.stock_critico !== undefined ? formValues.stock_critico : ""
    );
    formData.append("is_offer_price", formValues.is_offer_price);
    formData.append(
      "offer_price",
      formValues.is_offer_price === 0
        ? ""
        : formValues.offer_price.replace(/[,.]/g, "")
    );
    formData.append("fk_user_id_updated", userLogged.id);
    formData.append("fk_shop_id", storeLogged.id);

    setIsLoadingButton(true);

    await axiosInstance
      .put("/api/updateProduct/" + id, formData)
      .then((response) => {
        message.success("Producto editado con éxito");
        form.resetFields();
        setOpen(false);
        props.reloadTable();
      })
      .catch((error) => {
        console.log(error);

        if (error.response.data.errors.name) {
          setVisibleAlertError(true);
          setTituloAlerta("Error");
          setDescripcionAlerta("Ya existe un producto con ese nombre");
        } else {
          message.error("No se ha podido editar el producto");
        }
      })
      .finally(function () {
        setIsLoadingButton(false);
      });
  };

  const handleChangePrecioC = (e) => {
    const value = e.target.value;
    // Remover puntos y comas actuales del valor
    const strippedValue = value.replace(/[,.]/g, "");
    // Formatear el valor con puntos y comas cada tres dígitos
    const formattedValue = strippedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Actualizar el valor del campo de entrada
    e.target.value = formattedValue;

    form.setFieldsValue({
      precio_c: e.target.value,
    });
  };

  const handleChangePrecioV = (e) => {
    const value = e.target.value;
    // Remover puntos y comas actuales del valor
    const strippedValue = value.replace(/[,.]/g, "");
    // Formatear el valor con puntos y comas cada tres dígitos
    const formattedValue = strippedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Actualizar el valor del campo de entrada
    e.target.value = formattedValue;

    form.setFieldsValue({
      precio_v: e.target.value,
    });
  };

  const handleCategoriaChange = (value) => {
    setIdCategoriaEdit(value);
  };

  const handleChangePrecioOferta = (e) => {
    const value = e.target.value;
    // Remover puntos y comas actuales del valor
    const strippedValue = value.replace(/[,.]/g, "");
    // Formatear el valor con puntos y comas cada tres dígitos
    const formattedValue = strippedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Actualizar el valor del campo de entrada
    e.target.value = formattedValue;

    form.setFieldsValue({
      offer_price: e.target.value,
    });
  };

  const deleteCategoriaSelected = () => {
    setIdCategoriaEdit(undefined);

    form.setFieldsValue({
      categoria: null,
    });
  };

  return (
    <Modal
      title={isEdit ? "Editar Producto" : "Agregar Producto"}
      centered
      width={800}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form
        form={form}
        className="pt-4"
        layout="vertical"
        requiredMark={customizeRequiredMark}
        scrollToFirstError={{
          behavior: "smooth",
          block: "center",
          inline: "center",
        }}
        onFinish={isEdit ? updateProduct : createProduct}
      >
        {/* bar code, sku*/}
        <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
          {/*bar code*/}
          <Form.Item
            hasFeedback
            name="barcode"
            label="Código de barra"
            rules={[
              {
                required: true,
                message: "Por favor ingresa un código de barra",
                min: 1,
                message: "Mínimo 1 caracteres",
                max: 25,
                message: "Máximo 25 caracteres",
              },
              {
                validator: (_, value) =>
                  value && !/^\s+$/.test(value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "El código de barra no puede contener solo espacios en blanco"
                        )
                      ),
              },
            ]}
          >
            <Input type="text" placeholder="Ingresa código de barra" />
          </Form.Item>

          {/*sku*/}
          <Form.Item
            hasFeedback
            name="sku"
            label="SKU"
            rules={[
              {
                max: 25,
                message: "Máximo 25 caracteres",
              },
              {
                validator: (_, value) => {
                  if (!value) {
                    // Si el campo está vacío, la validación pasa
                    return Promise.resolve();
                  } else if (!/^\s+$/.test(value)) {
                    // Si el valor no consiste únicamente en espacios en blanco, la validación pasa
                    return Promise.resolve();
                  } else {
                    // Si el valor consiste únicamente en espacios en blanco, la validación falla
                    return Promise.reject(
                      new Error(
                        "El SKU no puede contener solo espacios en blanco"
                      )
                    );
                  }
                },
              },
            ]}
          >
            <Input type="text" placeholder="Ingresa modelo" />
          </Form.Item>
        </div>

        {/* Nombre*/}
        <Form.Item
          hasFeedback
          name="nombre"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Por favor ingresa un nombre",
              min: 1,
              message: "Mínimo 1 caracteres",
              max: 30,
              message: "Máximo 30 caracteres",
            },
            {
              validator: (_, value) =>
                value && !/^\s+$/.test(value)
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        "El nombre no puede contener solo espacios en blanco"
                      )
                    ),
            },
          ]}
        >
          <Input type="text" placeholder="Ingresa nombre" />
        </Form.Item>

        {/* Detalles */}
        <Form.Item
          hasFeedback
          name="detalle"
          label="Detalles"
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  // Si el campo está vacío, la validación pasa
                  return Promise.resolve();
                } else if (!/^\s+$/.test(value)) {
                  // Si el valor no consiste únicamente en espacios en blanco, la validación pasa
                  return Promise.resolve();
                } else {
                  // Si el valor consiste únicamente en espacios en blanco, la validación falla
                  return Promise.reject(
                    new Error(
                      "El detalle no puede contener solo espacios en blanco"
                    )
                  );
                }
              },
            },
          ]}
        >
          <TextArea rows={2} type="text" placeholder="Ingresa detalles" />
        </Form.Item>

        {/* Marca modelo*/}
        <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
          {/*Marca*/}
          <Form.Item
            hasFeedback
            name="marca"
            label="Marca"
            rules={[
              {
                max: 35,
                message: "Máximo 35 caracteres",
              },
              {
                validator: (_, value) => {
                  if (!value) {
                    // Si el campo está vacío, la validación pasa
                    return Promise.resolve();
                  } else if (!/^\s+$/.test(value)) {
                    // Si el valor no consiste únicamente en espacios en blanco, la validación pasa
                    return Promise.resolve();
                  } else {
                    // Si el valor consiste únicamente en espacios en blanco, la validación falla
                    return Promise.reject(
                      new Error(
                        "La marca no puede contener solo espacios en blanco"
                      )
                    );
                  }
                },
              },
            ]}
          >
            <Input type="text" placeholder="Ingresa marca" />
          </Form.Item>

          {/*Modelo*/}
          <Form.Item
            hasFeedback
            name="modelo"
            label="Modelo"
            rules={[
              {
                max: 35,
                message: "Máximo 35 caracteres",
              },
              {
                validator: (_, value) => {
                  if (!value) {
                    // Si el campo está vacío, la validación pasa
                    return Promise.resolve();
                  } else if (!/^\s+$/.test(value)) {
                    // Si el valor no consiste únicamente en espacios en blanco, la validación pasa
                    return Promise.resolve();
                  } else {
                    // Si el valor consiste únicamente en espacios en blanco, la validación falla
                    return Promise.reject(
                      new Error(
                        "El modelo no puede contener solo espacios en blanco"
                      )
                    );
                  }
                },
              },
            ]}
          >
            <Input type="text" placeholder="Ingresa modelo" />
          </Form.Item>
        </div>

        {/* Precio compra y venta*/}
        <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
          {/* Precio compra */}
          <Form.Item
            hasFeedback
            name="precio_c"
            label="Precio compra"
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
                  // Si hay un valor, verifica si es un número válido
                  return /^\d+(\.\d+)?$/.test(value.replace(/[,.]/g, ""))
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("El precio solo puede contener números")
                      );
                },
              },
            ]}
          >
            <Input
              onChange={handleChangePrecioC}
              addonBefore="$"
              type="text"
              className="w-full"
              maxLength={11}
              inputmode="numeric"
              placeholder="Ingresa precio"
            />
          </Form.Item>
          {/* Precio venta*/}
          <Form.Item
            hasFeedback
            name="precio_v"
            label="Precio venta"
            rules={[
              {
                required: true,
                message: "Ingresa precio venta",
              },
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
                  // Si hay un valor, verifica si es un número válido
                  return /^\d+(\.\d+)?$/.test(value.replace(/[,.]/g, ""))
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("El precio solo puede contener números")
                      );
                },
              },
            ]}
          >
            <Input
              onChange={handleChangePrecioV}
              addonBefore="$"
              type="text"
              maxLength={11}
              className="w-full"
              placeholder="Ingresa venta"
              inputmode="numeric"
            />
          </Form.Item>
        </div>

        {/* is oferta */}
        <Form.Item
          rules={[
            {
              required: true,
              message: "Por favor selecciona una opción",
            },
          ]}
          hasFeedback
          name="is_offer_price"
          label="Agregar Oferta"
        >
          <Radio.Group
            onChange={(e) => {
              setValueCheckedPriceOffer(e.target.value);
            }}
          >
            <Radio className="font-normal" value={1}>
              Si
            </Radio>
            <Radio checked className="font-normal" value={0}>
              No
            </Radio>
          </Radio.Group>
        </Form.Item>

        {valueCheckedPriceOffer === 1 && (
          <Form.Item
            hasFeedback
            name="offer_price"
            label="Precio oferta"
            rules={[
              {
                required: true,
                message: "Ingresa precio oferta",
              },
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
                  // Si hay un valor, verifica si es un número válido
                  return /^\d+(\.\d+)?$/.test(value.replace(/[,.]/g, ""))
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("El precio solo puede contener números")
                      );
                },
              },
            ]}
          >
            <Input
              onChange={handleChangePrecioOferta}
              addonBefore="$"
              type="text"
              maxLength={11}
              className="w-full"
              placeholder="Ingresa precio oferta"
              inputmode="numeric"
            />
          </Form.Item>
        )}

        {/* Stock y stock critico */}
        <div className="grid grid-cols-1 sm:gap-4 sm:grid-cols-2">
          {/* Stock */}
          <Form.Item
            hasFeedback
            name="stock"
            label="Stock"
            rules={[
              {
                required: true,
                message: "Por favor ingresa stock",
              },
              {
                validator: (_, value) => {
                  if (!value || /^[0-9]+$/.test(value.toString())) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("El stock solo puede contener números.")
                  );
                },
              },
            ]}
          >
            <InputNumber
              type="text"
              disabled={isEdit && true}
              maxLength={9}
              className="w-full"
              inputmode="numeric"
              placeholder="Ingresa stock"
            />
          </Form.Item>

          {/* Stock critico*/}
          <Form.Item
            hasFeedback
            name="stock_critico"
            label="Stock Crítico"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || /^[0-9]+$/.test(value.toString())) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("El stock crítico solo puede contener números.")
                  );
                },
              },
            ]}
          >
            <InputNumber
              type="text"
              maxLength={9}
              className="w-full"
              inputmode="numeric"
              placeholder="Ingresa stock crítico"
            />
          </Form.Item>
        </div>

        {/* Categoria */}
        <div>
          <div className="relative">
            <Form.Item hasFeedback name="categoria" label="Categoría">
              <Select
                hasFeedback
                name="categoria"
                onChange={handleCategoriaChange}
                placeholder="Selecciona categoría"
                options={dataCategory.map((data) => ({
                  value: data.id_category,
                  label: data.name_category,
                }))}
              ></Select>
            </Form.Item>
            <Button
              onClick={() => deleteCategoriaSelected()}
              className="text-gray-400 delete-button-select-opcion text-sm absolute top-20 hover:text-red-500 transition-all"
            >
              Eliminar categoría
            </Button>
          </div>
        </div>

        {visibleAlertError && (
          <div className="my-4">
            <AlertError titulo={tituloAlerta} descripcion={descripcionAlerta} />
          </div>
        )}

        {/* Button */}
        <Form.Item className="m-0 mt-12 p-0 flex justify-end">
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
              htmlType="submit"
            >
              {isEdit ? "Editar Producto" : "Agregar Producto"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
});
