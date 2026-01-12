import express from "express";
import {
  createSection,
  getSections
} from "../controllers/section.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("ADMIN"),
  createSection
);

router.get(
  "/",
  protect,
  allowRoles("ADMIN", "FACULTY"),
  getSections
);

export default router;
