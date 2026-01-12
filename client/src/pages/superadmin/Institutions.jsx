import { useEffect, useState } from "react";
import {
  getAllInstitutions,
  createInstitution,
  toggleInstitutionStatus
} from "../../services/superAdminApi";
import toast from "react-hot-toast";

export default function Institutions() {
  const [institutions, setInstitutions] = useState([]);
  const [form, setForm] = useState({
    name: "",
    code: ""
  });

  const load = async () => {
    const d = await getAllInstitutions();
    setInstitutions(d.institutions || []);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    await createInstitution(form);
    toast.success("Institution created");
    setForm({ name: "", code: "" });
    load();
  };

  const toggle = async (id, currentStatus) => {
    const nextStatus =
      currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    await toggleInstitutionStatus(id, nextStatus);
    toast.success(`Institution ${nextStatus.toLowerCase()}`);
    load();
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-lg font-semibold mb-4">
        Institutions
      </h3>

      {/* CREATE */}
      <div className="flex gap-3 mb-6">
        <input
          placeholder="Institution Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 rounded w-1/3"
        />
        <input
          placeholder="Code"
          value={form.code}
          onChange={(e) =>
            setForm({ ...form, code: e.target.value })
          }
          className="border p-2 rounded w-1/4"
        />
        <button
          onClick={submit}
          className="bg-green-300 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <table className="w-full text-sm">
        <thead className="text-left text-slate-600 border-b">
          <tr>
            <th className="py-2">Name</th>
            <th>Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {institutions.map((i) => {
            const status = i.status || "ACTIVE"; // fallback

            return (
              <tr key={i._id} className="border-b">
                <td className="py-2">{i.name}</td>
                <td>{i.code}</td>

                {/* STATUS BADGE */}
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status}
                  </span>
                </td>

                {/* ACTION */}
                <td>
                  <button
                    onClick={() => toggle(i._id, status)}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      status === "ACTIVE"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {status === "ACTIVE"
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
