import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Status from './pages/Status';
import Report from './pages/Report';
import Project from './pages/Project';
import TaskManagement from './pages/TaskManagement';
import Task from './pages/Task';



function App() {
  return (
   <>
    <BrowserRouter>
    <Routes>
        <Route path="/"  element={<Home/>} /> 
        <Route path="/signup"  element={<Signup/>} /> 
        <Route path="/signin"  element={<Signin/>} /> 
        <Route path="/project"  element={<Project/>} /> 
        <Route path="/TaskManagament"  element={<TaskManagement/>} /> 
        <Route path="/Task"  element={<Task/>} /> 
        <Route path="/status"  element={<Status/>} /> 
        <Route path="/report"  element={<Report/>} /> 

     
     </Routes>
  </BrowserRouter>
   </>
  );
}

export default App;
