import express from "express";
import { getNearestPharmacies } from "../controllers/pharmacyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Any logged-in user can see nearest pharmacies
router.get("/nearest", protect, getNearestPharmacies);

export default router;
