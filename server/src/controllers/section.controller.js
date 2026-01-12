import Section from "../models/Section.js";

/**
 * CREATE SECTION (ADMIN)
 */
export const createSection = async (req, res) => {
  try {
    const { courseId, year, section } = req.body;

    if (!courseId || !year || !section) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const exists = await Section.findOne({
      institutionId: req.user.institutionId,
      courseId,
      year,
      section
    });

    if (exists) {
      return res.status(400).json({
        message: "Section already exists"
      });
    }

    const newSection = await Section.create({
      institutionId: req.user.institutionId,
      courseId,
      year,
      section
    });

    res.status(201).json({
      message: "Section created successfully",
      section: newSection
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET SECTIONS BY COURSE
 */
export const getSections = async (req, res) => {
  try {
    const sections = await Section.find({
      institutionId: req.user.institutionId
    })
      .populate("courseId", "name durationYears totalSemesters");

    res.json({ sections });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};