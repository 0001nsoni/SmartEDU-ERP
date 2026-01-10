import express from "express";
import {
  createSubject,
  createLecture,
  getMyTimetable
} from "../controllers/timetable.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// ADMIN
router.post("/subjects", protect, allowRoles("ADMIN"), createSubject);
router.post("/lectures", protect, allowRoles("ADMIN"), createLecture);

// FACULTY & STUDENT
router.get("/", protect, allowRoles("FACULTY", "STUDENT"), getMyTimetable);

export default router;