import express from "express";
import {
  createDoctorProfile,
  getDoctorsAvailability,
} from "../controllers/doctorController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Doctor creates own profile
router.post("/profile", protect, allowRoles("doctor"), createDoctorProfile);

// Anyone logged in can view availability
router.get("/availability", protect, getDoctorsAvailability);

export default router;
