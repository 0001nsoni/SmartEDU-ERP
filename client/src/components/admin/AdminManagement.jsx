import { useEffect, useState } from "react";
import {
  getInstitutionAdmins,
  createInstitutionAdmin
} from "../../services/adminApi";
import toast from "react-hot-toast";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const load = async () => {
    const data = await getInstitutionAdmins();
    setAdmins(data.admins || []);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    await createInstitutionAdmin(form);
    toast.success("Admin created");
    setForm({ name: "", email: "", password: "" });
    load();
  };

  return (
    <div className="bg-white rounded-xl border p-6 mt-10">
      <h3 className="text-lg font-semibold mb-4">
        Manage Institution Admins
      </h3>

      {/* CREATE ADMIN */}
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Name"
          className="border p-2 rounded w-1/4"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Email"
          className="border p-2 rounded w-1/4"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-1/4"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <button
          onClick={submit}
          className="bg-black text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* LIST ADMINS */}
      <table className="w-full text-sm">
        <thead className="border-b text-left text-slate-600">
          <tr>
            <th className="py-2">Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((a) => (
            <tr key={a._id} className="border-b">
              <td className="py-2">{a.name}</td>
              <td>{a.email}</td>
              <td>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                  {a.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
