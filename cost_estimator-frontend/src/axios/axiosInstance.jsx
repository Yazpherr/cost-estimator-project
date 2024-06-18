import axios from 'axios';
import { LOGOUT } from '../routes/Paths';

// LOCAL
const baseURL = 'http://127.0.0.1:8000/api/';

// Obtener el token de acceso desde localStorage
async function getAccessToken() {
  return localStorage.getItem('token');
}

// Crear una instancia de axios con la configuración base
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Añadir el token en cada petición
axiosInstance.interceptors.request.use(
  async (req) => {
    const access_token = await getAccessToken();

    if (access_token) {
      req.headers['Authorization'] = 'Bearer ' + access_token;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Manejar respuestas de la API
axiosInstance.interceptors.response.use(
  (response) => {
    if (
      response.data.message === 'Token expirado' ||
      response.data.message === 'Token inválido' ||
      response.data.message === 'Token no encontrado'
    ) {
      window.location.href = LOGOUT;
    }
    return response;
  },
  (error) => {
    if (
      error.response.data.message === 'Token expirado' ||
      error.response.data.message === 'Token inválido' ||
      error.response.data.message === 'Token no encontrado'
    ) {
      window.location.href = LOGOUT;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; // Exportar por defecto
