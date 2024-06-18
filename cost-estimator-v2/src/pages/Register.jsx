import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const { registerAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await registerAdmin({ name, email, password, password_confirmation: passwordConfirmation });
            navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;

