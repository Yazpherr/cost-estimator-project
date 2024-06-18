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
        <div>
            <h2>Assign Team Member</h2>
            <input type="text" value={assignProjectId} onChange={(e) => setAssignProjectId(e.target.value)} placeholder="Project ID" />
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
            <button onClick={handleAssignTeamMember}>Assign Team Member</button>
        </div>
    );
};

export default AssignTeamMember;
