import API from "./api";

// Fetch notices for student
export const getStudentNotices = async () => {
  const res = await API.get("/notices/student");
  return res.data;
};

// Fetch timetable
export const getStudentTimetable = async () => {
  const res = await API.get("/timetable/student");
  return res.data;
};

// Fetch attendance
export const getStudentAttendance = async () => {
  const res = await API.get("/attendance/me");
  return res.data;
};
