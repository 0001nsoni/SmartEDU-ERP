import Holiday from "../models/Holiday.js";
import Faculty from "../models/Faculty.js";
import FacultyAttendance from "../models/FacultyAttendance.js";

export const markFacultyAttendance = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      userId: req.user.userId
    });

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty profile not found"
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await FacultyAttendance.findOneAndUpdate(
      {
        facultyId: faculty._id,
        date: today
      },
      {
        institutionId: req.user.institutionId,
        facultyId: faculty._id,
        date: today,
        status: "PRESENT"
      },
      { upsert: true, new: true }
    );

    res.json({
      message: "Attendance marked",
      attendance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFacultyAttendancePercentage = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      userId: req.user.userId
    });

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty profile not found"
      });
    }

    const attendances = await FacultyAttendance.find({
      facultyId: faculty._id
    });

    const holidays = await Holiday.find({
      institutionId: req.user.institutionId
    });

    const isHoliday = (date) =>
      holidays.some(h =>
        date >= h.startDate && date <= h.endDate
      );

    let total = 0;
    let present = 0;

    attendances.forEach(a => {
      const d = new Date(a.date);

      if (d.getDay() === 0) return; // Sunday
      if (isHoliday(d)) return;

      total++;
      if (a.status === "PRESENT") present++;
    });

    res.json({
      totalDays: total,
      presentDays: present,
      percentage: total === 0 ? 0 : ((present / total) * 100).toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
