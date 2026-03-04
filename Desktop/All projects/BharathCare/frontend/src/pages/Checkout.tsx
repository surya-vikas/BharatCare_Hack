import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart, getCart } from "../utils/cart";
import type { CSSProperties } from "react";

const HYDERABAD_PHARMACIES = [
  { name: "Apollo Pharmacy", area: "Banjara Hills" },
  { name: "MedPlus", area: "Jubilee Hills" },
  { name: "Wellness Forever", area: "Gachibowli" },
  { name: "Hetero Med Solutions", area: "Ameerpet" },
  { name: "Frank Ross Pharmacy", area: "Secunderabad" },
  { name: "Vasan Health Care", area: "Kukatpally" },
  { name: "Noble Chemist", area: "Madhapur" },
  { name: "Shifa Medical Store", area: "Mehdipatnam" },
  { name: "Life Care Pharmacy", area: "Dilsukhnagar" },
  { name: "Sri Sai Medicals", area: "LB Nagar" },
  { name: "Care & Cure Pharmacy", area: "Miyapur" },
  { name: "Hyderabad Medicals", area: "Tolichowki" },
  { name: "Star Health Pharmacy", area: "KPHB Colony" },
  { name: "Green Cross Pharmacy", area: "Kondapur" },
  { name: "City Medicals", area: "Begumpet" },
  { name: "Srinivasa Medical Hall", area: "Uppal" },
  { name: "Raj Medicos", area: "Himayatnagar" },
];

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery", sub: "Pay when your order arrives", icon: "💵" },
  { id: "upi", label: "UPI", sub: "PhonePe, GPay, Paytm & more", icon: "📱" },
  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", icon: "💳" },
];

