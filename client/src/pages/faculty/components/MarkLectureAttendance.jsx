import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function MarkLectureAttendance({ lecture }) {
  const [students, setStudents] = useState([]);
  const [present, setPresent] = useState([]);

  useEffect(() => {
    api.get("/students", {
      params: {
        courseId: lecture.courseId,
        year: lecture.year,
        section: lecture.section
      }
    }).then(res => {
      setStudents(res.data.students);
    });
  }, [lecture]);

  const toggle = (id) => {
    setPresent(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const submit = async () => {
    await api.post("/attendance/lecture", {
      lectureId: lecture._id,
      date: new Date(),
      presentStudents: present
    });

    alert("Attendance marked");
  };

  return (
    <div className="border rounded-lg p-4">
      <p className="font-medium">
        {lecture.startTime}–{lecture.endTime} · {lecture.subjectId.name}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {students.map(s => (
          <label key={s._id} className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={present.includes(s._id)}
              onChange={() => toggle(s._id)}
            />
            {s.userId.name}
          </label>
        ))}
      </div>

      <button
        onClick={submit}
        className="mt-3 px-4 py-1 bg-black text-white rounded"
      >
        Submit Attendance
      </button>
    </div>
  );
}
