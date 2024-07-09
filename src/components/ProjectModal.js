import React, { useState } from 'react';

const ProjectModal = ({ project, onSave, onClose }) => {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);

    const handleSubmit = () => {
        onSave({ name, description });
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{project.name ? 'Edit Project' : 'Add Project'}</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Project Name"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Project Description"
                />
                <button onClick={handleSubmit}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ProjectModal;
