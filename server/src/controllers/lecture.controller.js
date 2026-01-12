import Faculty from "../models/Faculty.js";
import Lecture from "../models/Lecture.js";
import Subject from "../models/Subject.js";
import User from "../models/User.js";

/**
 * CREATE LECTURE (ADMIN)
 */
export const createLecture = async (req, res) => {
  try {
    console.log("Create lecture called");

    const {
      courseId,
      subjectId,
      facultyId,
      year,
      section,
      day,
      startTime,
      endTime,
      lectureType
    } = req.body;

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(400).json({ message: "Invalid faculty" });
    }

    const lecture = await Lecture.create({
      institutionId: req.user.institutionId,
      courseId,
      subjectId,
      facultyId,
      year,
      section,
      day,
      startTime,
      endTime,
      lectureType
    });

    console.log("Lecture created");

    return res.status(201).json({
      message: "Lecture created successfully",
      lecture
    });

  } catch (error) {
    console.error("Lecture error:", error);
    return res.status(500).json({
      message: error.message
    });
  }
};
/**
 * GET LECTURES
 * Used by Admin / Faculty / Student
 */
export const getLectures = async (req, res) => {
  try {
    const { courseId, year, section } = req.query;

    const filter = {
      institutionId: req.user.institutionId
    };

    // Admin / Student filters
    if (courseId) filter.courseId = courseId;
    if (year) filter.year = Number(year);
    if (section) filter.section = section;

    // Faculty sees only own lectures
    if (req.user.role === "FACULTY") {
      filter.facultyId = req.user.userId;
    }

    const lectures = await Lecture.find(filter)
      .populate("subjectId", "name code")
      .populate("facultyId", "name email")
      .sort({ day: 1, startTime: 1 });

    res.json({ lectures });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
