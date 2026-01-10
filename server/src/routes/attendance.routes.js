import express from "express";
import {
  markStudentAttendance,
  getMyAttendance,
  markFacultyAttendance
} from "../controllers/attendance.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// FACULTY
router.post(
  "/students",
  protect,
  allowRoles("FACULTY"),
  markStudentAttendance
);
router.post(
  "/faculty",
  protect,
  allowRoles("FACULTY"),
  markFacultyAttendance
);

// STUDENT
router.get(
  "/me",
  protect,
  allowRoles("STUDENT"),
  getMyAttendance
);

export default router;
