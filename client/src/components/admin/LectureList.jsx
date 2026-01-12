import { useEffect, useState } from "react";
import api from "../../services/api";

export default function LectureList() {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    api.get("/lectures").then(res => {
      setLectures(res.data.lectures || []);
    });
  }, []);

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold mb-4">Lectures</h3>

      {lectures.length === 0 ? (
        <p className="text-sm text-slate-500">No lectures</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {lectures.map(l => (
            <li key={l._id}>
              {l.day} {l.startTime}-{l.endTime} · {l.subjectId?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
