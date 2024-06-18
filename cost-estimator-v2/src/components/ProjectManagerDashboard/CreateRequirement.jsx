import React, { useState } from 'react';
import api from '../../services/api';

const CreateRequirement = () => {
    const [reqProjectId, setReqProjectId] = useState('');
    const [requirementTitle, setRequirementTitle] = useState('');
    const [requirementDescription, setRequirementDescription] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [estimation, setEstimation] = useState('');

    const handleCreateRequirement = async () => {
        try {
            const response = await api.post('/create-requirement', {
                project_id: reqProjectId,
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

    return (
        <div>
            <h2>Create Requirement</h2>
            <input type="text" value={reqProjectId} onChange={(e) => setReqProjectId(e.target.value)} placeholder="Project ID" />
            <input type="text" value={requirementTitle} onChange={(e) => setRequirementTitle(e.target.value)} placeholder="Requirement Title" />
            <input type="text" value={requirementDescription} onChange={(e) => setRequirementDescription(e.target.value)} placeholder="Requirement Description" />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Priority" />
            <input type="number" value={estimation} onChange={(e) => setEstimation(e.target.value)} placeholder="Estimation" />
            <button onClick={handleCreateRequirement}>Create Requirement</button>
        </div>
    );
};

export default CreateRequirement;
