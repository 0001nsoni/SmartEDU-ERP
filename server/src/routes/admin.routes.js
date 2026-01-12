import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import {
  createInstitutionAdmin,
  getAdminStats,
  getInstitutionAdmins
} from "../controllers/admin.controller.js";

const router = express.Router();

// Create admin (sub-admin)
router.post(
  "/create-admin",
  protect,
  allowRoles("ADMIN"),
  createInstitutionAdmin
);

// Get all admins of institution
router.get(
  "/admins",
  protect,
  allowRoles("ADMIN"),
  getInstitutionAdmins
);
router.get(
  "/stats",
  protect,
  allowRoles("ADMIN"),
  getAdminStats
);


export default router;
