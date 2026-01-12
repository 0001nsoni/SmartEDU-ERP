import Student from "../models/Student.js";
import Lecture from "../models/Lecture.js";
import LectureAttendance from "../models/LectureAttendance.js";
import Holiday from "../models/Holiday.js";

export const getLectureAttendancePercentage = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const lectures = await Lecture.find({
      institutionId: student.institutionId,
      courseId: student.courseId,
      year: student.year,
      section: student.section
    });

    const lectureIds = lectures.map(l => l._id);

    const attendances = await LectureAttendance.find({
      lectureId: { $in: lectureIds }
    });

    const holidays = await Holiday.find({
      institutionId: student.institutionId
    });

    const isHoliday = (date) =>
      holidays.some(h => date >= h.startDate && date <= h.endDate);

    let total = 0;
    let present = 0;

    attendances.forEach(a => {
      const d = new Date(a.date);

      if (d.getDay() === 0) return;      // Sunday
      if (isHoliday(d)) return;

      total++;

      if (a.presentStudents.includes(student._id)) {
        present++;
      }
    });

    res.json({
      type: "LECTURE",
      totalLectures: total,
      attendedLectures: present,
      percentage: total === 0 ? 0 : ((present / total) * 100).toFixed(2)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
