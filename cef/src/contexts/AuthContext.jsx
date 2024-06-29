import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  registerAdmin,
  registerTeamMember,
  registerProjectManager,
  loginAdmin,
  loginTeamMember,
  loginProjectManager,  
  logout,
} from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      setUser({ token, role });
    }
    setLoading(false);
  }, []);

  const handleRegisterAdmin = async (userData) => {
    try {
      const response = await registerAdmin(userData);
      console.log('Admin registered:', response);
      return response;
    } catch (error) {
      console.error('Error registering admin:', error);
      throw error;
    }
  };

  const handleRegisterTeamMember = async (userData) => {
    try {
      const response = await registerTeamMember(userData);
      console.log('Team member registered:', response);
      return response;
    } catch (error) {
      console.error('Error registering team member:', error);
      throw error;
    }
  };

  const handleRegisterProjectManager = async (userData) => {
    try {
      const response = await registerProjectManager(userData);
      console.log('Project manager registered:', response);
      return response;
    } catch (error) {
      console.error('Error registering project manager:', error);
      throw error;
    }
  };

  const handleLoginAdmin = async (userData) => {
    try {
      const response = await loginAdmin(userData);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('role', response.user.role);
      setUser({ token: response.access_token, role: response.user.role });
      navigate('/admin');
      console.log('Admin logged in:', response);
      return response;
    } catch (error) {
      console.error('Error logging in admin:', error);
      throw error;
    }
  };

  const handleLoginTeamMember = async (userData) => {
    try {
      const response = await loginTeamMember(userData);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('role', response.user.role);
      setUser({ token: response.access_token, role: response.user.role });
      navigate('/protected');
      console.log('Team member logged in:', response);
      return response;
    } catch (error) {
      console.error('Error logging in team member:', error);
      throw error;
    }
  };

  const handleLoginProjectManager = async (userData) => {
    try {
      const response = await loginProjectManager(userData);
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('role', response.user.role);
      setUser({ token: response.access_token, role: response.user.role });
      navigate('/project-manager-dashboard');
      console.log('Project manager logged in:', response);
      return response;
    } catch (error) {
      console.error('Error logging in project manager:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setUser(null);
      navigate('/');
      console.log('Logged out:', response);
      return response;
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerAdmin: handleRegisterAdmin,
        registerTeamMember: handleRegisterTeamMember,
        registerProjectManager: handleRegisterProjectManager,
        loginAdmin: handleLoginAdmin,
        loginTeamMember: handleLoginTeamMember,
        loginProjectManager: handleLoginProjectManager,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
