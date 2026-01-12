import User from "../models/User.js";
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Hostel from "../models/Hostel.js";
import Bus from "../models/Bus.js";
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
      rollNo,
      studentType,
      courseId,
      year,
      section,
      hostelId,
      roomNumber,
      busId
    } = req.body;

    /* ==========================
       BASIC VALIDATION
    ========================== */
    if (
      !name ||
      !email ||
      !password ||
      !enrollmentNo ||
      !rollNo ||
      !studentType ||
      !courseId ||
      !year ||
      !section
    ) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    /* ==========================
       DUPLICATE CHECKS
    ========================== */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const existingStudent = await Student.findOne({ enrollmentNo });
    if (existingStudent) {
      return res.status(400).json({
        message: "Enrollment number already exists"
      });
    }

    /* ==========================
       COURSE VALIDATION
    ========================== */
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        message: "Invalid course"
      });
    }

    /* ==========================
       HOSTEL / BUS VALIDATION
    ========================== */
    if (studentType === "HOSTELLER" && !hostelId) {
      return res.status(400).json({
        message: "Hostel is required for hosteller"
      });
    }

    if (studentType === "BUS_SERVICE" && !busId) {
      return res.status(400).json({
        message: "Bus is required for bus service student"
      });
    }

    if (hostelId) {
      const hostel = await Hostel.findById(hostelId);
      if (!hostel) {
        return res.status(400).json({
          message: "Invalid hostel"
        });
      }
    }

    if (busId) {
      const bus = await Bus.findById(busId);
      if (!bus) {
        return res.status(400).json({
          message: "Invalid bus"
        });
      }
    }

    /* ==========================
       CREATE USER
    ========================== */
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "STUDENT",
      institutionId: req.user.institutionId
    });

    /* ==========================
       CREATE STUDENT PROFILE
    ========================== */
    const student = await Student.create({
      userId: user._id,
      institutionId: req.user.institutionId,
      enrollmentNo,
      rollNo,
      studentType,
      courseId,
      year,
      section,
      hostelId: hostelId || null,
      roomNumber: roomNumber || null,
      busId: busId || null
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
 * Supports filtering by course / year / section
 */
export const getAllStudents = async (req, res) => {
  try {
    const { courseId, year, section } = req.query;

    const filter = {
      institutionId: req.user.institutionId
    };

    if (courseId) filter.courseId = courseId;
    if (year) filter.year = Number(year);
    if (section) filter.section = section;

    const students = await Student.find(filter)
      .populate("userId", "name email")
      .populate("courseId", "name")
      .populate("hostelId", "name")
      .populate("busId", "busNumber")
      .sort({ rollNo: 1 });

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
      .populate("courseId", "name")
      .populate("hostelId", "name")
      .populate("busId", "busNumber");

    if (!student) {
      return res.status(404).json({
        message: "Student profile not found"
      });
    }

    res.json({ student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
