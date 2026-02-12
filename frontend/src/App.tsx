import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ❌ NOT IMPLEMENTED YET – KEEP COMMENTED
// import VideoConsultation from "./pages/videoconsultation";
// import UserConsult from "./pages/UserConsult";
// import OrderHistory from "./pages/OrderHistory";
// import UserDashboard from "./pages/UserDashboard";
// import DoctorDashboard from "./pages/DoctorDashboard";
// import PharmacyDashboard from "./pages/PharmacyDashboard";
// import PatientVideoConsultation from "./pages/PatientVideoConsultation";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Billing from "./pages/Billing";
// import MyPrescriptions from "./pages/MyPrescriptions";
// import UploadPrescription from "./pages/UploadPrescription";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ----------------- NOT IMPLEMENTED YET ----------------- */}

        {/*
        <Route
          path="/user"
          element={
            <ProtectedRoute role="patient">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/user/prescriptions" element={<MyPrescriptions />} />
        <Route
          path="/user/upload-prescription"
          element={<UploadPrescription />}
        />

        <Route path="/pharmacy/billing" element={<Billing />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/checkout" element={<Checkout />} />

        <Route
          path="/user/video-consult"
          element={<PatientVideoConsultation />}
        />

        <Route
          path="/doctor/video-consultation"
          element={
            <ProtectedRoute role="doctor">
              <VideoConsultation />
            </ProtectedRoute>
          }
        />

        <Route path="/user/consult" element={<UserConsult />} />
        <Route path="/user/orders" element={<OrderHistory />} />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pharmacy"
          element={
            <ProtectedRoute role="pharmacy">
              <PharmacyDashboard />
            </ProtectedRoute>
          }
        />
        */}

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
