import { useEffect, useState } from "react";
import api from "../../../services/api";
import MarkLectureAttendance from "./MarkLectureAttendance";

const DAYS = [
  "SUNDAY","MONDAY","TUESDAY","WEDNESDAY",
  "THURSDAY","FRIDAY","SATURDAY"
];

export default function TodayLectures() {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const day = DAYS[new Date().getDay()];

    api.get("/lectures").then(res => {
      setLectures(
        res.data.lectures.filter(l => l.day === day)
      );
    });
  }, []);

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="font-semibold mb-4">
        Today's Lectures
      </h3>

      {lectures.length === 0 && (
        <p className="text-slate-500 text-sm">
          No lectures today
        </p>
      )}

      <div className="space-y-4">
        {lectures.map(l => (
          <MarkLectureAttendance key={l._id} lecture={l} />
        ))}
      </div>
    </div>
  );
}
