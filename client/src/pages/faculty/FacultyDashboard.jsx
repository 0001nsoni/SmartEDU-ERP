import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import FacultyTimetable from "../../components/faculty/FacultyTimetable";
import HostelApprovals from "../../components/faculty/HostelApprovals";
import api from "../../services/api";

export default function FacultyDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/faculty/dashboard")
      .then(res => {
        console.log("Faculty dashboard data:", res.data);
        setData(res.data);
      })
      .catch(err => {
        console.error("Faculty dashboard error:", err);
      });
  }, []);


  if (!data) {
    return (
      <DashboardLayout>
        <p className="text-slate-500">Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Today's Lectures"
          value={data.todayLectures.length}
        />

        {data.facultyType.includes("WARDEN") && (
          <StatCard
            title="Pending Leaves"
            value={data.pendingLeaves}
          />
        )}

        <StatCard
          title="Notices"
          value={data.noticesCount}
        />

        <StatCard
          title="Role"
          value={data.isMentor ? "Mentor" : "Faculty"}
        />
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.isMentor && data.mentorDetails && (
          <div className="bg-white border rounded-xl p-4 mb-6">
            <h3 className="font-semibold mb-2">Mentor Class</h3>
            <p className="text-slate-700 text-sm">
              {data.mentorDetails.course?.name} |
              Year {data.mentorDetails.year} |
              Sem {data.mentorDetails.semester} |
              Section {data.mentorDetails.section}
            </p>
          </div>
        )}

        <FacultyTimetable lectures={data.todayLectures} />
        {data.facultyType.includes("WARDEN") && (
          <HostelApprovals />
        )}
      </div>
    </DashboardLayout>
  );
}
