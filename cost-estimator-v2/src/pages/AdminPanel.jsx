// src/pages/AdminPanel.jsx

import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AdminPanel = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { registerProjectManager, logout } = useContext(AuthContext);

    const handleRegisterProjectManager = async () => {
        try {
            await registerProjectManager({ name, email, password, password_confirmation: passwordConfirmation });
            alert('Project Manager registered successfully');
        } catch (error) {
            console.error('Error registering project manager:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <button onClick={handleLogout}>Logout</button>
            <h2>Register Project Manager</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" />
            <button onClick={handleRegisterProjectManager}>Register Project Manager</button>
        </div>
    );
};

export default AdminPanel;
