import { useState } from "react";
import api from "../../services/api";

export default function CreateHoliday({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    type: "HOLIDAY"
  });

  const submit = async () => {
    if (!form.title || !form.date) {
      return alert("Title and date are required");
    }

    await api.post("/holidays", form);
    alert("Holiday created");
    onCreated && onCreated();
  };

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold mb-4">Add Holiday / Vacation</h3>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Holiday Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        type="date"
        className="border p-2 w-full mb-3"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <select
        className="border p-2 w-full mb-4"
        value={form.type}
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
      >
        <option value="HOLIDAY">Holiday</option>
        <option value="VACATION">Vacation</option>
      </select>

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add Holiday
      </button>
    </div>
  );
}
