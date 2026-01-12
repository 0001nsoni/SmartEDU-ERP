import Subject from "../models/Subject.js";
import Course from "../models/Course.js";

/**
 * CREATE SUBJECT (ADMIN)
 */
export const createSubject = async (req, res) => {
  try {
    const {
      courseId,
      name,
      code,
      year,
      semester,
      type
    } = req.body;

    if (
      !courseId ||
      !name ||
      !code ||
      !year ||
      !semester ||
      !type
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        message: "Invalid course"
      });
    }

    const subject = await Subject.create({
      institutionId: req.user.institutionId,
      courseId,
      name,
      code,
      year,
      semester,
      type
    });

    res.status(201).json({
      message: "Subject created successfully",
      subject
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET SUBJECTS (ADMIN / FACULTY)
 * Filter by course, year, semester
 */
export const getSubjects = async (req, res) => {
  try {
    const { courseId, year, semester } = req.query;

    const filter = {
      institutionId: req.user.institutionId
    };

    if (courseId) filter.courseId = courseId;
    if (year) filter.year = Number(year);
    if (semester) filter.semester = Number(semester);

    const subjects = await Subject.find(filter)
      .populate("courseId", "name")
      .sort({ year: 1, semester: 1 });

    res.json({ subjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
