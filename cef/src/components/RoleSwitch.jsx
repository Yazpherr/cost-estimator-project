
import React from 'react';

const RoleSwitch = ({ roles, selectedRole, setSelectedRole }) => {
  return (
    <div className="flex justify-center mt-6">
      <div className="flex bg-gradient-to-r from-blue-500 to-blue-800 p-1 rounded-full">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 rounded-full text-white ${
              selectedRole === role ? 'bg-white text-blue-800' : ''
            } transition duration-300`}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSwitch;
