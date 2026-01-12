import { useEffect, useState } from "react";
import api from "../../services/api";

export default function HolidayList() {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    api.get("/holidays").then(res => {
      setHolidays(res.data.holidays || []);
    });
  }, []);

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-semibold mb-4">Holidays & Vacations</h3>

      {holidays.length === 0 ? (
        <p className="text-sm text-slate-500">No entries</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {holidays.map(h => (
            <li key={h._id}>
              {h.title} ({h.type}) – {h.date?.slice(0,10)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
