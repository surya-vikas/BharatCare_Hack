import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { CSSProperties } from "react";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  // Dummy data for now
  const order = location.state || {
    pharmacy: "Apollo Pharmacy",
    medicine: "Paracetamol",
    price: 22,
    qty: 2,
  };

  const subtotal = order.price * order.qty;
  const deliveryCharge = subtotal > 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + deliveryCharge + tax;

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("Order placed successfully! 🎉");
      navigate("/user");
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h2 style={styles.title}>Order Summary</h2>
        </div>

        <div style={styles.mainContent}>
          {/* Order Details Card */}
          <div style={styles.orderCard}>
            <div style={styles.cardHeader}>
              <span style={styles.cardIcon}>🏥</span>
              <div>
                <h3 style={styles.pharmacyName}>{order.pharmacy}</h3>
                <p style={styles.pharmacySubtext}>Verified Partner Pharmacy</p>
              </div>
            </div>

            <div style={styles.divider}></div>

            {/* Medicine Details */}
            <div style={styles.medicineSection}>
              <div style={styles.medicineHeader}>
                <span style={styles.sectionTitle}>Medicine Details</span>
              </div>

              <div style={styles.medicineItem}>
                <div style={styles.medicineInfo}>
                  <div style={styles.medicineIcon}>💊</div>
                  <div style={styles.medicineDetails}>
                    <h4 style={styles.medicineName}>{order.medicine}</h4>
                    <p style={styles.medicinePrice}>₹{order.price} per unit</p>
                  </div>
                </div>
                <div style={styles.quantityBadge}>Qty: {order.qty}</div>
              </div>
            </div>

            <div style={styles.divider}></div>

            {/* Price Breakdown */}
            <div style={styles.priceSection}>
              <div style={styles.priceRow}>
                <span style={styles.priceLabel}>Subtotal</span>
                <span style={styles.priceValue}>₹{subtotal}</span>
              </div>
              <div style={styles.priceRow}>
                <span style={styles.priceLabel}>
                  Delivery Charges
                  {deliveryCharge === 0 && (
                    <span style={styles.freeTag}> FREE</span>
                  )}
                </span>
                <span style={styles.priceValue}>
                  {deliveryCharge === 0 ? (
                    <span style={styles.strikethrough}>₹40</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>
              <div style={styles.priceRow}>
                <span style={styles.priceLabel}>GST (5%)</span>
                <span style={styles.priceValue}>₹{tax}</span>
              </div>

              {deliveryCharge === 0 && (
                <div style={styles.savingsNote}>
                  🎉 You saved ₹40 on delivery!
                </div>
              )}

              <div style={styles.divider}></div>

              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total Amount</span>
                <span style={styles.totalValue}>₹{total}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info Card */}
          <div style={styles.infoCard}>
            <div style={styles.infoHeader}>
              <span style={styles.infoIcon}>📦</span>
              <h4 style={styles.infoTitle}>Delivery Information</h4>
            </div>
            <div style={styles.infoContent}>
              <div style={styles.infoItem}>
                <span style={styles.infoItemIcon}>⏱️</span>
                <div>
                  <p style={styles.infoItemTitle}>Estimated Delivery</p>
                  <p style={styles.infoItemValue}>Within 2-4 hours</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoItemIcon}>✅</span>
                <div>
                  <p style={styles.infoItemTitle}>Quality Assurance</p>
                  <p style={styles.infoItemValue}>100% Genuine medicines</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoItemIcon}>🔒</span>
                <div>
                  <p style={styles.infoItemTitle}>Secure Payment</p>
                  <p style={styles.infoItemValue}>Pay on delivery available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <button
              style={{
                ...styles.confirmButton,
                ...(isProcessing ? styles.confirmButtonProcessing : {}),
              }}
              onClick={handleConfirmOrder}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Confirm Order"}
            </button>
            <button
              style={styles.cancelButton}
              onClick={() => navigate(-1)}
              disabled={isProcessing}
            >
              Modify Order
            </button>
          </div>

          {/* Terms */}
          <p style={styles.terms}>
            By placing this order, you agree to our{" "}
            <a href="#terms" style={styles.termsLink}>
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a href="#privacy" style={styles.termsLink}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "20px",
  },
  content: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  backButton: {
    background: "none",
    border: "1px solid #ddd",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
    transition: "all 0.2s",
  },
  title: {
    margin: 0,
    color: "#1e293b",
    fontSize: "28px",
    fontWeight: "600",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  orderCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },
  cardIcon: {
    fontSize: "48px",
  },
  pharmacyName: {
    margin: "0 0 4px 0",
    fontSize: "22px",
    fontWeight: "700",
    color: "#1e293b",
  },
  pharmacySubtext: {
    margin: 0,
    fontSize: "14px",
    color: "#22c55e",
    fontWeight: "500",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e2e8f0",
    margin: "20px 0",
  },
  medicineSection: {
    marginBottom: "10px",
  },
  medicineHeader: {
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  medicineItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  medicineInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  medicineIcon: {
    fontSize: "32px",
  },
  medicineDetails: {
    display: "flex",
    flexDirection: "column",
  },
  medicineName: {
    margin: "0 0 4px 0",
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
  },
  medicinePrice: {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
  },
  quantityBadge: {
    padding: "6px 16px",
    backgroundColor: "#4a90e2",
    color: "white",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
  },
  priceSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: "15px",
    color: "#64748b",
    fontWeight: "500",
  },
  priceValue: {
    fontSize: "15px",
    color: "#1e293b",
    fontWeight: "600",
  },
  freeTag: {
    color: "#22c55e",
    fontSize: "12px",
    fontWeight: "700",
    marginLeft: "4px",
  },
  strikethrough: {
    textDecoration: "line-through",
    color: "#94a3b8",
    marginRight: "8px",
  },
  savingsNote: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
    border: "1px solid #86efac",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    marginTop: "8px",
  },
  totalLabel: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
  },
  totalValue: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#4a90e2",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  infoHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  infoIcon: {
    fontSize: "24px",
  },
  infoTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
  },
  infoContent: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  infoItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  infoItemIcon: {
    fontSize: "20px",
  },
  infoItemTitle: {
    margin: "0 0 4px 0",
    fontSize: "14px",
    fontWeight: "600",
    color: "#64748b",
  },
  infoItemValue: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "600",
    color: "#1e293b",
  },
  actionButtons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  confirmButton: {
    flex: 1,
    minWidth: "200px",
    padding: "16px 32px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(74, 144, 226, 0.3)",
  },
  confirmButtonProcessing: {
    backgroundColor: "#94b8e0",
    cursor: "not-allowed",
  },
  cancelButton: {
    flex: 1,
    minWidth: "200px",
    padding: "16px 32px",
    backgroundColor: "white",
    color: "#64748b",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  terms: {
    fontSize: "13px",
    color: "#94a3b8",
    textAlign: "center",
    margin: "0",
  },
  termsLink: {
    color: "#4a90e2",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default OrderSummary;