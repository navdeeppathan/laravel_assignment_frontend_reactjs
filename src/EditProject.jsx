import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/projects/${id}`)
      .then((res) => setForm(res.data));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/projects/${id}`, form);
      alert("Project updated successfully");
      navigate("/projects");
    } catch (err) {
      alert(err.response.data.error || "Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-5">Edit Project</h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          <textarea
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows="3"
            className="w-full border px-3 py-2 rounded-lg resize-none"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Update Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
