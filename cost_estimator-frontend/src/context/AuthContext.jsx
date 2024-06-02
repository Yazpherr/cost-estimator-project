import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosInstance } from "../axios/axiosInstance";
const MY_AUTH_APP = "SESSION_ACTIVE";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem(MY_AUTH_APP)
      ? localStorage.getItem(MY_AUTH_APP)
      : false
  );
  const [userLogged, setUserLogged] = useState(null);
  const [storeLogged, setStoreLogged] = useState(null);
  const [boxLogged, setBoxLogged] = useState(null);

  const [selectedStore, setSelectedStore] = useState(null);

  const logout = useCallback(function () {
    localStorage.removeItem(MY_AUTH_APP);
    localStorage.removeItem("token");
    localStorage.removeItem("u");
    localStorage.removeItem("store");
    localStorage.removeItem("r");
    localStorage.removeItem("box");
    setUserLogged(null);
    setStoreLogged(null);
    setSelectedStore(null);
    setIsAuthenticated(false);
  }, []);

  const getUser = useCallback(async function () {
    let id_user = localStorage.getItem("u");

    let response = await axiosInstance
      .get(`/api/getUserId/${id_user}`)
      .catch((error) => {
        console.log(error);
      });

    setUserLogged(response.data);
  }, []);

  const login = async (values) => {
    let logged = false;
    let rolUser = null;

    await axiosInstance
      .post("/api/login", values)
      .then((response) => {
        localStorage.setItem(MY_AUTH_APP, true);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("u", response.data.user_id);
        localStorage.setItem("r", response.data.user_role);

        setIsAuthenticated(true);

        getUser();

        logged = true;
        rolUser = response.data.user_role;

        if (response.data.id_shop) {
          localStorage.setItem("store", response.data.id_shop);
        }
      })
      .catch((error) => {
        if (error.response.data.message === "Usuario no activo") {
          logged = "desactive";
        }
      })
      .finally(function () {
        getShop();
      });

    return [logged, rolUser];
  };

  useEffect(() => {
    async function checkToken() {
      if (localStorage.getItem("token")) {
        await axiosInstance
          .post("/api/validateToken")
          .then((response) => {})
          .catch((error) => {
            localStorage.removeItem("token");
            localStorage.removeItem("u");
            setUserData(null);
            setIsAuthenticated(false);
          })
          .finally(function () {});
      }
    }
    checkToken();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== null) {
        getUser();
    }
  }, []);

  //Logica tienda
  const getShop = useCallback(async function () {
    let id_shop = localStorage.getItem("store");
    let id_user = localStorage.getItem("u");

    if (id_shop) {
      setStoreLogged(null);
      let response = await axiosInstance
        .get(`/api/getShopId/${id_shop}/${id_user}`)
        .catch((error) => {
          logout();
        });
      setStoreLogged(response.data);
    }
  }, []);

  const handleStore = (value) => {
    setSelectedStore(value);
    localStorage.setItem("store", value);
    getShop();
  };

  useEffect(() => {
    let id_shop = localStorage.getItem("store");

    if (id_shop) {
      getShop();
    }
  }, []);

  //Logica box
  const getBox = useCallback(async function () {
    let id_box = localStorage.getItem("box");
    let id_shop = localStorage.getItem("store");

    if (id_box) {
      setBoxLogged(null);
      let response = await axiosInstance
        .get(`/api/getBoxId/${id_shop}/${id_box}`)
        .catch((error) => {});
      setBoxLogged(response.data);
    }
  }, []);

  useEffect(() => {
    let id_box = localStorage.getItem("box");

    if (id_box) {
      getBox();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        userLogged,
        getShop,
        isAuthenticated,
        logout,
        selectedStore,
        setSelectedStore,
        handleStore,
        storeLogged,
        getUser,
        boxLogged,
        getBox
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
