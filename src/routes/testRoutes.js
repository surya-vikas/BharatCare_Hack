import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/patient",
  protect,
  allowRoles("patient"),
  (req, res) => {
    res.json({
      message: "Patient access granted",
      user: req.user,
    });
  }
);

export default router;
