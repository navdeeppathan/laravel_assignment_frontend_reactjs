import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [task, setTask] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState({
    status: "",
    project_id: "",
    search: "",
  });
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/projects").then((res) => {
      setProjects(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks", {
        params: { ...filter, page },
      })
      .then((res) => {
        setTask(res.data.data ?? res.data);
        setLastPage(res.data.last_page ?? 1);
      });
  }, [filter, page]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`);

      setTask((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Task List
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/tasks")}
              className="px-4 py-2 rounded-2xl bg-blue-500 text-white text-sm "
            >
              Add Tasks
            </button>
            <button
              onClick={() => navigate("/projects/create")}
              className="px-4 py-2 rounded-2xl bg-amber-300 text-white text-sm"
            >
              Add Projects
            </button>
            <button
              onClick={() => navigate("/projects")}
              className="px-4 py-2 rounded-2xl bg-green-500 text-white text-sm"
            >
              All Projects
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFilter({ ...filter, project_id: e.target.value })
            }
          >
            <option value="">All Projects</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search task..."
            className="border rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-600">
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Project</th>
                <th className="px-4 py-3 border-b">Due Date</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {task.length > 0 ? (
                task.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition text-sm"
                  >
                    <td className="px-4 py-3 border-b">{item.title}</td>

                    <td className="px-4 py-3 border-b capitalize">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
        ${
          item.status === "completed"
            ? "bg-green-100 text-green-700"
            : item.status === "in_progress"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }
      `}
                      >
                        {item.status.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-4 py-3 border-b">{item.project?.name}</td>

                    <td className="px-4 py-3 border-b text-gray-500">
                      {item.due_date}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-3 border-b">
                      <div className="flex gap-3">
                        <button
                          onClick={() => navigate(`/tasks/edit/${item.id}`)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:underline text-sm"
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
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-lg border text-sm
              ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            Prev
          </button>

          <span className="text-sm font-medium">
            Page {page} of {lastPage}
          </span>

          <button
            disabled={page === lastPage}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-lg border text-sm
              ${
                page === lastPage
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
