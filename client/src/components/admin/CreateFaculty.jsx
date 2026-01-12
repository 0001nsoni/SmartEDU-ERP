import { useState } from "react";
import { createFaculty } from "../../services/adminApi";

const FACULTY_ROLES = [
  { label: "Lecturer", value: "LECTURER" },
  { label: "Hostel Warden", value: "WARDEN" },
  { label: "Club Incharge", value: "CLUB_INCHARGE" },
  { label: "Transport Manager", value: "TRANSPORT_MANAGER" }
];

export default function CreateFaculty({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "123456",
    employeeId: "",
    facultyType: ["LECTURER"] // ✅ ARRAY
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleRole = (role) => {
    setForm((prev) => {
      const exists = prev.facultyType.includes(role);
      return {
        ...prev,
        facultyType: exists
          ? prev.facultyType.filter(r => r !== role)
          : [...prev.facultyType, role]
      };
    });
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.employeeId) {
      return alert("All required fields must be filled");
    }

    await createFaculty(form);
    alert("Faculty created successfully");
    onCreated();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">
        Create Faculty
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          name="name"
          placeholder="Faculty Name"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="employeeId"
          placeholder="Employee ID"
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      {/* FACULTY ROLES */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">
          Faculty Roles
        </p>

        <div className="grid grid-cols-2 gap-2">
          {FACULTY_ROLES.map((role) => (
            <label
              key={role.value}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={form.facultyType.includes(role.value)}
                onChange={() => toggleRole(role.value)}
              />
              {role.label}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={submit}
        className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
      >
        Create Faculty
      </button>
    </div>
  );
}
