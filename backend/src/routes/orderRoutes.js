import express from "express";
import {
  createOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/create", protect, allowRoles("patient"), createOrder);
router.patch("/update", protect, allowRoles("pharmacy"), updateOrderStatus);

export default router;