import StudentAttendance from "../models/StudentAttendance.js";
import FacultyAttendance from "../models/FacultyAttendance.js";
import Student from "../models/Student.js";

/**
 * FACULTY → MARK STUDENT ATTENDANCE
 */
export const markStudentAttendance = async (req, res) => {
  const { lectureId, date, records } = req.body;
  // records = [{ studentId, status }]

  const attendanceDocs = records.map(r => ({
    institutionId: req.user.institutionId,
    lectureId,
    studentId: r.studentId,
    date,
    status: r.status
  }));

  await StudentAttendance.insertMany(attendanceDocs);

  res.json({ message: "Attendance marked successfully" });
};

/**
 * STUDENT → VIEW OWN ATTENDANCE
 */
export const getMyAttendance = async (req, res) => {
  const student = await Student.findOne({
    userId: req.user.userId
  });

  const attendance = await StudentAttendance.find({
    studentId: student._id
  }).populate("lectureId");

  res.json({ attendance });
};

/**
 * FACULTY → MARK OWN ATTENDANCE
 */
export const markFacultyAttendance = async (req, res) => {
  const { date, inTime, outTime } = req.body;

  const record = await FacultyAttendance.create({
    institutionId: req.user.institutionId,
    facultyId: req.user.userId,
    date,
    inTime,
    outTime
  });

  res.json({ message: "Faculty attendance marked", recordId: record._id });
};
