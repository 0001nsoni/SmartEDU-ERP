import { useEffect, useState } from "react";
import api from "../../services/api";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    course: "",
    year: "",
    section: ""
  });

  useEffect(() => {
    api.get("/students").then(res => {
      setStudents(res.data.students || []);
    });
  }, []);

  const filteredStudents = students.filter((s) => {
    return (
      (!filters.course || s.courseId?.name === filters.course) &&
      (!filters.year || s.year === Number(filters.year)) &&
      (!filters.section || s.section === filters.section)
    );
  });

  // Unique values for dropdowns
  const courses = [...new Set(students.map(s => s.courseId?.name).filter(Boolean))];
  const years = [...new Set(students.map(s => s.year))];
  const sections = [...new Set(students.map(s => s.section))];

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold mb-4">Students</h3>

      {/* FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, course: e.target.value })}
        >
          <option value="">All Courses</option>
          {courses.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
        >
          <option value="">All Years</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, section: e.target.value })}
        >
          <option value="">All Sections</option>
          {sections.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      {filteredStudents.length === 0 ? (
        <p className="text-sm text-slate-500">No students found</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="border-b text-slate-600">
            <tr>
              <th className="text-left py-2">Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Year</th>
              <th>Section</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s._id} className="border-b">
                <td className="py-2">{s.userId?.name}</td>
                <td>{s.userId?.email}</td>
                <td>{s.courseId?.name}</td>
                <td>{s.year}</td>
                <td>{s.section}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
