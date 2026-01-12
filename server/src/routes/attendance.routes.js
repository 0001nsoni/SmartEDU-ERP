import express from "express";
import {
  markLectureAttendance,
  markMentorAttendance
} from "../controllers/attendance.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/lecture",
  protect,
  allowRoles("FACULTY"),
  markLectureAttendance
);

router.post(
  "/mentor",
  protect,
  allowRoles("FACULTY"),
  markMentorAttendance
);

export default router;
