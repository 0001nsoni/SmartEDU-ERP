import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import { createInstitutionAdmin } from "../controllers/superAdmin.controller.js";

const router = express.Router();

router.post(
  "/create-admin",
  protect,
  allowRoles("SUPER_ADMIN"),
  createInstitutionAdmin
);

export default router;
