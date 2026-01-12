import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import { getLectureAttendancePercentage } from "../controllers/lectureAttendancePercentage.controller.js";
import { getMentorAttendancePercentage } from "../controllers/mentorAttendancePercentage.controller.js";

const router = express.Router();

router.get(
  "/lecture/:studentId",
  protect,
  allowRoles("ADMIN", "STUDENT"),
  getLectureAttendancePercentage
);

router.get(
  "/mentor/:studentId",
  protect,
  allowRoles("ADMIN", "STUDENT"),
  getMentorAttendancePercentage
);

export default router;
