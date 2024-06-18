import  { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiar a useNavigate
import axiosInstance from '../axios/axiosInstance'; // Importación por defecto

const MY_AUTH_APP = 'SESSION_ACTIVE';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // Cambiar a useNavigate
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem(MY_AUTH_APP)
  );
  const [userLogged, setUserLogged] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem(MY_AUTH_APP);
    localStorage.removeItem('token');
    localStorage.removeItem('u');
    setUserLogged(null);
    setIsAuthenticated(false);
    navigate('/login'); // Cambiar a useNavigate
  }, [navigate]);

  const getUser = useCallback(async () => {
    const id_user = localStorage.getItem('u');
    if (id_user) {
      try {
        const response = await axiosInstance.get(`/api/getUserId/${id_user}`);
        setUserLogged(response.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }
  }, []);

  const login = async (values) => {
    try {
      const response = await axiosInstance.post('/api/login', values);
      localStorage.setItem(MY_AUTH_APP, true);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('u', response.data.user_id);
      setIsAuthenticated(true);
      getUser();
      navigate('/dashboard'); // Cambiar a useNavigate
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
    }
  }, [getUser]);

  return (
    <AuthContext.Provider
      value={{
        login,
        isAuthenticated,
        logout,
        userLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
