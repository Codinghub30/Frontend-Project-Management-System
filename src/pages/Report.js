import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Header from '../components/Header';
import '../Css/Report.css';

const COLORS = ['#0088FE', '#00C49F'];

const Report = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        setProjects(storedProjects);
    }, []);

    // Calculate complete and in-progress projects
    const completeProjects = projects.filter(project => project.status === 'complete').length;
    const inProgressProjects = projects.filter(project => project.status === 'inprogress').length;

    // Prepare data for Task Status PieChart
    const statusData = [
        { name: 'Complete', value: completeProjects },
        { name: 'In Progress', value: inProgressProjects },
    ];


    // Prepare data for Task Progress BarChart
    const progressData = projects.map(project => ({
        name: project.name,
        status: project.status === 'complete' ? 100 : 50, // Placeholder logic for status, adjust as per actual data
    }));

    return (
        <div className="report-page">
            <Header />
            <h1 className='heading-report'>Project Status Report</h1>

            {/* Task Status PieChart */}
            <div className="chart-item">
                <h2>Task Status</h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={statusData}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>

       

            {/* Task Progress BarChart */}
            <div className="chart-item">
                <h2>Task Progress</h2>
                <BarChart width={600} height={300} data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="status" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    );
};

export default Report;
