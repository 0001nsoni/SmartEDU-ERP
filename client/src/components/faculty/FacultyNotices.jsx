import { useEffect, useState } from "react";
import api from "../../services/api";

export default function FacultyNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    api.get("/notices").then(res => {
      setNotices(res.data.notices || []);
    });
  }, []);

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-lg font-semibold mb-4">Notices</h3>

      {notices.length === 0 ? (
        <p className="text-sm text-slate-500">No notices available</p>
      ) : (
        <div className="space-y-4">
          {notices.map(n => (
            <div
              key={n._id}
              className="border rounded-lg p-4"
            >
              <h4 className="font-semibold text-slate-900">
                {n.title}
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                {n.message}
              </p>

              <div className="text-xs text-slate-400 mt-2 flex justify-between">
                <span>
                  Audience: {n.targetAudience}
                </span>
                <span>
                  {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
