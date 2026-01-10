import express from "express";
import {
  createRoute,
  createBus,
  createDriver,
  getBusByNumber
} from "../controllers/transport.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// ADMIN
router.post("/routes", protect, allowRoles("ADMIN"), createRoute);
router.post("/buses", protect, allowRoles("ADMIN"), createBus);
router.post("/drivers", protect, allowRoles("ADMIN"), createDriver);

// STUDENT + FACULTY
router.get(
  "/bus/:busNumber",
  protect,
  allowRoles("STUDENT", "FACULTY"),
  getBusByNumber
);

export default router;
