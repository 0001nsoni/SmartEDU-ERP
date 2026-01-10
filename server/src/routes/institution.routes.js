import express from "express";
import { createInstitution } from "../controllers/institution.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("SUPER_ADMIN"),
  createInstitution
);

export default router;
