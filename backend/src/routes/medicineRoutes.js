import express from "express";
import { searchMedicines } from "../controllers/medicineController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Any logged-in user can search
router.get("/search", protect, searchMedicines);

export default router;
