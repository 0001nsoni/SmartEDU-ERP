import { useEffect, useState } from "react";
import { getAllRoutes } from "../../services/adminApi";

export default function RouteList() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRoutes()
      .then((data) => {
        setRoutes(data.routes || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Loading routes...</p>;
  if (!routes.length)
    return <p className="text-slate-500">No routes found</p>;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Routes</h3>

      <div className="space-y-3">
        {routes.map((r) => {
          const start = r.stops?.[0]?.name;
          const end = r.stops?.[r.stops.length - 1]?.name;

          return (
            <div
              key={r._id}
              className="p-3 rounded-lg bg-slate-50"
            >
              <p className="font-semibold text-slate-900">
                {r.routeName}
              </p>

              <p className="text-sm text-slate-600">
                {start} → {end}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Stops: {r.stops.length}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
