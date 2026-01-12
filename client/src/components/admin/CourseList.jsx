import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses").then(res => setCourses(res.data.courses));
  }, []);

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold mb-4">Courses</h3>
      <ul className="space-y-2 text-sm">
        {courses.map(c => (
          <li key={c._id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
