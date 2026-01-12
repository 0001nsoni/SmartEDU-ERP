import Course from "../models/Course.js";

/**
 * CREATE COURSE (ADMIN)
 */
export const createCourse = async (req, res) => {
  try {
    const {
      name,
      durationYears,
      totalSemesters,
      specializations
    } = req.body;

    if (!name || !durationYears || !totalSemesters) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    const course = await Course.create({
      institutionId: req.user.institutionId,
      name,
      durationYears,
      totalSemesters,
      specializations
    });

    res.status(201).json({
      message: "Course created successfully",
      course
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET COURSES (ADMIN / FACULTY)
 */
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      institutionId: req.user.institutionId
    });

    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
