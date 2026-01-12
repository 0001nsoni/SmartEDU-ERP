export default function FacultyTimetable({ lectures }) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="font-semibold mb-4">
        Today's Timetable
      </h3>

      {lectures.length === 0 && (
        <p className="text-sm text-slate-500">
          No lectures today
        </p>
      )}

      <ul className="space-y-3">
        {lectures.map(l => (
          <li key={l._id} className="text-sm">
            {l.startTime}–{l.endTime} · {l.subjectId.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
