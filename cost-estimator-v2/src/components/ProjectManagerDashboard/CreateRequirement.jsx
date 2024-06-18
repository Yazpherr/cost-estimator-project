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
        <div className="flex-1 p-10 border-l border-gray-200">
            <h1 className="text-2xl font-bold mb-4">Create Requirement</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateRequirement(); }}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reqProjectId">
                        Project ID
                    </label>
                    <input
                        type="text"
                        name="reqProjectId"
                        value={reqProjectId}
                        onChange={(e) => setReqProjectId(e.target.value)}
                        placeholder="Project ID"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requirementTitle">
                        Requirement Title
                    </label>
                    <input
                        type="text"
                        name="requirementTitle"
                        value={requirementTitle}
                        onChange={(e) => setRequirementTitle(e.target.value)}
                        placeholder="Requirement Title"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requirementDescription">
                        Requirement Description
                    </label>
                    <input
                        type="text"
                        name="requirementDescription"
                        value={requirementDescription}
                        onChange={(e) => setRequirementDescription(e.target.value)}
                        placeholder="Requirement Description"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
                        Priority
                    </label>
                    <input
                        type="text"
                        name="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        placeholder="Priority"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimation">
                        Estimation
                    </label>
                    <input
                        type="number"
                        name="estimation"
                        value={estimation}
                        onChange={(e) => setEstimation(e.target.value)}
                        placeholder="Estimation"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Create Requirement
                </button>
            </form>
        </div>
    );
};

export default CreateRequirement;
