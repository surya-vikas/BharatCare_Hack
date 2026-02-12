import express from "express";
import {
  createPrescription,
  getMyPrescriptions,
} from "../controllers/prescriptionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/create", protect, allowRoles("doctor"), createPrescription);
router.get("/my", protect, allowRoles("patient"), getMyPrescriptions);

export default router;
