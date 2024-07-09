import React from 'react';
import '../Css/TaskSidebar.css';

const Sidebar = ({ searchTerm, onSearchChange, sortType, onSortChange }) => {
    return (
        <div className="sidebar">
            <h2>Filter Tasks</h2>
            <div className="filter-group">
                <label htmlFor="search">Search:</label>
                <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={onSearchChange}
                    placeholder="Search tasks..."
                />
            </div>
            <div className="filter-group">
                <label htmlFor="sort">Sort By:</label>
                <select id="sort" value={sortType} onChange={onSortChange}>
                    <option value="">Select</option>
                    <option value="name">Name</option>
                    <option value="assignee">Assignee</option>
                    <option value="project">Project</option>
                </select>
            </div>
        </div>
    );
};

export default Sidebar;
