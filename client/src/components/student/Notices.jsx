import { useEffect, useState } from "react";
import gsap from "gsap";
import { getStudentNotices } from "../../services/studentApi";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentNotices()
      .then((data) => {
        setNotices(data.notices || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading notices...</p>;
  }

  if (!notices.length) {
    return <p className="text-slate-500">No notices available</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Notices</h3>

      <div className="space-y-4">
        {notices.map((notice, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-4"
          >
            <h4 className="font-semibold text-slate-900">
              {notice.title}
            </h4>
            <p className="text-sm text-slate-700 mt-1">
              {notice.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
