import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function ProfileCard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    api.get("/students/me").then(res => {
      setStudent(res.data.student);
    });
  }, []);

  if (!student) return null;

  return (
    <div className="bg-white rounded-xl p-6 border">
      <h2 className="text-lg font-semibold">
        {student.userId.name}
      </h2>

      <p className="text-sm text-slate-600">
        Enrollment: {student.enrollmentNo}
      </p>

      <p className="text-sm">
        Course: {student.courseId.name}
      </p>

      <p className="text-sm">
        Year {student.year} · Section {student.section}
      </p>
    </div>
  );
}
