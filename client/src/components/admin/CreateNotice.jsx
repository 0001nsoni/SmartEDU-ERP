import { useState } from "react";
import { createNotice } from "../../services/adminApi";

export default function CreateNotice({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    message: "",
    targetAudience: "ALL"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await createNotice(form);
    onCreated();
    alert("Notice posted");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">
        Create Notice
      </h3>

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <textarea
        name="message"
        placeholder="Message"
        rows="4"
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <select
        name="targetAudience"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="ALL">All</option>
        <option value="STUDENT">Students</option>
        <option value="FACULTY">Faculty</option>
      </select>

      <button
        onClick={submit}
        className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
      >
        Post Notice
      </button>
    </div>
  );
}
