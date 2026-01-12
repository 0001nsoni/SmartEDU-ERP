import Student from "../models/Student.js";
import MentorAttendance from "../models/MentorAttendance.js";
import Holiday from "../models/Holiday.js";

export const getMentorAttendancePercentage = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const records = await MentorAttendance.find({
      institutionId: student.institutionId,
      courseId: student.courseId,
      year: student.year,
      section: student.section
    });

    const holidays = await Holiday.find({
      institutionId: student.institutionId
    });

    const isHoliday = (date) =>
      holidays.some(h => date >= h.startDate && date <= h.endDate);

    let totalSessions = 0;
    let presentSessions = 0;

    records.forEach(r => {
      const d = new Date(r.date);

      if (d.getDay() === 0) return; // Sunday
      if (isHoliday(d)) return;

      totalSessions++;

      if (r.presentStudents.includes(student._id)) {
        presentSessions++;
      }
    });

    res.json({
      type: "MENTOR",
      totalSessions,
      attendedSessions: presentSessions,
      percentage: totalSessions === 0 ? 0 : ((presentSessions / totalSessions) * 100).toFixed(2)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
