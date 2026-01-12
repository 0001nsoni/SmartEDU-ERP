import express from "express";
import { assignMentor } from "../controllers/mentor.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// ADMIN assigns mentor
router.post(
  "/assign",
  protect,
  allowRoles("ADMIN", "SUPER_ADMIN"),
  assignMentor
);

export default router;
