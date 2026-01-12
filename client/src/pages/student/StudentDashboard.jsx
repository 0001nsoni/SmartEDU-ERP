import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";

import Notices from "../../components/student/Notices";
import Timetable from "../../components/student/Timetable";
import AttendanceProgress from "../../components/student/AttendanceProgress";
import LiveBus from "../../components/student/LiveBus";
import LiveBusMap from "../../components/student/LiveBusMap";

import api from "../../services/api";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [lectureAttendance, setLectureAttendance] = useState(null);
  const [mentorAttendance, setMentorAttendance] = useState(null);
  const [todayLectures, setTodayLectures] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      // 1️⃣ Student profile
      const profileRes = await api.get("/students/me");
      const s = profileRes.data.student;
      setStudent(s);

      // 2️⃣ Attendance
      const [lectureRes, mentorRes] = await Promise.all([
        api.get(`/attendance-percentage/lecture/${s._id}`),
        api.get(`/attendance-percentage/mentor/${s._id}`)
      ]);

      setLectureAttendance(lectureRes.data);
      setMentorAttendance(mentorRes.data);

      // 3️⃣ Today lectures
      const day = new Date()
        .toLocaleString("en-US", { weekday: "long" })
        .toUpperCase();

      const lectureList = await api.get("/lectures", {
        params: {
          courseId: s.courseId._id,
          year: s.year,
          section: s.section
        }
      });

      setTodayLectures(
        lectureList.data.lectures.filter(l => l.day === day)
      );
    };

    loadDashboard();
  }, []);

  if (!student) return null;

  return (
    <DashboardLayout>
      {/* =======================
          TOP STATS
      ======================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Lecture Attendance"
          value={`${lectureAttendance?.percentage || 0}%`}
        />
        <StatCard
          title="Mentor Attendance"
          value={`${mentorAttendance?.percentage || 0}%`}
        />
        <StatCard
          title="Today's Classes"
          value={todayLectures.length}
        />
        {student.studentType === "BUS_SERVICE" && (
          <StatCard title="Bus Status" value="Live" />
        )}
      </div>

      {/* =======================
          MIDDLE SECTION
      ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <AttendanceProgress
          lecture={lectureAttendance?.percentage || 0}
          mentor={mentorAttendance?.percentage || 0}
        />

        {student.studentType === "BUS_SERVICE" && (
          <LiveBus busId={student.busId} />
        )}
      </div>

      {/* =======================
          BOTTOM SECTION
      ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Notices />
        <Timetable lectures={todayLectures} />
      </div>

      {/* =======================
          LIVE MAP
      ======================= */}
      {student.studentType === "BUS_SERVICE" && (
        <div className="mt-8">
          <LiveBusMap busId={student.busId} />
        </div>
      )}
    </DashboardLayout>
  );
}
