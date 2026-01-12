export default function AttendanceProgress({ lecture, mentor }) {
  return (
    <div className="bg-white rounded-xl p-6 border space-y-4">
      <div>
        <p className="text-sm text-slate-500">Lecture Attendance</p>
        <p className="text-2xl font-bold">{lecture}%</p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Mentor Attendance</p>
        <p className="text-2xl font-bold">{mentor}%</p>
      </div>
    </div>
  );
}
