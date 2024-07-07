import { useState, useEffect } from 'react';
import api from '../services/api';

const Protected = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/protected-route');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching protected data:', error.response.data);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Protected Data</h1>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    );
};

export default Protected;
