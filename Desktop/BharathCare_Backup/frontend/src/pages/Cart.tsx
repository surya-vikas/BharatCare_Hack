import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, updateQty } from "../utils/cart";
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

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>(getCart());
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [checkoutHovered, setCheckoutHovered] = useState(false);
  const pharmacy = useMemo(
    () => HYDERABAD_PHARMACIES[Math.floor(Math.random() * HYDERABAD_PHARMACIES.length)],
    []
  );

  const handleQtyChange = (id: string, change: number) => {
    updateQty(id, change);
    setCart(getCart());
  };
  const totalItems = cart.reduce((sum: number, item: any) => sum + item.qty, 0);
  const totalPrice = cart.reduce(
    (sum: number, item: any) => sum + (item.price || 0) * item.qty,
    0
  );

  return (
    <div style={styles.pageWrapper}>
      {/* Top accent bar */}
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
            <h2 style={styles.title}>Your Cart</h2>
          </div>
          {cart.length > 0 && (
            <div style={styles.itemsBadge}>
              <span style={styles.itemsBadgeText}>{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
            </div>
          )}
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIconRing}>
              <span style={styles.emptyIcon}>🛒</span>
            </div>
            <h3 style={styles.emptyTitle}>Your cart is empty</h3>
            <p style={styles.emptySubtext}>
              Browse our medicines and add items to get started.
            </p>
            <button
              style={styles.browseButton}
              onClick={() => navigate("/user/pharmacies")}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = "#3DA8B5";
                (e.target as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = "#49B6C6";
                (e.target as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              Browse Medicines
            </button>
          </div>
        ) : (
          <div style={styles.cartLayout}>
            {/* Cart Items */}
            <div style={styles.itemsSection}>
              <div style={styles.sectionHeaderRow}>
                <div style={styles.sectionAccentBar} />
                <h3 style={styles.sectionTitle}>Order Summary</h3>
              </div>

              <div style={styles.itemsList}>
                {cart.map((item: any, idx: number) => (
                  <div
                  key={item._id}
                    style={{
                      ...styles.cartItem,
                      ...(idx === cart.length - 1 ? { borderBottom: "none" } : {}),
                      ...(hoveredItem === item._id ? styles.cartItemHovered : {}),
                    }}
                    onMouseEnter={() => setHoveredItem(item._id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Medicine Icon */}
                    <div style={styles.medicineIconWrap}>
                      <span style={styles.medicineEmoji}>💊</span>
                    </div>

                    {/* Name + Category */}
                    <div style={styles.itemInfo}>
                      <p style={styles.itemName}>{item.name}</p>
                      <p style={styles.itemMeta}>
                        {item.category || "General Medicine"}
                      </p>
                      {item.price ? (
                        <p style={styles.itemUnitPrice}>
                          ₹{item.price.toFixed(2)} / unit
                        </p>
                      ) : null}
                    </div>

                    {/* Qty Controls */}
                    <div style={styles.qtyControls}>
                      <button
                        style={{
                          ...styles.qtyBtn,
                          ...(item.qty <= 1 ? styles.qtyBtnDisabled : {}),
                        }}
                        onClick={() => handleQtyChange(item._id, -1)}
                        disabled={item.qty <= 0}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span style={styles.qtyValue}>{item.qty}</span>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => handleQtyChange(item._id, +1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Line Total */}
                    {item.price ? (
                      <div style={styles.lineTotal}>
                        <p style={styles.lineTotalValue}>
                          ₹{(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                    ) : null}

                    {/* Remove */}
                    <button
                      style={styles.removeBtn}
                      onClick={() => handleQtyChange(item._id, 0)}
                      aria-label="Remove item"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total Card */}
            <div style={styles.summaryCard}>
              <div style={styles.summaryHeader}>
                <div style={styles.sectionAccentBar} />
                <h3 style={styles.sectionTitle}>Price Details</h3>
              </div>

              <div style={styles.summaryRows}>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>
                    Items ({totalItems})
                  </span>
                  <span style={styles.summaryValue}>
                    {totalPrice > 0 ? `₹${totalPrice.toFixed(2)}` : "—"}
                  </span>
                </div>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Delivery</span>
                  <span style={styles.summaryFree}>FREE</span>
                </div>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Platform Fee</span>
                  <span style={styles.summaryValue}>₹0.00</span>
                </div>
              </div>

              <div style={styles.summaryDivider} />

              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total Amount</span>
                <span style={styles.totalValue}>
                  {totalPrice > 0 ? `₹${totalPrice.toFixed(2)}` : "—"}
                </span>
              </div>

              {totalPrice > 0 && (
                <p style={styles.savingsNote}>
                  🎉 You save ₹0 on this order
                </p>
              )}


              {/* Pharmacy Availability */}
              <div style={styles.pharmacyCard}>
                <div style={styles.pharmacyIconWrap}>
                  <span style={styles.pharmacyEmoji}>🏥</span>
                </div>
                <div style={styles.pharmacyInfo}>
                  <p style={styles.pharmacyAvailLabel}>Available at</p>
                  <p style={styles.pharmacyName}>{pharmacy.name}</p>
                  <p style={styles.pharmacyArea}>
                    <span style={styles.pharmacyDot} />
                    {pharmacy.area}, Hyderabad
                  </p>
                </div>
                <div style={styles.pharmacyLiveBadge}>
                  <span style={styles.pharmacyLiveDot} />
                  <span style={styles.pharmacyLiveText}>Open</span>
                </div>
              </div>

              <button
                style={{
                  ...styles.checkoutButton,
                  ...(checkoutHovered ? styles.checkoutButtonHovered : {}),
                }}
                onClick={() => navigate("/user/checkout")}
                onMouseEnter={() => setCheckoutHovered(true)}
                onMouseLeave={() => setCheckoutHovered(false)}
              >
                <span>Proceed to Checkout</span>
                <span style={styles.checkoutArrow}>→</span>
              </button>

              <p style={styles.secureNote}>
                🔒 Secure & encrypted checkout
              </p>

              {/* Trust badges */}
              <div style={styles.trustBadges}>
                {["Verified Pharmacies", "24h Delivery", "Easy Returns"].map(
                  (badge) => (
                    <div key={badge} style={styles.trustBadge}>
                      <span style={styles.trustDot} />
                      <span style={styles.trustText}>{badge}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          <span>© 2024 BharathCare — Trusted Healthcare Platform</span>
          <span style={styles.footerDivider}>|</span>
          <span>All medicines sourced from verified pharmacies</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  // ─── Page ────────────────────────────────────────────────────────────────
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#F4F7FB",
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  },
  topAccent: {
    height: "4px",
    background: "linear-gradient(90deg, #1C2F5E 0%, #49B6C6 60%, #7EDCE2 100%)",
    width: "100%",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "32px 20px 48px",
    animation: "fadeSlideUp 0.45s ease both",
  },

  // ─── Header ──────────────────────────────────────────────────────────────
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "14px",
  },
  backButton: {
    background: "none",
    border: "1.5px solid #E8EEF6",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#1C2F5E",
    cursor: "pointer",
    fontFamily: "inherit",
    backgroundColor: "#FFFFFF",
    transition: "all 0.18s",
  },
  headerCenter: {
    textAlign: "center",
    flex: 1,
  },
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
  itemsBadge: {
    backgroundColor: "#EBF9FB",
    border: "1px solid #B8EBF0",
    borderRadius: "20px",
    padding: "6px 14px",
  },
  itemsBadgeText: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#1C2F5E",
  },

  // ─── Empty State ─────────────────────────────────────────────────────────
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: "14px",
  },
  emptyIconRing: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    backgroundColor: "#FFFFFF",
    border: "2px solid #E8EEF6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(28,47,94,0.08)",
    marginBottom: "8px",
  },
  emptyIcon: {
    fontSize: "40px",
  },
  emptyTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
    color: "#1C2F5E",
  },
  emptySubtext: {
    margin: "0 0 16px",
    fontSize: "14px",
    color: "#6B7280",
    textAlign: "center" as const,
    maxWidth: "320px",
    lineHeight: "1.6",
  },
  browseButton: {
    padding: "12px 32px",
    backgroundColor: "#49B6C6",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.18s",
    letterSpacing: "0.2px",
  },

  // ─── Layout ──────────────────────────────────────────────────────────────
  cartLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: "24px",
    alignItems: "start",
  },

  // ─── Items Section ────────────────────────────────────────────────────────
  itemsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    border: "1.5px solid #E8EEF6",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(28,47,94,0.06)",
  },
  sectionHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "20px 24px 16px",
    borderBottom: "1px solid #F4F7FB",
  },
  sectionAccentBar: {
    width: "4px",
    height: "20px",
    borderRadius: "4px",
    background: "linear-gradient(180deg, #49B6C6 0%, #1C2F5E 100%)",
    flexShrink: 0,
  },
  sectionTitle: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "800",
    color: "#1C2F5E",
    letterSpacing: "-0.2px",
  },
  itemsList: {
    padding: "8px 0",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px 24px",
    borderBottom: "1px solid #F4F7FB",
    transition: "background-color 0.15s",
  },
  cartItemHovered: {
    backgroundColor: "#FAFCFF",
  },
  medicineIconWrap: {
    width: "46px",
    height: "46px",
    borderRadius: "10px",
    backgroundColor: "#EBF9FB",
    border: "1px solid #B8EBF0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  medicineEmoji: {
    fontSize: "22px",
  },
  itemInfo: {
    flex: 1,
    minWidth: 0,
  },
  itemName: {
    margin: "0 0 3px",
    fontSize: "15px",
    fontWeight: "700",
    color: "#1F2937",
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  itemMeta: {
    margin: "0 0 2px",
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
  },
  itemUnitPrice: {
    margin: 0,
    fontSize: "12px",
    color: "#49B6C6",
    fontWeight: "600",
  },

  // ─── Qty Controls ─────────────────────────────────────────────────────────
  qtyControls: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    backgroundColor: "#F4F7FB",
    border: "1.5px solid #E8EEF6",
    borderRadius: "10px",
    padding: "4px",
    flexShrink: 0,
  },
  qtyBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "7px",
    border: "none",
    backgroundColor: "#FFFFFF",
    color: "#1C2F5E",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
    boxShadow: "0 1px 3px rgba(28,47,94,0.08)",
    fontFamily: "inherit",
    lineHeight: 1,
  },
  qtyBtnDisabled: {
    color: "#CBD5E1",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  qtyValue: {
    minWidth: "28px",
    textAlign: "center" as const,
    fontSize: "15px",
    fontWeight: "800",
    color: "#1C2F5E",
    userSelect: "none" as const,
  },

  // ─── Line Total & Remove ──────────────────────────────────────────────────
  lineTotal: {
    flexShrink: 0,
    minWidth: "72px",
    textAlign: "right" as const,
  },
  lineTotalValue: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "800",
    color: "#1C2F5E",
  },
  removeBtn: {
    background: "none",
    border: "none",
    color: "#CBD5E1",
    fontSize: "14px",
    cursor: "pointer",
    padding: "6px",
    borderRadius: "6px",
    transition: "all 0.15s",
    flexShrink: 0,
    lineHeight: 1,
    fontFamily: "inherit",
  },

  // ─── Summary Card ─────────────────────────────────────────────────────────
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    border: "1.5px solid #E8EEF6",
    padding: "24px",
    boxShadow: "0 2px 12px rgba(28,47,94,0.06)",
    position: "sticky" as const,
    top: "20px",
  },
  summaryHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  summaryRows: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    marginBottom: "18px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: "14px",
    color: "#6B7280",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: "14px",
    color: "#1F2937",
    fontWeight: "600",
  },
  summaryFree: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#49B6C6",
    backgroundColor: "#EBF9FB",
    padding: "2px 10px",
    borderRadius: "12px",
  },
  summaryDivider: {
    height: "1px",
    backgroundColor: "#E8EEF6",
    margin: "16px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  totalLabel: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#1C2F5E",
  },
  totalValue: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#1C2F5E",
  },
  savingsNote: {
    margin: "0 0 20px",
    fontSize: "12px",
    color: "#49B6C6",
    fontWeight: "600",
    textAlign: "center" as const,
  },
  checkoutButton: {
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
    letterSpacing: "0.2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.22s",
    boxShadow: "0 4px 16px rgba(28,47,94,0.22)",
    marginBottom: "12px",
  },
  checkoutButtonHovered: {
    background: "linear-gradient(135deg, #49B6C6 0%, #3DA8B5 100%)",
    boxShadow: "0 6px 22px rgba(73,182,198,0.32)",
    transform: "translateY(-1px)",
  },
  checkoutArrow: {
    fontSize: "18px",
    fontWeight: "700",
  },
  secureNote: {
    margin: "0 0 18px",
    fontSize: "12px",
    color: "#9CA3AF",
    textAlign: "center" as const,
  },
  trustBadges: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    borderTop: "1px solid #F4F7FB",
    paddingTop: "16px",
  },
  trustBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  trustDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#49B6C6",
    flexShrink: 0,
  },
  trustText: {
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
  },


  // ─── Pharmacy Availability ────────────────────────────────────────────────
  pharmacyCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#F4F7FB",
    border: "1.5px solid #E8EEF6",
    borderRadius: "12px",
    padding: "14px 16px",
    marginBottom: "16px",
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
    flexShrink: 0,
  },
  pharmacyEmoji: {
    fontSize: "20px",
  },
  pharmacyInfo: {
    flex: 1,
    minWidth: 0,
  },
  pharmacyAvailLabel: {
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
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    textOverflow: "ellipsis",
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
  pharmacyLiveBadge: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#ECFDF5",
    border: "1px solid #A7F3D0",
    borderRadius: "20px",
    padding: "4px 10px",
    flexShrink: 0,
  },
  pharmacyLiveDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#10B981",
    flexShrink: 0,
  },
  pharmacyLiveText: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#065F46",
  },

  // ─── Footer ───────────────────────────────────────────────────────────────
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
  footerDivider: {
    color: "#D1D5DB",
  },
};

export default Cart;  