const generateOrderId = () =>
  "BC" + Date.now().toString().slice(-8).toUpperCase();

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useMemo(() => getCart(), []);
  const pharmacy = useMemo(
    () => HYDERABAD_PHARMACIES[Math.floor(Math.random() * HYDERABAD_PHARMACIES.length)],
    []
  );
  const orderId = useMemo(() => generateOrderId(), []);

  const [address, setAddress] = useState("");
  const [addressFocused, setAddressFocused] = useState(false);
  const [name, setName] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placeHovered, setPlaceHovered] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  const totalPrice = cart.reduce(
    (sum: number, item: any) => sum + (item.price || 0) * item.qty,
    0
  );
  const totalItems = cart.reduce((sum: number, item: any) => sum + item.qty, 0);

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone.trim()))
      errs.phone = "Enter a valid 10-digit mobile number";
    if (!address.trim() || address.trim().length < 15)
      errs.address = "Please enter a complete delivery address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) return;
  
    // Fake success (frontend only)
    clearCart();
    setOrdered(true);
  };
  // ─── Success Screen ────────────────────────────────────────────────────────
  if (ordered) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.topAccent} />
        <div style={styles.successContainer}>
          <div style={styles.successCard}>
            <div style={styles.successRing}>
              <div style={styles.successInner}>
                <span style={styles.successCheck}>✓</span>
              </div>
            </div>
            <div style={styles.brandRow}>
              <div style={styles.brandDot} />
              <span style={styles.brandLabel}>BharathCare</span>
            </div>
            <h2 style={styles.successTitle}>Order Placed!</h2>
            <p style={styles.successSubtext}>
              Your medicines are being prepared for dispatch.
            </p>

            <div style={styles.orderIdBadge}>
              <span style={styles.orderIdLabel}>Order ID</span>
              <span style={styles.orderIdValue}>#{orderId}</span>
            </div>

            <div style={styles.successDetails}>
              <div style={styles.successDetailRow}>
                <span style={styles.successDetailIcon}>🏥</span>
                <div>
                  <p style={styles.successDetailLabel}>Fulfilled by</p>
                  <p style={styles.successDetailValue}>
                    {pharmacy.name}, {pharmacy.area}
                  </p>
                </div>
              </div>
              <div style={styles.successDetailRow}>
                <span style={styles.successDetailIcon}>📍</span>
                <div>
                  <p style={styles.successDetailLabel}>Delivering to</p>
                  <p style={styles.successDetailValue}>{address}</p>
                </div>
              </div>
              <div style={styles.successDetailRow}>
                <span style={styles.successDetailIcon}>💵</span>
                <div>
                  <p style={styles.successDetailLabel}>Payment</p>
                  <p style={styles.successDetailValue}>
                    {PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.label}
                  </p>
                </div>
              </div>
              <div style={styles.successDetailRow}>
                <span style={styles.successDetailIcon}>🕐</span>
                <div>
                  <p style={styles.successDetailLabel}>Estimated Delivery</p>
                  <p style={styles.successDetailValue}>Within 2–4 hours</p>
                </div>
              </div>
            </div>

            <button
              style={styles.homeButton}
              onClick={() => navigate("/user/dashboard")}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  "linear-gradient(135deg, #49B6C6 0%, #3DA8B5 100%)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background =
                  "linear-gradient(135deg, #1C2F5E 0%, #2A4A7A 100%)";
              }}
            >
              Back to Dashboard
            </button>
            <button
              style={styles.ordersLink}
              onClick={() => navigate("/user/orders")}
            >
              View Order History →
            </button>
          </div>
        </div>
        <style>{`
          @keyframes popIn {
            0%   { transform: scale(0.6); opacity: 0; }
            70%  { transform: scale(1.08); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  // ─── Checkout Form ─────────────────────────────────────────────────────────
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.topAccent} />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div style={styles.headerCenter}>
            <div style={styles.brandRow}>
              <div style={styles.brandDot} />
              <span style={styles.brandLabel}>BharathCare</span>
            </div>
            <h2 style={styles.title}>Checkout</h2>
          </div>
          <div style={styles.stepIndicator}>
            <div style={styles.stepDone}>1</div>
            <div style={styles.stepLine} />
            <div style={styles.stepActive}>2</div>
            <div style={styles.stepLine} />
            <div style={styles.stepPending}>3</div>
          </div>
        </div>

        <div style={styles.layout}>
          {/* LEFT: Form */}
          <div style={styles.formCol}>

            {/* Delivery Details */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.sectionAccentBar} />
                <h3 style={styles.cardTitle}>Delivery Details</h3>
              </div>

              {/* Full Name */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Full Name *</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>👤</span>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    style={{
                      ...styles.input,
                      ...(nameFocused ? styles.inputFocused : {}),
                      ...(errors.name ? styles.inputError : {}),
                    }}
                  />
                </div>
                {errors.name && <p style={styles.errorText}>⚠ {errors.name}</p>}
              </div>

              {/* Phone */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Mobile Number *</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>📞</span>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setErrors((p) => ({ ...p, phone: undefined })); }}
                    onFocus={() => setPhoneFocused(true)}
                    onBlur={() => setPhoneFocused(false)}
                    style={{
                      ...styles.input,
                      ...(phoneFocused ? styles.inputFocused : {}),
                      ...(errors.phone ? styles.inputError : {}),
                    }}
                  />
                </div>
                {errors.phone && <p style={styles.errorText}>⚠ {errors.phone}</p>}
              </div>

              {/* Address */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Delivery Address *</label>
                <div style={styles.textareaWrapper}>
                  <textarea
                    placeholder="House No., Street, Landmark, Area, Hyderabad — PIN code"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); setErrors((p) => ({ ...p, address: undefined })); }}
                    onFocus={() => setAddressFocused(true)}
                    onBlur={() => setAddressFocused(false)}
                    rows={4}
                    style={{
                      ...styles.textarea,
                      ...(addressFocused ? styles.inputFocused : {}),
                      ...(errors.address ? styles.inputError : {}),
                    }}
                  />
                </div>
                {errors.address && <p style={styles.errorText}>⚠ {errors.address}</p>}
              </div>

              {/* Pharmacy info */}
              <div style={styles.pharmacyRow}>
                <div style={styles.pharmacyIconWrap}>
                  <span>🏥</span>
                </div>
                <div style={styles.pharmacyInfo}>
                  <p style={styles.pharmacyLabel}>Dispatching from</p>
                  <p style={styles.pharmacyName}>{pharmacy.name}</p>
                  <p style={styles.pharmacyArea}>
                    <span style={styles.pharmacyDot} />
                    {pharmacy.area}, Hyderabad
                  </p>
                </div>
                <div style={styles.openBadge}>
                  <span style={styles.openDot} />
                  <span style={styles.openText}>Open</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.sectionAccentBar} />
                <h3 style={styles.cardTitle}>Payment Method</h3>
              </div>
              <div style={styles.paymentOptions}>
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.id}
                    style={{
                      ...styles.paymentOption,
                      ...(paymentMethod === method.id ? styles.paymentOptionActive : {}),
                    }}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div style={styles.paymentRadio}>
                      <div
                        style={{
                          ...styles.radioInner,
                          ...(paymentMethod === method.id ? styles.radioInnerActive : {}),
                        }}
                      />
                    </div>
                    <span style={styles.paymentEmoji}>{method.icon}</span>
                    <div style={styles.paymentText}>
                      <p style={styles.paymentLabel}>{method.label}</p>
                      <p style={styles.paymentSub}>{method.sub}</p>
                    </div>
                    {method.id === "cod" && (
                      <span style={styles.recommendedBadge}>Recommended</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div style={styles.summaryCol}>
            <div style={styles.summaryCard}>
              <div style={styles.cardHeader}>
                <div style={styles.sectionAccentBar} />
                <h3 style={styles.cardTitle}>Order Summary</h3>
              </div>

              {/* Cart items */}
              <div style={styles.summaryItems}>
                {cart.length === 0 ? (
                  <p style={{ color: "#6B7280", fontSize: "13px" }}>No items in cart.</p>
                ) : (
                  cart.map((item: any, idx: number) => (
                    <div
                      key={item._id}
                      style={{
                        ...styles.summaryItem,
                        ...(idx === cart.length - 1 ? { borderBottom: "none" } : {}),
                      }}
                    >
                      <div style={styles.summaryItemIcon}>💊</div>
                      <div style={styles.summaryItemInfo}>
                        <p style={styles.summaryItemName}>{item.name}</p>
                        <p style={styles.summaryItemQty}>Qty: {item.qty}</p>
                      </div>
                      {item.price ? (
                        <p style={styles.summaryItemPrice}>
                          ₹{(item.price * item.qty).toFixed(2)}
                        </p>
                      ) : null}
                    </div>
                  ))
                )}
              </div>

              <div style={styles.summaryDivider} />

              <div style={styles.priceRows}>
                <div style={styles.priceRow}>
                  <span style={styles.priceLabel}>Items ({totalItems})</span>
                  <span style={styles.priceValue}>
                    {totalPrice > 0 ? `₹${totalPrice.toFixed(2)}` : "—"}
                  </span>
                </div>
                <div style={styles.priceRow}>
                  <span style={styles.priceLabel}>Delivery</span>
                  <span style={styles.priceFree}>FREE</span>
                </div>
                <div style={styles.priceRow}>
                  <span style={styles.priceLabel}>Platform Fee</span>
                  <span style={styles.priceValue}>₹0.00</span>
                </div>
              </div>

              <div style={styles.summaryDivider} />

              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalValue}>
                  {totalPrice > 0 ? `₹${totalPrice.toFixed(2)}` : "—"}
                </span>
              </div>

              <div style={styles.summaryDivider} />

              {/* Delivery estimate */}
              <div style={styles.estimateRow}>
                <span style={styles.estimateIcon}>🕐</span>
                <div>
                  <p style={styles.estimateLabel}>Estimated Delivery</p>
                  <p style={styles.estimateValue}>Within 2–4 hours</p>
                </div>
              </div>

              <div style={styles.summaryDivider} />

              {/* Place Order */}
              <button
                style={{
                  ...styles.placeButton,
                  ...(placeHovered ? styles.placeButtonHovered : {}),
                }}
                onClick={placeOrder}
                onMouseEnter={() => setPlaceHovered(true)}
                onMouseLeave={() => setPlaceHovered(false)}
              >
                <span>Place Order</span>
                <span style={styles.placeArrow}>→</span>
              </button>

              <p style={styles.secureNote}>🔒 Secure & encrypted checkout</p>

              {/* Trust strip */}
              <div style={styles.trustStrip}>
                {["Verified Pharmacies", "24h Support", "Easy Returns"].map((t) => (
                  <div key={t} style={styles.trustItem}>
                    <span style={styles.trustDot} />
                    <span style={styles.trustText}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <span>© 2024 BharathCare — Trusted Healthcare Platform</span>
          <span style={styles.footerDiv}>|</span>
          <span>All medicines sourced from verified pharmacies</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0%   { transform: scale(0.6); opacity: 0; }
          70%  { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        textarea:focus { outline: none; }
        input:focus    { outline: none; }
      `}</style>
    </div>
  );
};

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles: { [key: string]: CSSProperties } = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#F4F7FB",
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  },
  topAccent: {
    height: "4px",
    background: "linear-gradient(90deg, #1C2F5E 0%, #49B6C6 60%, #7EDCE2 100%)",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "32px 20px 48px",
    animation: "fadeSlideUp 0.45s ease both",
  },

  // ─── Header ────────────────────────────────────────────────────────────────
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px",
    flexWrap: "wrap" as const,
    gap: "14px",
  },
  backButton: {
    background: "#FFFFFF",
    border: "1.5px solid #E8EEF6",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#1C2F5E",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  headerCenter: { textAlign: "center" as const, flex: 1 },
  brandRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    marginBottom: "4px",
  },
  brandDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: "#49B6C6",
  },
  brandLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#49B6C6",
    letterSpacing: "1.2px",
    textTransform: "uppercase" as const,
  },
  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "800",
    color: "#1C2F5E",
    letterSpacing: "-0.5px",
  },

  // ─── Step Indicator ────────────────────────────────────────────────────────
  stepIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  stepDone: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: "#49B6C6",
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stepActive: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: "#1C2F5E",
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stepPending: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: "#E8EEF6",
    color: "#9CA3AF",
    fontSize: "12px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stepLine: {
    width: "24px",
    height: "2px",
    backgroundColor: "#E8EEF6",
    borderRadius: "2px",
  },

  // ─── Layout ────────────────────────────────────────────────────────────────
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: "24px",
    alignItems: "start",
  },
  formCol: { display: "flex", flexDirection: "column" as const, gap: "20px" },
  summaryCol: {},

  // ─── Card ──────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    border: "1.5px solid #E8EEF6",
    padding: "24px",
    boxShadow: "0 2px 12px rgba(28,47,94,0.06)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "22px",
  },
  sectionAccentBar: {
    width: "4px",
    height: "20px",
    borderRadius: "4px",
    background: "linear-gradient(180deg, #49B6C6 0%, #1C2F5E 100%)",
    flexShrink: 0,
  },
  cardTitle: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "800",
    color: "#1C2F5E",
  },

  // ─── Form Fields ───────────────────────────────────────────────────────────
  fieldGroup: { marginBottom: "18px" },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    color: "#1C2F5E",
    marginBottom: "8px",
    letterSpacing: "0.1px",
  },
  inputWrapper: { position: "relative" as const },
  inputIcon: {
    position: "absolute" as const,
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "16px",
    pointerEvents: "none" as const,
  },
  input: {
    width: "100%",
    padding: "12px 14px 12px 44px",
    fontSize: "14px",
    border: "1.5px solid #E8EEF6",
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
    fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box" as const,
  },
  textareaWrapper: { position: "relative" as const },
  textarea: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "14px",
    border: "1.5px solid #E8EEF6",
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
    fontFamily: "inherit",
    resize: "vertical" as const,
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box" as const,
    lineHeight: "1.6",
  },
  inputFocused: {
    borderColor: "#49B6C6",
    boxShadow: "0 0 0 3px rgba(73,182,198,0.12)",
  },
  inputError: {
    borderColor: "#EF4444",
    boxShadow: "0 0 0 3px rgba(239,68,68,0.08)",
  },
  errorText: {
    margin: "6px 0 0",
    fontSize: "12px",
    color: "#EF4444",
    fontWeight: "600",
  },

  // ─── Pharmacy Row ──────────────────────────────────────────────────────────
  pharmacyRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#F4F7FB",
    border: "1.5px solid #E8EEF6",
    borderRadius: "12px",
    padding: "14px 16px",
    marginTop: "4px",
  },
  pharmacyIconWrap: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "#EBF9FB",
    border: "1px solid #B8EBF0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  },
  pharmacyInfo: { flex: 1 },
  pharmacyLabel: {
    margin: "0 0 2px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase" as const,
    letterSpacing: "0.6px",
  },
  pharmacyName: {
    margin: "0 0 3px",
    fontSize: "14px",
    fontWeight: "800",
    color: "#1C2F5E",
  },
  pharmacyArea: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  pharmacyDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: "#49B6C6",
    flexShrink: 0,
    display: "inline-block",
  },
  openBadge: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#ECFDF5",
    border: "1px solid #A7F3D0",
    borderRadius: "20px",
    padding: "4px 10px",
    flexShrink: 0,
  },
  openDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#10B981",
  },
  openText: { fontSize: "11px", fontWeight: "700", color: "#065F46" },

  // ─── Payment Options ───────────────────────────────────────────────────────
  paymentOptions: { display: "flex", flexDirection: "column" as const, gap: "10px" },
  paymentOption: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 16px",
    border: "1.5px solid #E8EEF6",
    borderRadius: "12px",
    cursor: "pointer",
    backgroundColor: "#FFFFFF",
    transition: "all 0.18s",
    position: "relative" as const,
  },
  paymentOptionActive: {
    borderColor: "#49B6C6",
    backgroundColor: "#EBF9FB",
    boxShadow: "0 0 0 3px rgba(73,182,198,0.10)",
  },
  paymentRadio: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #CBD5E1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  radioInner: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    transition: "background-color 0.15s",
  },
  radioInnerActive: { backgroundColor: "#49B6C6" },
  paymentEmoji: { fontSize: "22px", flexShrink: 0 },
  paymentText: { flex: 1 },
  paymentLabel: {
    margin: "0 0 2px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#1F2937",
  },
  paymentSub: { margin: 0, fontSize: "12px", color: "#6B7280" },
  recommendedBadge: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#1C2F5E",
    backgroundColor: "#EBF9FB",
    border: "1px solid #B8EBF0",
    borderRadius: "20px",
    padding: "3px 10px",
    flexShrink: 0,
  },

  // ─── Summary Card ──────────────────────────────────────────────────────────
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    border: "1.5px solid #E8EEF6",
    padding: "24px",
    boxShadow: "0 2px 12px rgba(28,47,94,0.06)",
    position: "sticky" as const,
    top: "20px",
  },
  summaryItems: { marginBottom: "4px" },
  summaryItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 0",
    borderBottom: "1px solid #F4F7FB",
  },
  summaryItemIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    backgroundColor: "#EBF9FB",
    border: "1px solid #B8EBF0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },
  summaryItemInfo: { flex: 1 },
  summaryItemName: {
    margin: "0 0 2px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#1F2937",
  },
  summaryItemQty: { margin: 0, fontSize: "12px", color: "#6B7280" },
  summaryItemPrice: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "800",
    color: "#1C2F5E",
    flexShrink: 0,
  },
  summaryDivider: {
    height: "1px",
    backgroundColor: "#E8EEF6",
    margin: "14px 0",
  },
  priceRows: { display: "flex", flexDirection: "column" as const, gap: "10px" },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: { fontSize: "13px", color: "#6B7280", fontWeight: "500" },
  priceValue: { fontSize: "13px", color: "#1F2937", fontWeight: "600" },
  priceFree: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#49B6C6",
    backgroundColor: "#EBF9FB",
    padding: "2px 10px",
    borderRadius: "12px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: "16px", fontWeight: "800", color: "#1C2F5E" },
  totalValue: { fontSize: "20px", fontWeight: "800", color: "#1C2F5E" },
  estimateRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  estimateIcon: { fontSize: "22px" },
  estimateLabel: {
    margin: "0 0 2px",
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
  },
  estimateValue: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "700",
    color: "#1C2F5E",
  },
  placeButton: {
    width: "100%",
    padding: "14px 20px",
    background: "linear-gradient(135deg, #1C2F5E 0%, #2A4A7A 100%)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.22s",
    boxShadow: "0 4px 16px rgba(28,47,94,0.22)",
    marginBottom: "10px",
    letterSpacing: "0.2px",
  },
  placeButtonHovered: {
    background: "linear-gradient(135deg, #49B6C6 0%, #3DA8B5 100%)",
    boxShadow: "0 6px 22px rgba(73,182,198,0.30)",
    transform: "translateY(-1px)",
  },
  placeArrow: { fontSize: "18px", fontWeight: "700" },
  secureNote: {
    margin: "0 0 16px",
    fontSize: "12px",
    color: "#9CA3AF",
    textAlign: "center" as const,
  },
  trustStrip: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    borderTop: "1px solid #F4F7FB",
    paddingTop: "14px",
  },
  trustItem: { display: "flex", alignItems: "center", gap: "8px" },
  trustDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#49B6C6",
    flexShrink: 0,
  },
  trustText: { fontSize: "12px", color: "#6B7280", fontWeight: "500" },

  // ─── Success Screen ────────────────────────────────────────────────────────
  successContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 4px)",
    padding: "40px 20px",
    backgroundColor: "#F4F7FB",
  },
  successCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    border: "1.5px solid #E8EEF6",
    padding: "48px 40px",
    maxWidth: "480px",
    width: "100%",
    textAlign: "center" as const,
    boxShadow: "0 8px 40px rgba(28,47,94,0.10)",
    animation: "fadeSlideUp 0.5s ease both",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "6px",
  },
  successRing: {
    width: "88px",
    height: "88px",
    borderRadius: "50%",
    border: "3px solid #49B6C6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
  },
  successInner: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1C2F5E 0%, #49B6C6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successCheck: {
    fontSize: "28px",
    color: "#FFFFFF",
    fontWeight: "800",
    lineHeight: 1,
  },
  successTitle: {
    margin: "8px 0 4px",
    fontSize: "28px",
    fontWeight: "800",
    color: "#1C2F5E",
    letterSpacing: "-0.5px",
  },
  successSubtext: {
    margin: "0 0 20px",
    fontSize: "14px",
    color: "#6B7280",
    lineHeight: "1.6",
  },
  orderIdBadge: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#F4F7FB",
    border: "1.5px solid #E8EEF6",
    borderRadius: "10px",
    padding: "10px 20px",
    marginBottom: "24px",
  },
  orderIdLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase" as const,
    letterSpacing: "0.8px",
  },
  orderIdValue: {
    fontSize: "15px",
    fontWeight: "800",
    color: "#1C2F5E",
    letterSpacing: "1px",
  },
  successDetails: {
    width: "100%",
    backgroundColor: "#F4F7FB",
    border: "1.5px solid #E8EEF6",
    borderRadius: "14px",
    padding: "18px 20px",
    marginBottom: "24px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "14px",
    textAlign: "left" as const,
  },
  successDetailRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  successDetailIcon: { fontSize: "18px", flexShrink: 0, marginTop: "1px" },
  successDetailLabel: {
    margin: "0 0 2px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  successDetailValue: {
    margin: 0,
    fontSize: "13px",
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: "1.5",
  },
  homeButton: {
    width: "100%",
    padding: "13px 20px",
    background: "linear-gradient(135deg, #1C2F5E 0%, #2A4A7A 100%)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.22s",
    boxShadow: "0 4px 14px rgba(28,47,94,0.20)",
    marginBottom: "10px",
  },
  ordersLink: {
    background: "none",
    border: "none",
    color: "#49B6C6",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    padding: "4px",
  },

  // ─── Footer ────────────────────────────────────────────────────────────────
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    fontSize: "12px",
    color: "#9CA3AF",
    flexWrap: "wrap" as const,
    paddingTop: "36px",
  },
  footerDiv: { color: "#D1D5DB" },
};

export default Checkout;