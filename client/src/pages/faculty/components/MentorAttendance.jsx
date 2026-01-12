import { useState } from "react";
import api from "../../../services/api";

export default function MentorAttendance() {
  const [session, setSession] = useState("MORNING");
  const [students, setStudents] = useState([]);
  const [present, setPresent] = useState([]);

  const loadStudents = async () => {
    const res = await api.get("/students/my-section");
    setStudents(res.data.students);
  };

  const submit = async () => {
    await api.post("/attendance/mentor", {
      ...students[0], // courseId, year, section from backend
      date: new Date(),
      session,
      presentStudents: present
    });

    alert("Mentor attendance marked");
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="font-semibold mb-4">
        Mentor Attendance
      </h3>

      <select
        className="border p-2 rounded mb-3"
        value={session}
        onChange={e => setSession(e.target.value)}
      >
        <option value="MORNING">Morning</option>
        <option value="AFTERNOON">After Lunch</option>
      </select>

      <div className="grid grid-cols-2 gap-2">
        {students.map(s => (
          <label key={s._id} className="flex gap-2 text-sm">
            <input
              type="checkbox"
              onChange={() =>
                setPresent(p =>
                  p.includes(s._id)
                    ? p.filter(x => x !== s._id)
                    : [...p, s._id]
                )
              }
            />
            {s.userId.name}
          </label>
        ))}
      </div>

      <button
        onClick={submit}
        className="mt-4 px-4 py-1 bg-black text-white rounded"
      >
        Submit Mentor Attendance
      </button>
    </div>
  );
}
