import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Configurar una instancia de Axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para añadir el token de autorización a cada solicitud
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Método para registrar un nuevo usuario (team-member)
export const registerUser = (userData) => {
    return api.post('/register', userData);
};

// Método para iniciar sesión
export const loginUser = (loginData) => {
    return api.post('/login', loginData);
};

// Método para cerrar sesión
export const logoutUser = () => {
    return api.post('/logout');
};

// Método para obtener el usuario autenticado
export const getAuthenticatedUser = () => {
    return api.get('/user');
};




export default api;
