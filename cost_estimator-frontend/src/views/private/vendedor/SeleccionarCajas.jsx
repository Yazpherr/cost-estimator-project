import { Empty } from "antd";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../axios/axiosInstance";
import { LoadingSeccion } from "../../../components/ui/LoadingSeccion";
import { CardBox } from "../../../components/ui/cajas/CardBox";
import { useAuthContext } from "../../../context/AuthContext";
import { POSPRIVATE } from "../../../routes/Paths";
import { useNavigate } from "react-router-dom";

export const SeleccionarCajas = () => {
  const navigate = useNavigate();
  const { isAuthenticated, storeLogged, userLogged, getBox } = useAuthContext();
  const [data, setData] = useState([]);
  const [isLoadingSeccion, setIsLoadingSeccion] = useState(false);

  useEffect(() => {
    if (isAuthenticated && storeLogged != null) {
      getBoxes();
    }
  }, [isAuthenticated, storeLogged]);

  useEffect(() => {
    let id_box = localStorage.getItem("box");

    if (id_box) {
      navigate(POSPRIVATE);
    }
  }, []);

  const getBoxes = async () => {
    setIsLoadingSeccion(true);
    await axiosInstance
      .get("/api/getBoxes/" + storeLogged.id)
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        setIsLoadingSeccion(false);
      });
  };

  const handleButtonOccupyBox = async (id_box) => {
    setIsLoadingSeccion(true);

    const formData = new FormData();
    formData.append("fk_user_occupied_by_id", userLogged.id);

    await axiosInstance
      .put("/api/occupyBox/" + id_box + "/" + storeLogged.id, formData)
      .then((response) => {
        localStorage.setItem("box", id_box);
        getBox();
        navigate(POSPRIVATE);
      })
      .catch((error) => {})
      .finally(function () {
        setIsLoadingSeccion(false);
      });
  };

  return (
    <>
      <div className="mb-12">
        <h2 className="sora-font text-3xl sm:text-4xl font-bold">
          Seleccionar Caja
        </h2>
      </div>

      {isLoadingSeccion ? (
        <LoadingSeccion />
      ) : data.length === 0 ? (
        <Empty description="Actualmente no existen cajas disponibles" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {data.map((item, index) => (
            <CardBox
              index={index}
              occupyBox={handleButtonOccupyBox}
              idBox={item.id_box}
              titleBox={item.title_box}
              status={item.status}
              occupiedBy={
                item.name_occupied_by + " " + item.lastname_occupied_by
              }
            />
          ))}
        </div>
      )}
    </>
  );
};
