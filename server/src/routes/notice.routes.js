import express from "express";
import {
  createNotice,
  getMyNotices
} from "../controllers/notice.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// ADMIN / FACULTY
router.post(
  "/",
  protect,
  allowRoles("ADMIN", "FACULTY"),
  createNotice
);

// ALL LOGGED-IN USERS
router.get("/", protect, getMyNotices);

export default router;
