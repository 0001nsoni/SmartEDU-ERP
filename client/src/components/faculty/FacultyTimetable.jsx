import { useState } from "react";
import LectureAttendance from "./LectureAttendance";

export default function FacultyTimetable({ lectures }) {
  const [selectedLecture, setSelectedLecture] = useState(null);

  if (!lectures || lectures.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border">
        No lectures today
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="font-semibold mb-4">Today's Lectures</h3>

        <div className="space-y-3">
          {lectures.map((l) => (
            <div
              key={l._id}
              className="border p-3 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100"
              onClick={() => setSelectedLecture(l)}
            >
              <p className="font-medium">
                {l.subjectId.name}
              </p>
              <p className="text-sm text-slate-600">
                Year {l.year} • Section {l.section}
              </p>
              <p className="text-sm">
                {l.startTime} – {l.endTime}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedLecture && (
        <div className="mt-6">
          <LectureAttendance
            lecture={selectedLecture}
            onClose={() => setSelectedLecture(null)}
          />
        </div>
      )}
    </>
  );
}
