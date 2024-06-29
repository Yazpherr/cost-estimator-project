import React, { useState } from 'react';
import api from '../../services/api';

const AssignTeamMember = () => {
    const [assignProjectId, setAssignProjectId] = useState('');
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('');

    const handleAssignTeamMember = async () => {
        try {
            const response = await api.post(`/projects/${assignProjectId}/assign-team-member`, {
                user_id: userId,
                role: role,
            });
            alert('Miembro del equipo asignado exitosamente');
        } catch (error) {
            console.error('Error asignando el miembro del equipo:', error);
        }
    };

    return (
        <div className="flex-1 p-10 border-l border-gray-200">
            <h1 className="text-2xl font-bold mb-4">Assign Team Member</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleAssignTeamMember(); }}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignProjectId">
                        Project ID
                    </label>
                    <input
                        type="text"
                        name="assignProjectId"
                        value={assignProjectId}
                        onChange={(e) => setAssignProjectId(e.target.value)}
                        placeholder="Project ID"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
                        User ID
                    </label>
                    <input
                        type="text"
                        name="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                        Role
                    </label>
                    <input
                        type="text"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Role"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Assign Team Member
                </button>
            </form>
        </div>
    );
};

export default AssignTeamMember;
