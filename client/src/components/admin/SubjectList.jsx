import { useEffect, useState } from "react";
import api from "../../services/api";

export default function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/subjects")
      .then((res) => {
        setSubjects(res.data.subjects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white border rounded-xl p-6">
        <p className="text-sm text-slate-500">
          Loading subjects...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold mb-4">Subjects</h3>

      {subjects.length === 0 ? (
        <p className="text-sm text-slate-500">
          No subjects created yet
        </p>
      ) : (
        <table className="w-full text-sm">
          <thead className="border-b text-slate-600">
            <tr>
              <th className="text-left py-2">Subject</th>
              <th>Code</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s._id} className="border-b">
                <td className="py-2">{s.name}</td>
                <td>{s.code}</td>
                <td>{s.year}</td>
                <td>{s.semester}</td>
                <td>{s.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
