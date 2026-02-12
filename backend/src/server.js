import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import pharmacyRoutes from "./routes/pharmacyRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";

const app = express();   // 🔥 MUST COME BEFORE app.use

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/pharmacies", pharmacyRoutes);
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("BharathCare API running");
});

app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/medicines", medicineRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server error:", err);
  }
};

startServer();