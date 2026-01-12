import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";

import FacultyTimetable from "../../components/faculty/FacultyTimetable";
import HostelApprovals from "../../components/faculty/HostelApprovals";

import api from "../../services/api";

export default function FacultyDashboard() {
  const [todayLectures, setTodayLectures] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [noticesCount, setNoticesCount] = useState(0);
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      /* ==========================
         TODAY'S LECTURES
      ========================== */
      const day = new Date()
        .toLocaleString("en-US", { weekday: "long" })
        .toUpperCase();

      const lecturesRes = await api.get("/lectures");
      const today = lecturesRes.data.lectures.filter(
        (l) => l.day === day
      );

      setTodayLectures(today);

      /* ==========================
         HOSTEL LEAVES (MENTOR / WARDEN)
      ========================== */
      try {
        const leaveRes = await api.get("/hostel-leaves/pending");
        setPendingLeaves(leaveRes.data.count || 0);
        setIsMentor(true);
      } catch {
        setIsMentor(false);
      }

      /* ==========================
         NOTICES
      ========================== */
      const noticeRes = await api.get("/notices/my");
      setNoticesCount(noticeRes.data.notices.length);
    };

    loadDashboard();
  }, []);

  return (
    <DashboardLayout>
      {/* =======================
          TOP STATS
      ======================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Today's Lectures"
          value={todayLectures.length}
        />

        {isMentor && (
          <StatCard
            title="Pending Leaves"
            value={pendingLeaves}
          />
        )}

        <StatCard title="Notices" value={noticesCount} />

        <StatCard
          title="Role"
          value={isMentor ? "Mentor" : "Faculty"}
        />
      </div>

      {/* =======================
          MAIN CONTENT
      ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FacultyTimetable lectures={todayLectures} />

        {isMentor && <HostelApprovals />}
      </div>
    </DashboardLayout>
  );
}
