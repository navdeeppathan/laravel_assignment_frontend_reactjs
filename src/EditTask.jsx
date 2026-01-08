import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    status: "pending",
    project_id: "",
    due_date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await axios.get(
          "http://127.0.0.1:8000/api/projects"
        );
        setProjects(projectRes.data.data);

        const taskRes = await axios.get(
          `http://127.0.0.1:8000/api/tasks/${id}`
        );
        const task = taskRes.data.data;

        setForm({
          title: task.title || "",
          status: task.status || "pending",
          project_id: task.project_id || "",
          due_date: task.due_date || "",
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        alert("Failed to load task");
        navigate("/");
      }
    };

    fetchData();
  }, [id, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/tasks/${id}`, form);
      alert("Task updated successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to update task");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <form
      onSubmit={submit}
      className="max-w-lg mx-auto p-6 bg-white shadow rounded"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border p-2 mb-3"
        placeholder="Task Title"
        required
      />

      <select
        value={form.project_id}
        onChange={(e) => setForm({ ...form, project_id: e.target.value })}
        className="w-full border p-2 mb-3"
        required
      >
        <option value="">Select Project</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="w-full border p-2 mb-3"
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="date"
        value={form.due_date}
        onChange={(e) => setForm({ ...form, due_date: e.target.value })}
        className="w-full border p-2 mb-3"
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Task
      </button>
    </form>
  );
};

export default EditTask;
