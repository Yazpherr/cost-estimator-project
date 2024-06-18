// src/pages/Login.jsx

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginAdmin, loginProjectManager, loginTeamMember } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLoginAdmin = async () => {
        try {
            await loginAdmin({ email, password });
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleLoginProjectManager = async () => {
        try {
            await loginProjectManager({ email, password });
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleLoginTeamMember = async () => {
        try {
            await loginTeamMember({ email, password });
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLoginAdmin}>Login as Admin</button>
            <button onClick={handleLoginProjectManager}>Login as Project Manager</button>
            <button onClick={handleLoginTeamMember}>Login as Team Member</button>
        </div>
    );
};

export default Login;
