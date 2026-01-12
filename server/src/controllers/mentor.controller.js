import Mentor from "../models/Mentor.js";
import Faculty from "../models/Faculty.js";

export const assignMentor = async (req, res) => {
  try {
    const {
      facultyId,
      courseId,
      year,
      semester,
      section
    } = req.body;

    if (!facultyId || !courseId || !year || !semester || !section) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // validate faculty
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(400).json({
        message: "Invalid faculty"
      });
    }

    // prevent duplicate mentor assignment
    const existing = await Mentor.findOne({
      institutionId: req.user.institutionId,
      courseId,
      year,
      semester,
      section
    });

    if (existing) {
      return res.status(400).json({
        message: "Mentor already assigned for this class"
      });
    }

    const mentor = await Mentor.create({
      institutionId: req.user.institutionId,
      facultyId,
      courseId,
      year,
      semester,
      section
    });

    res.status(201).json({
      message: "Mentor assigned successfully",
      mentor
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
