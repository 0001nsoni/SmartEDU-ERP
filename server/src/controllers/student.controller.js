import User from "../models/User.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";

/**
 * CREATE STUDENT (ADMIN)
 */
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      enrollmentNo,
      studentType
    } = req.body;

    if (!name || !email || !password || !enrollmentNo || !studentType) {
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
      role: "STUDENT",
      institutionId: req.user.institutionId
    });

    const student = await Student.create({
      userId: user._id,
      institutionId: req.user.institutionId,
      enrollmentNo,
      studentType
    });

    res.status(201).json({
      message: "Student created successfully",
      studentId: student._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * GET ALL STUDENTS (ADMIN)
 */
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({
      institutionId: req.user.institutionId
    })
      .populate("userId", "name email")
      .populate("hostelId", "name")
      .populate("busId", "busNumber");

    res.json({ students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET OWN STUDENT PROFILE (STUDENT)
 */
export const getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({
      userId: req.user.userId
    })
      .populate("userId", "name email")
      .populate("hostelId", "name")
      .populate("busId", "busNumber");

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.json({ student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};