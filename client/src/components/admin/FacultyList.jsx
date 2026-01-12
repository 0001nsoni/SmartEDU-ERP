import { useEffect, useState } from "react";
import { getAllFaculty } from "../../services/adminApi";

export default function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllFaculty()
      .then((data) => {
        setFaculty(data.faculty || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Loading faculty...</p>;
  if (!faculty.length)
    return <p className="text-slate-500">No faculty found</p>;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Faculty</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600 border-b">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Employee ID</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((f) => (
              <tr key={f._id} className="border-b">
                <td className="py-2 text-slate-900">
                  {f.userId?.name}
                </td>
                <td>{f.userId?.email}</td>
                <td>{f.employeeId}</td>
                <td>{f.facultyType?.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
