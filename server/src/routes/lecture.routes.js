import express from "express";
import {
  createLecture,
  getLectures
} from "../controllers/lecture.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("ADMIN"),
  createLecture
);

router.get(
  "/",
  protect,
  allowRoles("ADMIN", "FACULTY", "STUDENT"),
  getLectures
);

export default router;
