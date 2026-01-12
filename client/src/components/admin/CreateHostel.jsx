import { useState } from "react";
import { createHostel } from "../../services/adminApi";

export default function CreateHostel({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    type: "BOYS",
    totalRooms: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await createHostel(form);
    onCreated();
    alert("Hostel created");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">
        Create Hostel
      </h3>

      <input
        name="name"
        placeholder="Hostel Name"
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <select
        name="type"
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="BOYS">Boys</option>
        <option value="GIRLS">Girls</option>
      </select>

      <input
        name="totalRooms"
        placeholder="Total Rooms"
        type="number"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        onClick={submit}
        className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
      >
        Create Hostel
      </button>
    </div>
  );
}
