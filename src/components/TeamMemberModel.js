import React, { useState } from 'react';

const TeamMemberModel = ({ member, onSave, onClose }) => {
    const [name, setName] = useState(member.name);
    const [role, setRole] = useState(member.role);

    const handleSubmit = () => {
        onSave({ name, role });
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{member.name ? 'Edit Member' : 'Add Member'}</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Member Name"
                />
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Member Role"
                />
                <button onClick={handleSubmit}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default TeamMemberModel;
