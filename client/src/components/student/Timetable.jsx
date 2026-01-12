import { useEffect, useState } from "react";
import { getStudentTimetable } from "../../services/studentApi";

export default function Timetable() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentTimetable()
      .then((data) => {
        setLectures(data.lectures || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Loading timetable...</p>;
  if (!lectures.length)
    return <p className="text-slate-500">No lectures today</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Today’s Timetable</h3>

      <div className="space-y-3">
        {lectures.map((lec, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-4"
          >
            <p className="font-semibold text-slate-900">
              {lec.subject}
            </p>
            <p className="text-sm text-slate-600">
              {lec.startTime} – {lec.endTime} · {lec.room}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
