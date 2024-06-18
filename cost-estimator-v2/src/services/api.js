// src/services/api.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Añadir un interceptor para incluir el token en las solicitudes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const registerAdmin = async (userData) => {
    try {
        const response = await api.post('/register-admin', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering admin:', error.response.data);
        throw error;
    }
};

export const loginAdmin = async (userData) => {
    try {
        const response = await api.post('/login-admin', userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in admin:', error.response.data);
        throw error;
    }
};

export const registerProjectManager = async (userData) => {
    try {
        const response = await api.post('/register-project-manager', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering project manager:', error.response.data);
        throw error;
    }
};

export const loginProjectManager = async (userData) => {
    try {
        const response = await api.post('/login-project-manager', userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in project manager:', error.response.data);
        throw error;
    }
};

export const registerTeamMember = async (userData) => {
    try {
        const response = await api.post('/register-team-member', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering team member:', error.response.data);
        throw error;
    }
};

export const loginTeamMember = async (userData) => {
    try {
        const response = await api.post('/login-team-member', userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in team member:', error.response.data);
        throw error;
    }
};

export const assignTeamMember = async (projectId, userData) => {
    try {
        const response = await api.post(`/projects/${projectId}/assign-team-member`, userData);
        return response.data;
    } catch (error) {
        console.error('Error assigning team member:', error.response.data);
        throw error;
    }
};

export const removeTeamMember = async (projectId, userId) => {
    try {
        const response = await api.delete(`/projects/${projectId}/remove-team-member/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing team member:', error.response.data);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/logout');
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error.response.data);
        throw error;
    }
};

export default api;
