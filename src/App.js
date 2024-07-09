import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Status from './pages/Status';
import Report from './pages/Report';
import Project from './pages/Project';
import TaskManagement from './pages/TaskManagement';
import Task from './pages/Task';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle user sign-in
  const handleSignIn = () => {
    setIsAuthenticated(true);
    // Additional logic to set authentication token, etc.
  };

  // Function to handle user sign-out
  const handleSignOut = () => {
    setIsAuthenticated(false);
    // Additional logic to clear authentication token, etc.
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/signin"
            element={
              <Signin
                onSignIn={handleSignIn}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          {isAuthenticated ? (
            <>
              <Route path="/project" element={<Project />} />
              <Route
                path="/TaskManagement"
                element={<TaskManagement />}
              />
              <Route path="/Task" element={<Task />} />
              <Route path="/status" element={<Status />} />
              <Route path="/report" element={<Report />} />
            </>
          ) : (
            <Navigate to="/signin" />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
