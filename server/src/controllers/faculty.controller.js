import User from "../models/User.js";
import Faculty from "../models/Faculty.js";
import bcrypt from "bcryptjs";

/**
 * CREATE FACULTY (ADMIN)
 */
export const createFaculty = async (req, res) => {
  try {
    const { name, email, password, employeeId, facultyType } = req.body;

    if (!name || !email || !password || !employeeId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "FACULTY",
      institutionId: req.user.institutionId
    });

    const faculty = await Faculty.create({
      userId: user._id,
      institutionId: req.user.institutionId,
      employeeId,
      facultyType
    });

    res.status(201).json({
      message: "Faculty created successfully",
      facultyId: faculty._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL FACULTY (ADMIN)
 */
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({
      institutionId: req.user.institutionId
    }).populate("userId", "name email");

    res.json({ faculty });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET OWN PROFILE (FACULTY)
 */
export const getMyFacultyProfile = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      userId: req.user.userId
    }).populate("userId", "name email");

    if (!faculty) {
      return res.status(404).json({ message: "Faculty profile not found" });
    }

    res.json({ faculty });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
