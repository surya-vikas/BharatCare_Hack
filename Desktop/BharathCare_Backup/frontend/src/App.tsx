import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import VideoConsultation from "./pages/videoconsultation";
import UserConsult from "./pages/UserConsult";
import OrderHistory from "./pages/OrderHistory";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import PatientVideoConsultation from "./pages/PatientVideoConsultation";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Billing from "./pages/Billing";
import Signup from "./pages/Signup";
import MyPrescriptions from "./pages/MyPrescriptions";
import UploadPrescription from "./pages/UploadPrescription";
import AdminDashboard from "./pages/AdminDashboard";

/* ✅ Emergency Button from pages folder */
import EmergencyButton from "./pages/EmergencyButton";

/* -------- ROLE GUARD -------- */
const ProtectedRoute = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string;
}) => {
  const userRole = localStorage.getItem("role");

  if (!userRole) return <Navigate to="/login" replace />;
  if (userRole !== role) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      {/* -------- ROUTES -------- */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="patient">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/prescriptions" element={<MyPrescriptions />} />
        <Route path="/user/upload-prescription" element={<UploadPrescription />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/checkout" element={<Checkout />} />
        <Route path="/user/orders" element={<OrderHistory />} />
        <Route path="/user/consult" element={<UserConsult />} />
        <Route path="/user/video-consult" element={<PatientVideoConsultation />} />

        {/* DOCTOR */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route
          path="/doctor/video-consultation"
          element={
            <ProtectedRoute role="doctor">
              <VideoConsultation />
            </ProtectedRoute>
          }
        />

        {/* PHARMACY */}
        <Route
          path="/pharmacy"
          element={
            <ProtectedRoute role="pharmacy">
              <PharmacyDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/pharmacy/billing" element={<Billing />} />

        {/* ADMIN */}
        <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* 🚑 EMERGENCY BUTTON - Visible Everywhere */}
      <EmergencyButton />
    </BrowserRouter>
  );
}