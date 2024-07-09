import React, { useState } from 'react';
import '../Css/Project.css';
import Header from '../components/Header';

const CreateProject = () => {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [tasks, setTasks] = useState([{ id: 1, name: '', assignee: '' }]);

    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);

    const handleAddProject = () => {
        const newProject = {
            id: projects.length + 1,
            name: projectName,
            description: projectDescription,
            tasks: tasks.filter(task => task.name),
        };
        setProjects([...projects, newProject]);
        setProjectName('');
        setProjectDescription('');
        setTasks([{ id: 1, name: '', assignee: '' }]);
        handleCloseForm();
    };

    const handleTaskChange = (index, field, value) => {
        const newTasks = [...tasks];
        newTasks[index][field] = value;
        setTasks(newTasks);
    };

    const handleAddTask = () => {
        setTasks([...tasks, { id: tasks.length + 1, name: '', assignee: '' }]);
    };

    const handleDeleteProject = (projectId) => {
        const updatedProjects = projects.filter(project => project.id !== projectId);
        setProjects(updatedProjects);
    };

    return (
        <div className="container-project">
            <Header />
            
            <h1 className='project-heading'>Project Management Tool</h1>
            <button className="create-button" onClick={handleShowForm}>
                + Create Project
            </button>

            <div className="projects-section">
                {projects.map((project) => (
                    <div className="project-card" key={project.id}>
                        <div className="project-header">
                            <h3>{project.name}</h3>
                        </div>
                        <p>{project.description}</p>
                        <h4>Tasks:</h4>
                        <ul>
                            {project.tasks.map((task, index) => (
                                <li key={index}>
                                    <strong>{task.name}</strong> - {task.assignee}
                                </li>
                            ))}
                        </ul>
                        <button className="delete-button" onClick={() => handleDeleteProject(project.id)}>
                                Delete
                            </button>s
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseForm}>&times;</span>
                        <h2>Create Project</h2>
                        <input 
                            type="text" 
                            placeholder="Project Name" 
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        <textarea 
                            placeholder="Project Description" 
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                        />
                        <h3>Tasks</h3>
                        {tasks.map((task, index) => (
                            <div key={index} className="task-input">
                                <input 
                                    type="text" 
                                    placeholder="Task Name" 
                                    value={task.name}
                                    onChange={(e) => handleTaskChange(index, 'name', e.target.value)}
                                />
                                <input 
                                    type="text" 
                                    placeholder="Assignee" 
                                    value={task.assignee}
                                    onChange={(e) => handleTaskChange(index, 'assignee', e.target.value)}
                                />
                            </div>
                        ))}
                        <button className="add-task-button" onClick={handleAddTask}>Add Task</button>
                        <button className="add-project-button" onClick={handleAddProject}>
                            Add Project
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateProject;
