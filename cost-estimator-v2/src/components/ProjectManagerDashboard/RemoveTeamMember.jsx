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
        <div>
            <h2>Remove Team Member</h2>
            <input type="text" value={removeProjectId} onChange={(e) => setRemoveProjectId(e.target.value)} placeholder="Project ID" />
            <input type="text" value={removeUserId} onChange={(e) => setRemoveUserId(e.target.value)} placeholder="User ID" />
            <button onClick={handleRemoveTeamMember}>Remove Team Member</button>
        </div>
    );
};

export default RemoveTeamMember;
