// src/pages/CreateProject.jsx
import React, { useState } from 'react';
import api from '../../services/api';

const CreateProject = () => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    const [resources, setResources] = useState('');

    const handleCreateProject = async () => {
        try {
            await api.post('/create-project', {
                name: projectName,
                description: projectDescription,
                start_date: startDate,
                end_date: endDate,
                budget: budget,
                resources: resources,
            });
            alert('Proyecto creado exitosamente');
        } catch (error) {
            console.error('Error creando el proyecto:', error);
        }
    };

    return (
        <div>
            <h2>Create Project</h2>
            <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" />
            <input type="text" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Project Description" />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
            <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" />
            <input type="text" value={resources} onChange={(e) => setResources(e.target.value)} placeholder="Resources" />
            <button onClick={handleCreateProject}>Create Project</button>
        </div>
    );
};

export default CreateProject;
