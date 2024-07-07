import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  registerUser,
  loginUser,
  logoutUser,
  getAuthenticatedUser
} from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getAuthenticatedUser(token)
        .then(response => {
          if (response.data) {
            setUser({ token, role: response.data.role });
          }
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleRegisterUser = async (userData) => {
    try {
      const response = await registerUser(userData);
      console.log('User registered:', response);
      return response;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const handleLogin = async (userData) => {
    try {
      const response = await loginUser(userData);
      if (response.data && response.data.user && response.data.user.role) {
        localStorage.setItem('token', response.data.token);
        setUser({ token: response.data.token, role: response.data.user.role });
        const role = response.data.user.role;
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'project-owner') {
          navigate('/project-manager-dashboard');
        } else if (role === 'team-member') {
          navigate('/team-member');
        }
        return response;
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await logoutUser(token);
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
      console.log('Logged out');
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
        registerUser: handleRegisterUser,
        loginUser: handleLogin,
        logoutUser: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Definir PropTypes para validar las props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
