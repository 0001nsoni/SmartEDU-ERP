import { useEffect, useState } from "react";
import { createBus, getRoutes } from "../../services/adminApi";

export default function CreateBus({ onCreated }) {
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    busNumber: "",
    capacity: "",
    routeId: ""
  });

  useEffect(() => {
    getRoutes().then(res => setRoutes(res.routes || []));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await createBus(form);
    onCreated();
    alert("Bus created");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Create Bus</h3>

      <input
        name="busNumber"
        placeholder="Bus Number"
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        name="capacity"
        placeholder="Capacity"
        type="number"
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <select
        name="routeId"
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="">Select Route</option>
        {routes.map((r) => (
          <option key={r._id} value={r._id}>
            {r.routeName}
          </option>
        ))}
      </select>

      <button
        onClick={submit}
        disabled={!form.routeId}
        className="mt-2 px-6 py-2 bg-black text-white rounded-lg disabled:opacity-50"
      >
        Create Bus
      </button>
    </div>
  );
}
