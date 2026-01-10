import express from "express";
import {
  createClub,
  applyToClub,
  facultyDecision,
  adminDecision
} from "../controllers/club.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// ADMIN
router.post("/", protect, allowRoles("ADMIN"), createClub);
router.patch("/admin/:applicationId", protect, allowRoles("ADMIN"), adminDecision);

// STUDENT
router.post("/:clubId/apply", protect, allowRoles("STUDENT"), applyToClub);

// FACULTY
router.patch("/faculty/:applicationId", protect, allowRoles("FACULTY"), facultyDecision);

export default router;
