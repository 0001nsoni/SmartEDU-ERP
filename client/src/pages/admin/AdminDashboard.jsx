import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import api from "../../services/api";

/* =======================
   PEOPLE
======================= */
import CreateStudent from "../../components/admin/CreateStudent";
import StudentList from "../../components/admin/StudentList";
import CreateFaculty from "../../components/admin/CreateFaculty";
import FacultyList from "../../components/admin/FacultyList";

/* =======================
   ACADEMIC SETUP
======================= */
import CreateCourse from "../../components/admin/CreateCourse";
import CourseList from "../../components/admin/CourseList";
import CreateSection from "../../components/admin/CreateSection";
import SectionList from "../../components/admin/SectionList";
import CreateSubject from "../../components/admin/CreateSubject";
import SubjectList from "../../components/admin/SubjectList";

/* =======================
   TIMETABLE
======================= */
import CreateLecture from "../../components/admin/CreateLecture";
import LectureList from "../../components/admin/LectureList";
import AssignMentor from "../../components/admin/AssignMentor";

/* =======================
   OPERATIONS
======================= */
import CreateNotice from "../../components/admin/CreateNotice";
import NoticeList from "../../components/admin/NoticeList";
import CreateHostel from "../../components/admin/CreateHostel";
import HostelList from "../../components/admin/HostelList";
import CreateRoute from "../../components/admin/CreateRoute";
import RouteList from "../../components/admin/RouteList";
import CreateBus from "../../components/admin/CreateBus";
import BusList from "../../components/admin/BusList";

/* =======================
   CALENDAR
======================= */
import CreateHoliday from "../../components/admin/CreateHoliday";
import HolidayList from "../../components/admin/HolidayList";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  return (
    <DashboardLayout>

      {/* =======================
          OVERVIEW STATS
      ======================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Students" value={stats.students || 0} />
        <StatCard title="Faculty" value={stats.faculty || 0} />
        <StatCard title="Courses" value={stats.courses || 0} />
        <StatCard title="Buses" value={stats.buses || 0} />
      </div>

      {/* =======================
          ACADEMIC SETUP
      ======================= */}
      <section className="mb-20">
        <h2 className="text-xl font-bold mb-6">Academic Setup</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CreateCourse />
          <CourseList />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <CreateSection />
          <SectionList />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <CreateSubject />
          <SubjectList />
        </div>
      </section>

      {/* =======================
          PEOPLE MANAGEMENT
      ======================= */}
      <section className="mb-20">
        <h2 className="text-xl font-bold mb-6">People Management</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CreateStudent />
          <StudentList />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <CreateFaculty />
          <FacultyList />
        </div>
      </section>

      {/* =======================
          TIMETABLE & MENTOR
      ======================= */}
      <section className="mb-20">
        <h2 className="text-xl font-bold mb-6">Timetable & Mentors</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CreateLecture />
          <LectureList />
        </div>

        <div className="mt-12">
          <AssignMentor />
        </div>
      </section>

      {/* =======================
          OPERATIONS
      ======================= */}
      <section className="mb-20">
        <h2 className="text-xl font-bold mb-6">Operations</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CreateNotice />
          <NoticeList />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <CreateHostel />
          <HostelList />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <CreateRoute />
          <RouteList />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <CreateBus />
          <BusList />
        </div>
      </section>

      {/* =======================
          ACADEMIC CALENDAR
      ======================= */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-6">Academic Calendar</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CreateHoliday />
          <HolidayList />
        </div>
      </section>

    </DashboardLayout>
  );
}
