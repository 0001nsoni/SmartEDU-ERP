import { useEffect, useState } from "react";
import api from "../../../services/api";

const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY"
];

export default function TodayLectures() {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    api.get("/students/me").then(res => {
      const s = res.data.student;
      const day = DAYS[new Date().getDay()];

      api.get(`/lectures`, {
        params: {
          courseId: s.courseId._id,
          year: s.year,
          section: s.section
        }
      }).then(r => {
        setLectures(
          r.data.lectures.filter(l => l.day === day)
        );
      });
    });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border">
      <h3 className="font-semibold mb-3">
        Today's Lectures
      </h3>

      {lectures.length === 0 && (
        <p className="text-sm text-slate-500">
          No lectures today
        </p>
      )}

      <ul className="space-y-2">
        {lectures.map(l => (
          <li
            key={l._id}
            className="text-sm"
          >
            {l.startTime}–{l.endTime} · {l.subjectId.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
