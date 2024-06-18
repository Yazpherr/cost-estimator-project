import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Protected from './pages/Protected';
import Logout from './pages/Logout';
import Patient from './pages/Patient';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/protected" element={<ProtectedRoute><Protected /></ProtectedRoute>} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/patient" element={<ProtectedRoute><Patient /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
