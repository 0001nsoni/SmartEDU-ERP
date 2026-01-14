import express from "express";
import { createDriver, getDriverDashboard } from "../controllers/driver.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import { assignBusToDriver } from "../controllers/driver.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("ADMIN"),
  createDriver
);

router.post(
  "/assign-bus",
  protect,
  allowRoles("ADMIN"),
  assignBusToDriver
);
router.get(
  "/dashboard",
  protect,
  allowRoles("DRIVER"),
  getDriverDashboard
);


export default router;
