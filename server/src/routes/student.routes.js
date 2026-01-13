import express from "express";
import { createStudent,getAllStudents,
  getMyProfile } from "../controllers/student.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();
// ADMIN
router.post("/", protect, allowRoles("ADMIN"), createStudent);
router.get("/", protect, allowRoles("ADMIN","FACULTY"), getAllStudents);

// STUDENT
router.get("/me", protect, allowRoles("STUDENT"), getMyProfile);


export default router;
