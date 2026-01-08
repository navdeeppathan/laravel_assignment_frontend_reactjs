import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjrctForm from "./ProjrctForm";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import EditTask from "./EditTask";
import ProjectList from "./ProjectList";
import EditProject from "./EditProject";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/create" element={<ProjrctForm />} />
        <Route path="/projects/edit/:id" element={<EditProject />} />

        <Route path="/tasks" element={<TaskForm />} />
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/edit/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
