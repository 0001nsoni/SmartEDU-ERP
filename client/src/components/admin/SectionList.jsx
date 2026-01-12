import { useEffect, useState } from "react";
import api from "../../services/api";

export default function SectionList() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/sections")
      .then((res) => {
        setSections(res.data.sections || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white border rounded-xl p-6">
        <p className="text-slate-500 text-sm">Loading sections...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold mb-4">Sections</h3>

      {sections.length === 0 ? (
        <p className="text-sm text-slate-500">
          No sections created yet
        </p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b text-slate-600">
              <th className="text-left py-2">Course</th>
              <th className="text-left">Year</th>
              <th className="text-left">Section</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((s) => (
              <tr key={s._id} className="border-b">
                <td className="py-2">
                  {s.courseId?.name || "—"}
                </td>
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
