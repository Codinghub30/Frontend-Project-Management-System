import React, { useState, useEffect } from 'react';
import '../Css/Project.css';
import Header from '../components/Header';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectDeadline, setProjectDeadline] = useState('');
    const [tasks, setTasks] = useState([{ id: 1, name: '', assignee: '' }]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${process.env.backend_url}/api/project/getProjects`);
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.log(error.message);
            } 
        };

        fetchProjects();
    }, []);

    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);

    const handleAddProject = async () => {
        try {
            const newProject = {
                name: projectName,
                description: projectDescription,
                deadline: projectDeadline,
                tasks: tasks.filter(task => task.name),
                status: 'pending',
            };

            const response = await fetch(`${process.env.backend_url}/api/project/CreateProjects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProject),
            });

            if (!response.ok) {
                throw new Error('Failed to create project');
            }

            const createdProject = await response.json();
            setProjects(prevProjects => [...prevProjects, createdProject]);
            resetForm();
        } catch (error) {
            console.error('Error creating project:', error);
            // Handle error state or show error message to user
        }
    };

    const handleTaskChange = (index, field, value) => {
        const newTasks = [...tasks];
        newTasks[index][field] = value;
        setTasks(newTasks);
    };

    const handleAddTask = () => {
        setTasks([...tasks, { id: tasks.length + 1, name: '', assignee: '' }]);
    };

    const handleDeleteProject = async (projectId) => {
        try {
            const response = await fetch(`${process.env.backend_url}/api/project/DeleteProject/${projectId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete project');
            }
    
            setProjects(prevProjects => prevProjects.filter(project => project._id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };
   

   const handleStatusChange = async (projectId, status) => {
    try {
        const response = await fetch(`${process.env.backend_url}/api/project/projects/${projectId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            throw new Error('Failed to update project status');
        }

        const updatedProject = await response.json();

        // Update projects state with updated status
        setProjects(prevProjects =>
            prevProjects.map(project =>
                project._id === projectId ? { ...project, status: updatedProject.status } : project
            )
        );

        // Update local storage with updated status
        const updatedProjects = projects.map(project =>
            project._id === projectId ? { ...project, status: updatedProject.status } : project
        );
        localStorage.setItem('projects', JSON.stringify(updatedProjects));

    } catch (error) {
        console.error('Error updating project status:', error);
    }
};

    
    

    const handleShowModal = (description) => {
        setModalContent(description);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    const sortedProjects = [...projects].sort((a, b) => {
        if (sortType === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortType === 'deadline') {
            return new Date(a.deadline) - new Date(b.deadline);
        } else {
            return projects;
        }
    });

    const filteredProjects = sortedProjects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const resetForm = () => {
        setProjectName('');
        setProjectDescription('');
        setProjectDeadline('');
        setTasks([{ id: 1, name: '', assignee: '' }]);
        handleCloseForm();
    };

    return (
        <div className="container-project">
            <Header />
            
            <h1 className='project-heading'>Project Management Tool</h1>
            <div className="controls">
                <button className="create-button" onClick={handleShowForm}>
                    + Create Project
                </button>
                <input
                    type="text"
                    className='search'
                    placeholder="Search Projects"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select value={sortType} onChange={handleSortChange}>
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="deadline">Deadline</option>
                </select>
            </div>

            <div className="projects-section">
                {filteredProjects.map((project) => (
                    <div className="project-card" key={project._id}>
                        <div className="project-header">
                            <h3>Project Name: {project.name}</h3>
                        </div>
                        <p>{project.description.length > 12 ? `${project.description.substring(0, 12)}...` : project.description}</p>
                        {project.description.length > 12 && (
                            <button onClick={() => handleShowModal(project.description)}>Show More</button>
                        )}
                        {project.deadline && (
                            <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
                        )}
                        <h4>Tasks:</h4>
                        <ul>
                            {project.tasks.map((task, taskIndex) => (
                                <li key={taskIndex}>
                                    <strong>Task Name:</strong> {task.name} <br />
                                    <strong>Assignees:</strong> {task.assignee}
                                </li>
                            ))}
                        </ul>
                        <div className="status-checkboxes">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={project.status === 'complete'}
                                    onChange={(e) => handleStatusChange(project._id, e.target.checked ? 'complete' : 'pending')}
                                />
                                Complete
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={project.status === 'inprogress'}
                                    onChange={(e) => handleStatusChange(project._id, e.target.checked ? 'inprogress' : 'pending')}
                                />
                                In Progress
                            </label>
                        </div>
                        <button className="delete-button" onClick={() => handleDeleteProject(project._id)}>
                            Delete
                        </button>
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
                        <input
                            type="date"
                            placeholder="Deadline"
                            value={projectDeadline}
                            onChange={(e) => setProjectDeadline(e.target.value)}
                        />
                        <h3>Tasks</h3>
                        {tasks.map((task, index) => (
                            <div key={index}>
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
                        <button className='addTask' onClick={handleAddTask}>Add Task</button>
                        <button className="submit-button" onClick={handleAddProject}>
                            Add Project
                        </button>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <p>{modalContent}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Project;
