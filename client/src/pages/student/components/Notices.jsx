import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function Notices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    api.get("/notices/my").then(res => {
      setNotices(res.data.notices);
    });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border">
      <h3 className="font-semibold mb-4">
        Notices
      </h3>

      <ul className="space-y-3">
        {notices.map(n => (
          <li key={n._id}>
            <p className="font-medium">{n.title}</p>
            <p className="text-sm text-slate-600">
              {n.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
