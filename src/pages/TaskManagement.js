// TaskManagement.js
import React, { useState, useEffect } from 'react';
// import '../Css/TaskManagement.css'; 
import Header from '../components/Header';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks data from API or local storage
        const fetchTasks = async () => {
            try {
                // Replace with actual API endpoint or localStorage handling
                const response = await fetch('/api/tasks');
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const tasksData = await response.json();
                setTasks(tasksData);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                // Handle fetch error
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="container-task-management">
            <Header />

            <h1 className='task-heading'>Task Management</h1>
            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className="task-card">
                        <h3>{task.name}</h3>
                        <p><strong>Assignee:</strong> {task.assignee}</p>
                        {/* Add additional task details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManagement;
