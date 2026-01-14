import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import {
  markFacultyAttendance,
  getFacultyAttendancePercentage
} from "../controllers/facultyAttendance.controller.js";

const router = express.Router();

router.post(
  "/mark",
  protect,
  allowRoles("FACULTY"),
  markFacultyAttendance
);

router.get(
  "/percentage",
  protect,
  allowRoles("FACULTY"),
  getFacultyAttendancePercentage
);

export default router;
