import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/projects", form);
      alert("Project added successfully");
      setForm({ name: "", description: "" });
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response.data.message || err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
            Create Project
          </h2>
          <button>
            <a
              href="/"
              className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Back
            </a>
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Project Name
            </label>
            <input
              type="text"
              placeholder="Enter project name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter project description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
