import { useEffect, useState } from "react";
import { getAllNotices } from "../../services/adminApi";

export default function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNotices()
      .then((data) => {
        setNotices(data.notices || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Loading notices...</p>;
  if (!notices.length)
    return <p className="text-slate-500">No notices found</p>;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">
        All Notices
      </h3>

      <div className="space-y-3">
        {notices.map((n) => (
          <div
            key={n._id}
            className="p-3 rounded-lg bg-slate-50"
          >
            <p className="font-semibold text-slate-900">
              {n.title}
            </p>
            <p className="text-sm text-slate-700">
              {n.message}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Audience: {n.targetAudience}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
