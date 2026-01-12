import express from "express";
import {
  createCourse,
  getCourses
} from "../controllers/course.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("ADMIN"),
  createCourse
);

router.get(
  "/",
  protect,
  allowRoles("ADMIN", "FACULTY"),
  getCourses
);

export default router;
