import React, { useState } from "react";
import Header from "../components/Header";
import main from "../components/Images/Main.jpg";
import about1 from "../components/Images/about1.png";
import { FaTasks } from 'react-icons/fa';
import "../Css/Home.css";
import CreateTask from "../components/CreateProject";
import Footer from "../components/Footer";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleShow = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <div>
      <Header />

      <div className="home-img">
        <h3>Manage Smart,</h3>
        <h6> Deliver Fast</h6>
        <img src={main} alt="Not Found" />
      </div>

      <div className="home-content">
        <div className="create-task">
          <h1 className="heading">
            <FaTasks className="icon" /> Create the Project
            <p className="subtitle">Fill in the details to create a new task.</p>
          </h1>
          <hr className="divider" />
        
          <a className="create-button" href="/project" >Create Project</a>
        </div>

        {showModal && (
          <CreateTask show={showModal} onClose={handleClose} task={selectedTask} />
        )}

        <div className="text-center">
          <h1 className="heading-proj">Taskify</h1>
          <h6 className="subheading">Project Management and tracking System</h6>

          <div className="image-section">
            
            <img
              src={about1}
              className="image"
              alt="Task Creation and Assignment"
              style={{ marginLeft: "-89%" }}
            />
            <h1 className="section-title" style={{ marginTop: "-15%" }}>
            Project Creation and Management:
            </h1>
            <p className="section-description" style={{ marginLeft: "36%" }}>
           create new projects with fields for project name, description, deadline, and tasks. <br />
           A section that lists all projects with basic details like name, description, and deadline.
           
            </p>
          </div>

          <div className="image-section mt-44">
            <img
              src={about1}
              className="image"
              alt="Task Creation and Assignment"
              style={{ marginLeft: "55%" }}
            />
            <h1 className="section-title" style={{ marginTop: "-20%", marginLeft: "-50%" }}>
              Status of project
            </h1>
            <p className="section-description" style={{ marginLeft: "0%" }}>
             Users can update the status of each project to "Completed," "In Progress," or "Unselected."<br/>
             A section that provides a count of total projects, completed projects, projects in progress, and unselected projects.
            </p>
          </div>

          <div className="image-section mt-28"  >
            <img
              src={about1}
              className="image"
              alt="Task Creation and Assignment"
              style={{ marginLeft: "-70%" }}
            />
            <h1 className="section-title" style={{ marginTop: "-13%", }}>
            Task Management
            </h1>
            <p className="section-description" style={{marginLeft: "36%", marginTop:"0%"}}>
            Users can add tasks to each project. Each task includes fields for task name and assignee. <br />
            Display tasks under each project, along with options to manage task status.
            </p>
          </div>

          <div className="image-section mt-44">
            <img
              src={about1}
              className="image"
              alt="Task Creation and Assignment"
              style={{ marginLeft: "55%" }}
            />
            <h1 className="section-title" style={{ marginTop: "-20%", marginLeft: "-50%" }}>
            Report  of Project
            </h1>
            <p className="section-description" style={{ marginLeft: "0%" }}>
            Integrate charts to visually represent project statuses. This helps users quickly understand the overall progress of their projects. <br />
            Dynamic Charts: Charts update in real-time as project statuses change, providing up-to-date insights into project management.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
