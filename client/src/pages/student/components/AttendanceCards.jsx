import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function AttendanceCards() {
  const [lecture, setLecture] = useState(null);
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    api.get("/students/me").then(res => {
      const id = res.data.student._id;

      api.get(`/attendance-percentage/lecture/${id}`)
        .then(r => setLecture(r.data));

      api.get(`/attendance-percentage/mentor/${id}`)
        .then(r => setMentor(r.data));
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-xl border">
        <p className="text-sm text-slate-500">
          Lecture Attendance
        </p>
        <p className="text-2xl font-bold">
          {lecture?.percentage || 0}%
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl border">
        <p className="text-sm text-slate-500">
          Mentor Attendance
        </p>
        <p className="text-2xl font-bold">
          {mentor?.percentage || 0}%
        </p>
      </div>
    </div>
  );
}
