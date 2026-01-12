import { useEffect, useState } from "react";
import {
  getPendingHostelLeaves,
  approveHostelLeave
} from "../../services/facultyApi";

export default function HostelApprovals() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPendingHostelLeaves()
      .then((data) => {
        setLeaves(data.leaves || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    await approveHostelLeave(id, status);
    setLeaves((prev) => prev.filter((l) => l._id !== id));
  };

  if (loading) return <p className="text-slate-500">Loading requests...</p>;
  if (!leaves.length) return <p className="text-slate-500">No pending requests</p>;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Hostel Leave Requests</h3>
      <div className="space-y-2">
        {leaves.map((l) => (
          <div key={l._id} className="p-3 rounded-lg bg-slate-50 flex justify-between">
            <div>
              <p className="font-semibold text-slate-900">{l.studentName}</p>
              <p className="text-sm text-slate-600">
                {l.fromDate} → {l.toDate}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(l._id, "APPROVED")}
                className="px-3 py-1 bg-green-600 text-white rounded-md text-sm"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(l._id, "REJECTED")}
                className="px-3 py-1 bg-red-600 text-white rounded-md text-sm"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
