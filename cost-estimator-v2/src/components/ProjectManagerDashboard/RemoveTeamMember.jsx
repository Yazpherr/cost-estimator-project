import React, { useState } from 'react';
import api from '../../services/api';

const RemoveTeamMember = () => {
    const [removeProjectId, setRemoveProjectId] = useState('');
    const [removeUserId, setRemoveUserId] = useState('');

    const handleRemoveTeamMember = async () => {
        try {
            const response = await api.delete(`/projects/${removeProjectId}/remove-team-member/${removeUserId}`);
            alert('Miembro del equipo removido exitosamente');
        } catch (error) {
            console.error('Error removiendo el miembro del equipo:', error);
        }
    };

    return (
        <div className="flex-1 p-10 border-l border-gray-200">
            <h1 className="text-2xl font-bold mb-4">Remove Team Member</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleRemoveTeamMember(); }}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="removeProjectId">
                        Project ID
                    </label>
                    <input
                        type="text"
                        name="removeProjectId"
                        value={removeProjectId}
                        onChange={(e) => setRemoveProjectId(e.target.value)}
                        placeholder="Project ID"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="removeUserId">
                        User ID
                    </label>
                    <input
                        type="text"
                        name="removeUserId"
                        value={removeUserId}
                        onChange={(e) => setRemoveUserId(e.target.value)}
                        placeholder="User ID"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Remove Team Member
                </button>
            </form>
        </div>
    );
};

export default RemoveTeamMember;
