import express from "express";
import {
  createFaculty,
  getAllFaculty,
  getFacultyDashboard,
  getMyFacultyProfile
} from "../controllers/faculty.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// ADMIN
router.post("/", protect, allowRoles("ADMIN"), createFaculty);
router.get("/", protect, allowRoles("ADMIN"), getAllFaculty);

// FACULTY
router.get("/me", protect, allowRoles("FACULTY"), getMyFacultyProfile);
router.get(
  "/dashboard",
  protect,
  allowRoles("FACULTY"),
  getFacultyDashboard
)
export default router;
