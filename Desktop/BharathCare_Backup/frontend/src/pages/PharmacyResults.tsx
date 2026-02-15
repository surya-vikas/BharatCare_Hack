import { useNavigate } from "react-router-dom";
import { pharmacies } from "../data/pharmacies";
import { useState } from "react";
import type { CSSProperties } from "react";


const PharmacyResults = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const getQuantity = (pharmacyId: number) => quantities[pharmacyId] || 1;

  const updateQuantity = (pharmacyId: number, delta: number) => {
    const currentQty = getQuantity(pharmacyId);
    const newQty = Math.max(1, currentQty + delta);
    const pharmacy = pharmacies.find((p) => p.id === pharmacyId);
    const maxQty = pharmacy?.stock || 1;
    
    setQuantities({
      ...quantities,
      [pharmacyId]: Math.min(newQty, maxQty),
    });
  };

  const handleOrder = (pharmacy: typeof pharmacies[0]) => {
    const qty = getQuantity(pharmacy.id);
    navigate("/order-summary", {
      state: {
        pharmacy: pharmacy.name,
        medicine: "Paracetamol",
        price: pharmacy.price,
        qty: qty,
      },
    });
  };

  // Sort pharmacies by price (lowest first)
  const sortedPharmacies = [...pharmacies].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPharmacies[0]?.price;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <button style={styles.backButton} onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div>
            <h2 style={styles.title}>Available Pharmacies</h2>
            <p style={styles.subtitle}>
              Showing results for <strong>Paracetamol 500mg</strong>
            </p>
          </div>
        </div>

        {/* Filter/Info Bar */}
        <div style={styles.infoBar}>
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>🏥</span>
            <span style={styles.infoText}>
              {pharmacies.length} pharmacies available
            </span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoIcon}>💰</span>
            <span style={styles.infoText}>
              Starting from ₹{lowestPrice}
            </span>
          </div>
        </div>

        {/* Pharmacies List */}
        <div style={styles.pharmacyList}>
          {sortedPharmacies.map((pharmacy, index) => {
            const qty = getQuantity(pharmacy.id);
            const isLowestPrice = pharmacy.price === lowestPrice;
            const isOutOfStock = pharmacy.stock === 0;
            const isLowStock = pharmacy.stock > 0 && pharmacy.stock <= 5;

            return (
              <div key={pharmacy.id} style={styles.pharmacyCard}>
                {/* Best Price Badge */}
                {isLowestPrice && !isOutOfStock && (
                  <div style={styles.bestPriceBadge}>
                    ⭐ Best Price
                  </div>
                )}

                {/* Card Content */}
                <div style={styles.cardContent}>
                  {/* Pharmacy Info */}
                  <div style={styles.pharmacyInfo}>
                    <div style={styles.pharmacyHeader}>
                      <div style={styles.pharmacyIcon}>🏥</div>
                      <div style={styles.pharmacyDetails}>
                        <h3 style={styles.pharmacyName}>{pharmacy.name}</h3>
                        <div style={styles.pharmacyMeta}>
                          <span style={styles.metaItem}>
                          </span>
                          <span style={styles.metaDot}>•</span>
                          <span style={styles.metaItem}>
                          </span>
                          <span style={styles.metaDot}>•</span>
                          <span style={styles.metaItem}>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stock Status */}
                    <div style={styles.stockSection}>
                      {isOutOfStock ? (
                        <span style={styles.stockBadgeOut}>
                          ❌ Out of Stock
                        </span>
                      ) : isLowStock ? (
                        <span style={styles.stockBadgeLow}>
                          ⚠️ Only {pharmacy.stock} left
                        </span>
                      ) : (
                        <span style={styles.stockBadgeIn}>
                          ✅ In Stock ({pharmacy.stock} available)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={styles.divider}></div>

                  {/* Price & Order Section */}
                  <div style={styles.orderSection}>
                    <div style={styles.priceSection}>
                      <span style={styles.priceLabel}>Price per unit</span>
                      <span style={styles.price}>₹{pharmacy.price}</span>
                      {qty > 1 && (
                        <span style={styles.totalPrice}>
                          Total: ₹{pharmacy.price * qty}
                        </span>
                      )}
                    </div>

                    {!isOutOfStock && (
                      <div style={styles.quantitySection}>
                        <span style={styles.quantityLabel}>Quantity:</span>
                        <div style={styles.quantityControls}>
                          <button
                            style={styles.quantityButton}
                            onClick={() => updateQuantity(pharmacy.id, -1)}
                            disabled={qty <= 1}
                          >
                            −
                          </button>
                          <span style={styles.quantityValue}>{qty}</span>
                          <button
                            style={styles.quantityButton}
                            onClick={() => updateQuantity(pharmacy.id, 1)}
                            disabled={qty >= pharmacy.stock}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      style={{
                        ...styles.orderButton,
                        ...(isOutOfStock ? styles.orderButtonDisabled : {}),
                        ...(isLowestPrice && !isOutOfStock
                          ? styles.orderButtonBest
                          : {}),
                      }}
                      onClick={() => handleOrder(pharmacy)}
                      disabled={isOutOfStock}
                    >
                      {isOutOfStock ? "Out of Stock" : "Order Now →"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div style={styles.footerInfo}>
          <p style={styles.footerText}>
            💡 <strong>Tip:</strong> Prices are sorted from lowest to highest
            for your convenience
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
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "20px",
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
    marginTop: "8px",
  },
  title: {
    margin: "0 0 8px 0",
    color: "#1e293b",
    fontSize: "28px",
    fontWeight: "700",
  },
  subtitle: {
    margin: 0,
    color: "#64748b",
    fontSize: "15px",
  },
  infoBar: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  infoIcon: {
    fontSize: "20px",
  },
  infoText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b",
  },
  pharmacyList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "20px",
  },
  pharmacyCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
    position: "relative",
    overflow: "hidden",
  },
  bestPriceBadge: {
    backgroundColor: "#fbbf24",
    color: "#78350f",
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: "700",
    textAlign: "center",
    borderBottom: "1px solid #f59e0b",
  },
  cardContent: {
    padding: "24px",
  },
  pharmacyInfo: {
    marginBottom: "20px",
  },
  pharmacyHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "12px",
  },
  pharmacyIcon: {
    fontSize: "48px",
    flexShrink: 0,
  },
  pharmacyDetails: {
    flex: 1,
  },
  pharmacyName: {
    margin: "0 0 8px 0",
    fontSize: "22px",
    fontWeight: "700",
    color: "#1e293b",
  },
  pharmacyMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  metaItem: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "500",
  },
  metaDot: {
    fontSize: "13px",
    color: "#cbd5e1",
  },
  stockSection: {
    marginTop: "12px",
  },
  stockBadgeIn: {
    display: "inline-block",
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    border: "1px solid #86efac",
  },
  stockBadgeLow: {
    display: "inline-block",
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    border: "1px solid #fbbf24",
  },
  stockBadgeOut: {
    display: "inline-block",
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    border: "1px solid #fca5a5",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e2e8f0",
    margin: "20px 0",
  },
  orderSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  priceSection: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  priceLabel: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
  },
  price: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#4a90e2",
  },
  totalPrice: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "600",
  },
  quantitySection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  quantityLabel: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "600",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#f8fafc",
    padding: "4px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  quantityButton: {
    width: "32px",
    height: "32px",
    backgroundColor: "white",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    color: "#475569",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityValue: {
    minWidth: "40px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "700",
    color: "#1e293b",
  },
  orderButton: {
    padding: "14px 24px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  orderButtonDisabled: {
    backgroundColor: "#cbd5e1",
    cursor: "not-allowed",
  },
  orderButtonBest: {
    backgroundColor: "#22c55e",
  },
  footerInfo: {
    backgroundColor: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
  },
  footerText: {
    margin: 0,
    fontSize: "14px",
    color: "#1e40af",
  },
};

export default PharmacyResults;