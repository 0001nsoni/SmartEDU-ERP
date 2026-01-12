import express from "express";
import {
  createHoliday,
  getHolidays
} from "../controllers/holiday.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("ADMIN", "SUPER_ADMIN"),
  createHoliday
);

router.get(
  "/",
  protect,
  getHolidays
);

export default router;
