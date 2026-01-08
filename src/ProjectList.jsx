import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const fetchProjects = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/projects", {
      params: { page },
    });

    setProjects(res.data.data);
    setLastPage(res.data.last_page);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete project");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <button
            onClick={() => navigate("/projects/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Project
          </button>
        </div>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Tasks</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length ? (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{project.name}</td>
                  <td className="p-3 border-b text-gray-500">
                    {project.description || "-"}
                  </td>
                  <td className="p-3 border-b">{project.tasks_count}</td>
                  <td className="p-3 border-b">
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/projects/edit/${project.id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} of {lastPage}
          </span>
          <button
            disabled={page === lastPage}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
