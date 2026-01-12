import express from "express";
import {
  createHostel,
  addRoom,
  allocateRoom,
  getHostels,
} from "../controllers/hostel.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// ADMIN
router.post("/", protect, allowRoles("ADMIN"), createHostel);
router.post("/:hostelId/rooms", protect, allowRoles("ADMIN"), addRoom);
router.post("/:hostelId/allocate", protect, allowRoles("ADMIN"), allocateRoom);
router.get("/", protect, allowRoles("ADMIN", "STUDENT"), getHostels);

export default router;
