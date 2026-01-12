import { useEffect, useState } from "react";
import { getAllHostels } from "../../services/adminApi";

export default function HostelList() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllHostels()
      .then((data) => {
        setHostels(data.hostels || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Loading hostels...</p>;
  if (!hostels.length)
    return <p className="text-slate-500">No hostels found</p>;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Hostels</h3>

      <div className="space-y-3">
        {hostels.map((h) => (
          <div
            key={h._id}
            className="p-3 rounded-lg bg-slate-50 flex justify-between"
          >
            <div>
              <p className="font-semibold text-slate-900">
                {h.name} ({h.type})
              </p>
              <p className="text-sm text-slate-600">
                Rooms: {h.totalRooms}
              </p>
            </div>
            <span className="text-sm text-slate-500">
              Occupied: {h.occupiedRooms || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
