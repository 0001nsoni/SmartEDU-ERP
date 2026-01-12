import MentorAttendance from "../models/MentorAttendance.js";
import Lecture from "../models/Lecture.js";
import LectureAttendance from "../models/LectureAttendance.js";

/**
 * MARK LECTURE ATTENDANCE (FACULTY)
 */
export const markLectureAttendance = async (req, res) => {
  try {
    const { lectureId, date, presentStudents } = req.body;

    if (!lectureId || !date || !presentStudents) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found"
      });
    }

    // Ensure faculty owns the lecture
    if (lecture.facultyId.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized to mark this lecture"
      });
    }

    const attendance = await LectureAttendance.create({
      institutionId: req.user.institutionId,
      lectureId,
      date,
      facultyId: req.user.userId,
      presentStudents
    });

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Attendance already marked for this lecture"
      });
    }
    res.status(500).json({ message: error.message });
  }
};

/**
 * MARK MENTOR ATTENDANCE (MENTOR FACULTY)
 */
export const markMentorAttendance = async (req, res) => {
  try {
    const {
      courseId,
      year,
      section,
      date,
      session,
      presentStudents
    } = req.body;

    if (
      !courseId ||
      !year ||
      !section ||
      !date ||
      !session
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const attendance = await MentorAttendance.create({
      institutionId: req.user.institutionId,
      courseId,
      year,
      section,
      mentorId: req.user.userId,
      date,
      session,
      presentStudents
    });

    res.status(201).json({
      message: "Mentor attendance marked",
      attendance
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Attendance already marked"
      });
    }
    res.status(500).json({ message: error.message });
  }
};
