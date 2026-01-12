import { useEffect, useState } from "react";
import { getAllBuses } from "../../services/adminApi";

export default function BusList() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBuses()
      .then((data) => {
        setBuses(data.buses || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Loading buses...</p>;
  if (!buses.length)
    return <p className="text-slate-500">No buses found</p>;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Buses</h3>

      <div className="space-y-3">
        {buses.map((b) => (
          <div
            key={b._id}
            className="p-3 rounded-lg bg-slate-50 flex justify-between"
          >
            <div>
              <p className="font-semibold text-slate-900">
                {b.busNumber}
              </p>
              <p className="text-sm text-slate-600">
                Capacity: {b.capacity}
              </p>
            </div>
            <span className="text-sm text-slate-500">
              Status: {b.status || "Idle"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
