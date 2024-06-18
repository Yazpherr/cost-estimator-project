// src/pages/ProjectManagerDashboard.jsx

import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

const ProjectManagerDashboard = () => {
    const { logout } = useContext(AuthContext);

    // Estados para crear un proyecto
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    const [resources, setResources] = useState('');

    // Estados para crear un requerimiento
    const [projectId, setProjectId] = useState('');
    const [requirementTitle, setRequirementTitle] = useState('');
    const [requirementDescription, setRequirementDescription] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [estimation, setEstimation] = useState('');

    // Función para manejar la creación de proyectos
    const handleCreateProject = async () => {
        try {
            const response = await api.post('/create-project', {
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

    // Función para manejar la creación de requerimientos
    const handleCreateRequirement = async () => {
        try {
            const response = await api.post('/create-requirement', {
                project_id: projectId,
                title: requirementTitle,
                description: requirementDescription,
                category: category,
                priority: priority,
                estimation: estimation,
            });
            alert('Requerimiento creado exitosamente');
        } catch (error) {
            console.error('Error creando el requerimiento:', error);
        }
    };

    // Función para manejar el cierre de sesión
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error cerrando sesión:', error);
        }
    };

    return (
        <div>
            <h1>Project Manager Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            
            <h2>Create Project</h2>
            <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" />
            <input type="text" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder="Project Description" />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
            <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" />
            <input type="text" value={resources} onChange={(e) => setResources(e.target.value)} placeholder="Resources" />
            <button onClick={handleCreateProject}>Create Project</button>
            
            <h2>Create Requirement</h2>
            <input type="text" value={projectId} onChange={(e) => setProjectId(e.target.value)} placeholder="Project ID" />
            <input type="text" value={requirementTitle} onChange={(e) => setRequirementTitle(e.target.value)} placeholder="Requirement Title" />
            <input type="text" value={requirementDescription} onChange={(e) => setRequirementDescription(e.target.value)} placeholder="Requirement Description" />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Priority" />
            <input type="number" value={estimation} onChange={(e) => setEstimation(e.target.value)} placeholder="Estimation" />
            <button onClick={handleCreateRequirement}>Create Requirement</button>
        </div>
    );
};

export default ProjectManagerDashboard;
