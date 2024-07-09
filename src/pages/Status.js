import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../Css/Status.css';

const Status = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        setProjects(storedProjects);
    }, []);

    const completeProjects = projects.filter(project => project.status === 'complete');
    const inProgressProjects = projects.filter(project => project.status === 'inprogress');
    const unselectedProjects = projects.filter(project => project.status === 'pending');

    const currentDate = new Date();

    const renderProjectCards = (projectList, title) => {
        return (
            <div className="status-category">
                <h2>{title}</h2>
                {projectList.length > 0 ? (
                    <div className="project-cards-container">
                        {projectList.map(project => (
                            <div 
                                key={project._id} 
                                className={`project-card ${(project.status === 'inprogress' && new Date(project.deadline) < currentDate) ? 'expired' : ''}`}
                            >
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                                <h4>Tasks:</h4>
                                <ul>
                                    {project.tasks.map((task, taskIndex) => (
                                        <li key={taskIndex}>
                                            <strong>Task Name:</strong> {task.name} <br />
                                            <strong>Assignees:</strong> {task.assignee}
                                        </li>
                                    ))}
                                </ul>
                                {project.deadline && (
                                    <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No {title.toLowerCase()} projects.</p>
                )}
            </div>
        );
    };

    return (
        <div className="container-status">
            <Header />
            <h1 className='status-heading'>Project Status</h1>
            <div className="status-section">
                {renderProjectCards(completeProjects, 'Completed Projects')}
                {renderProjectCards(inProgressProjects, 'In Progress Projects')}
                {renderProjectCards(unselectedProjects, 'Pending Projects')}
            </div>
        </div>
    );
};

export default Status;
