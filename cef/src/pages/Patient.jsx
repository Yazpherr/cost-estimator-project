import { useEffect, useState } from 'react';
import Logout from '../pages/Logout'; // Asegúrate de que la ruta sea correcta

const Patient = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        document.title = "Paciente";
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div>
            <h1>Bienvenido {user.name}</h1>
            <p>Aquí puedes ver y gestionar la información del paciente.</p>
            <Logout /> {/* Agregar el botón de Logout */}
        </div>
    );
};

export default Patient;
