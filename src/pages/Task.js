import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/TaskSidebar';
import '../Css/Task.css';
import '../Css/TaskSidebar.css';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${process.env.backend_url}/api/project/getProjects`);
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const projects = await response.json();
                const allTasks = projects.flatMap(project =>
                    project.tasks.map(task => ({
                        ...task,
                        projectName: project.name,
                        projectId: project._id,
                    }))
                );
                console.log('Fetched Tasks:', allTasks); // Log fetched tasks
                setTasks(allTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortType === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortType === 'assignee') {
            return a.assignee.localeCompare(b.assignee);
        } else if (sortType === 'project') {
            return a.projectName.localeCompare(b.projectName);
        } else {
            return 0;
        }
    });

    const currentDate = new Date();

    return (
        <div className="container-tasks">
            <Header />
            <div className="content">
                <Sidebar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    sortType={sortType}
                    onSortChange={handleSortChange}
                />
                <div className="tasks-section">
                    <h1>All Tasks</h1>
                    <div className="tasks-list">
                        {sortedTasks.map(task => {
                            const taskDeadline = task.deadline ? new Date(task.deadline) : null;
                            if (!taskDeadline) {
                                console.warn(`Task with ID ${task.id} does not have a valid deadline.`);
                            }
                            return (
                                <div
                                    key={task.id}
                                    className={`task-card ${taskDeadline && taskDeadline < currentDate ? 'overdue' : ''}`}
                                >
                                    <div className="task-header">
                                        <h3>Task Name: {task.name}</h3>
                                    </div>
                                    <p><strong>Assignee:</strong> {task.assignee}</p>
                                    <p><strong>Project:</strong> {task.projectName}</p>
                                    {taskDeadline &&
                                        <p><strong>Deadline:</strong> {taskDeadline.toLocaleDateString()}</p>
                                    }
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;
