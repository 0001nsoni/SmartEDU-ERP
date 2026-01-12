import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function CreateAdmin() {
  const [institutions, setInstitutions] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    institutionId: ""
  });

  useEffect(() => {
    API.get("/institutions").then(res =>
      setInstitutions(res.data.institutions)
    );
  }, []);

  const submit = async () => {
    await API.post("/super-admin/create-admin", form);
    toast.success("Admin created");
  };

  return (
    <div className="bg-white p-6 rounded-xl border">
      <h3 className="text-lg font-semibold mb-4">
        Create Institution Admin
      </h3>

      <select
        className="border p-2 w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, institutionId: e.target.value })
        }
      >
        <option value="">Select Institution</option>
        {institutions.map(i => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        className="border p-2 w-full mb-3"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={submit}
        className="bg-green-300 text-white px-4 py-2 rounded"
      >
        Create Admin
      </button>
    </div>
  );
}
