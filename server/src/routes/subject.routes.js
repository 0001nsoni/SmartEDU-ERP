import express from "express";
import {
  createSubject,
  getSubjects
} from "../controllers/subject.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("ADMIN"),
  createSubject
);

router.get(
  "/",
  protect,
  allowRoles("ADMIN", "FACULTY"),
  getSubjects
);

export default router;
