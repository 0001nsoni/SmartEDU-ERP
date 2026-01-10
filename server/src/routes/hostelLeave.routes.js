import express from "express";
import {
  applyLeave,
  getPendingLeaves,
  updateLeaveStatus
} from "../controllers/hostelLeave.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// STUDENT
router.post("/apply", protect, allowRoles("STUDENT"), applyLeave);

// WARDEN (FACULTY)
router.get("/pending", protect, allowRoles("FACULTY"), getPendingLeaves);
router.patch(
  "/:leaveId",
  protect,
  allowRoles("FACULTY"),
  updateLeaveStatus
);

export default router;
