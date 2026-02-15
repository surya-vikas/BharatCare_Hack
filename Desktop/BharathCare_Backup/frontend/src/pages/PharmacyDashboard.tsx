  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import type { CSSProperties } from "react";

  type Order = {
    id: number;
    patientName: string;
    medicine: string;
    quantity: number;
    price: number;
    status: "pending" | "processing" | "ready" | "delivered";
    orderTime: string;
    prescriptionRequired: boolean;
  };

  const PharmacyDashboard = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState<Order[]>([
      {
        id: 1001,
        patientName: "Ramesh Kumar",
        medicine: "Paracetamol 500mg",
        quantity: 2,
        price: 44,
        status: "pending",
        orderTime: "10:30 AM",
        prescriptionRequired: false,
      },
      {
        id: 1002,
        patientName: "Sita Devi",
        medicine: "Amoxicillin 250mg",
        quantity: 1,
        price: 120,
        status: "processing",
        orderTime: "11:00 AM",
        prescriptionRequired: true,
      },
      {
        id: 1003,
        patientName: "Vijay Sharma",
        medicine: "Cetrizine 10mg",
        quantity: 3,
        price: 75,
        status: "ready",
        orderTime: "11:30 AM",
        prescriptionRequired: false,
      },
    ]);

    const [selectedTab, setSelectedTab] = useState<"all" | "pending" | "ready">(
      "all"
    );

    const updateOrderStatus = (
      orderId: number,
      newStatus: Order["status"]
    ) => {
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    };

    const getStatusColor = (status: Order["status"]) => {
      switch (status) {
        case "pending":
          return "#F59E0B";
        case "processing":
          return "#49B6C6";
        case "ready":
          return "#10B981";
        case "delivered":
          return "#6B7280";
        default:
          return "#6B7280";
      }
    };

    const getStatusBgColor = (status: Order["status"]) => {
      switch (status) {
        case "pending":
          return "#FEF3C7";
        case "processing":
          return "#E8F7F9";
        case "ready":
          return "#D1FAE5";
        case "delivered":
          return "#F4F7FB";
        default:
          return "#F4F7FB";
      }
    };

    const getStatusText = (status: Order["status"]) => {
      switch (status) {
        case "pending":
          return "Pending";
        case "processing":
          return "Processing";
        case "ready":
          return "Ready for Pickup";
        case "delivered":
          return "Delivered";
        default:
          return "Unknown";
      }
    };

    const filteredOrders = orders.filter((order) => {
      if (selectedTab === "all") return true;
      if (selectedTab === "pending") return order.status === "pending";
      if (selectedTab === "ready") return order.status === "ready";
      return true;
    });

    const pendingCount = orders.filter((o) => o.status === "pending").length;
    const readyCount = orders.filter((o) => o.status === "ready").length;

    return (
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.headerWrapper}>
          <div style={styles.header}>
            <div>
              <h2 style={styles.title}>Pharmacy Dashboard</h2>
              <p style={styles.subtitle}>Apollo Pharmacy - Main Branch</p>
            </div>

            <button 
              onClick={() => navigate("/pharmacy/billing")}
              style={styles.billingButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3BA4B3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#49B6C6';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              Open Billing Software
            </button>
          </div>

          {/* Stats Cards */}
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <div style={styles.statIconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C2F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <div>
                <span style={styles.statNumber}>{orders.length}</span>
                <span style={styles.statLabel}>Total Orders</span>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={{ ...styles.statIconWrapper, backgroundColor: '#FEF3C7' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <span style={{ ...styles.statNumber, color: "#F59E0B" }}>
                  {pendingCount}
                </span>
                <span style={styles.statLabel}>Pending</span>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={{ ...styles.statIconWrapper, backgroundColor: '#D1FAE5' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <span style={{ ...styles.statNumber, color: "#10B981" }}>
                  {readyCount}
                </span>
                <span style={styles.statLabel}>Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabsWrapper}>
          <div style={styles.tabsContainer}>
            {[
              { key: "all", label: "All Orders" },
              { key: "pending", label: "Pending" },
              { key: "ready", label: "Ready for Pickup" }
            ].map((tab) => (
              <button
                key={tab.key}
                style={{
                  ...styles.tab,
                  ...(selectedTab === tab.key ? styles.tabActive : {}),
                }}
                onClick={() => setSelectedTab(tab.key as any)}
                onMouseEnter={(e) => {
                  if (selectedTab !== tab.key) {
                    e.currentTarget.style.backgroundColor = '#F4F7FB';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTab !== tab.key) {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div style={styles.content}>
          <div style={styles.ordersList}>
            {filteredOrders.map((order) => (
              <div 
                key={order.id} 
                style={styles.orderCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(73, 182, 198, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(28, 47, 94, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={styles.orderHeader}>
                  <div>
                    <div style={styles.orderIdBadge}>Order #{order.id}</div>
                    <h4 style={styles.patientName}>{order.patientName}</h4>
                    <p style={styles.orderTime}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {order.orderTime}
                    </p>
                  </div>
                  <span
                    style={{
                      ...styles.statusBadge,
                      color: getStatusColor(order.status),
                      backgroundColor: getStatusBgColor(order.status),
                    }}
                  >
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(order.status),
                      marginRight: 6
                    }}/>
                    {getStatusText(order.status)}
                  </span>
                </div>

                <div style={styles.medicineInfo}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#49B6C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2"/>
                    <rect x="9" y="9" width="6" height="6"/>
                    <line x1="9" y1="1" x2="9" y2="4"/>
                    <line x1="15" y1="1" x2="15" y2="4"/>
                    <line x1="9" y1="20" x2="9" y2="23"/>
                    <line x1="15" y1="20" x2="15" y2="23"/>
                    <line x1="20" y1="9" x2="23" y2="9"/>
                    <line x1="20" y1="14" x2="23" y2="14"/>
                    <line x1="1" y1="9" x2="4" y2="9"/>
                    <line x1="1" y1="14" x2="4" y2="14"/>
                  </svg>
                  <div style={styles.medicineDetails}>
                    <span style={styles.medicineName}>{order.medicine}</span>
                    <span style={styles.medicineQuantity}>Quantity: {order.quantity}</span>
                    {order.prescriptionRequired && (
                      <span style={styles.prescriptionBadge}>
                        Prescription Required
                      </span>
                    )}
                  </div>
                  <div style={styles.priceTag}>₹{order.price}</div>
                </div>

                <div style={styles.orderActions}>
                  {order.status === "pending" && (
                    <button
                      style={styles.actionButtonPrimary}
                      onClick={() => updateOrderStatus(order.id, "processing")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#3BA4B3';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#49B6C6';
                      }}
                    >
                      Accept Order
                    </button>
                  )}
                  {order.status === "processing" && (
                    <button
                      style={styles.actionButtonPrimary}
                      onClick={() => updateOrderStatus(order.id, "ready")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#3BA4B3';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#49B6C6';
                      }}
                    >
                      Mark as Ready
                    </button>
                  )}
                  {order.status === "ready" && (
                    <button
                      style={styles.actionButtonSuccess}
                      onClick={() => updateOrderStatus(order.id, "delivered")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#059669';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#10B981';
                      }}
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const styles: { [key: string]: CSSProperties } = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#F4F7FB",
      padding: "40px 20px",
    },
    headerWrapper: {
      maxWidth: "1200px",
      margin: "0 auto 32px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
      flexWrap: "wrap",
      gap: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 700,
      color: "#1C2F5E",
      margin: "0 0 8px 0",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    subtitle: {
      fontSize: 16,
      color: "#6B7280",
      margin: 0,
    },
    billingButton: {
      padding: "12px 24px",
      backgroundColor: "#49B6C6",
      color: "#FFFFFF",
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 15,
      display: "flex",
      alignItems: "center",
      transition: "all 0.2s ease",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    statsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: 16,
    },
    statCard: {
      backgroundColor: "#FFFFFF",
      padding: 20,
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      gap: 16,
      boxShadow: "0 2px 8px rgba(28, 47, 94, 0.08)",
      border: "1px solid rgba(28, 47, 94, 0.06)",
    },
    statIconWrapper: {
      width: 48,
      height: 48,
      borderRadius: 10,
      backgroundColor: "#F4F7FB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    statNumber: {
      display: "block",
      fontSize: 24,
      fontWeight: 700,
      color: "#1C2F5E",
      marginBottom: 4,
    },
    statLabel: {
      display: "block",
      fontSize: 13,
      color: "#6B7280",
      fontWeight: 500,
    },
    tabsWrapper: {
      maxWidth: "1200px",
      margin: "0 auto 24px",
    },
    tabsContainer: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
    },
    tab: {
      padding: "12px 20px",
      border: "1px solid #E5E7EB",
      borderRadius: 8,
      background: "#FFFFFF",
      cursor: "pointer",
      fontSize: 15,
      fontWeight: 600,
      color: "#6B7280",
      transition: "all 0.2s ease",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    tabActive: {
      backgroundColor: "#1C2F5E",
      color: "#FFFFFF",
      borderColor: "#1C2F5E",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    ordersList: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
    },
    orderCard: {
      background: "#FFFFFF",
      padding: 24,
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(28, 47, 94, 0.08)",
      border: "1px solid rgba(28, 47, 94, 0.06)",
      transition: "all 0.3s ease",
    },
    orderHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 16,
      flexWrap: "wrap",
      gap: 12,
    },
    orderIdBadge: {
      display: "inline-block",
      backgroundColor: "#F4F7FB",
      color: "#1C2F5E",
      fontSize: 12,
      fontWeight: 600,
      padding: "4px 12px",
      borderRadius: 6,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    patientName: {
      fontSize: 18,
      fontWeight: 600,
      color: "#1F2937",
      margin: "0 0 6px 0",
    },
    orderTime: {
      fontSize: 14,
      color: "#6B7280",
      margin: 0,
      display: "flex",
      alignItems: "center",
    },
    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      fontWeight: 600,
      fontSize: 13,
      padding: "6px 14px",
      borderRadius: 8,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    medicineInfo: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: 16,
      backgroundColor: "#F4F7FB",
      borderRadius: 10,
      marginBottom: 16,
      flexWrap: "wrap",
    },
    medicineDetails: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 4,
    },
    medicineName: {
      fontSize: 16,
      fontWeight: 600,
      color: "#1F2937",
    },
    medicineQuantity: {
      fontSize: 14,
      color: "#6B7280",
    },
    prescriptionBadge: {
      display: "inline-block",
      fontSize: 12,
      fontWeight: 600,
      color: "#EF4444",
      backgroundColor: "#FEE2E2",
      padding: "4px 10px",
      borderRadius: 6,
      marginTop: 4,
      width: "fit-content",
    },
    priceTag: {
      fontSize: 24,
      fontWeight: 700,
      color: "#1C2F5E",
    },
    orderActions: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
    },
    actionButtonPrimary: {
      backgroundColor: "#49B6C6",
      color: "#FFFFFF",
      border: "none",
      padding: "10px 20px",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 14,
      transition: "all 0.2s ease",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    actionButtonSuccess: {
      backgroundColor: "#10B981",
      color: "#FFFFFF",
      border: "none",
      padding: "10px 20px",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 14,
      transition: "all 0.2s ease",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
  };

  export default PharmacyDashboard;