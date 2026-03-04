import { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);
  return (
    <div
      style={{
        padding: "40px 20px",
        backgroundColor: "#F4F7FB",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#1C2F5E",
            marginBottom: 8,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Order History
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "#6B7280",
            marginBottom: 32,
          }}
        >
          View all your previous medicine orders
        </p>

        {orders.length === 0 ? (
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              padding: 60,
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(28, 47, 94, 0.08)",
              border: "1px solid rgba(28, 47, 94, 0.06)",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#F4F7FB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#1F2937",
                marginBottom: 8,
              }}
            >
              No orders yet
            </h3>
            <p
              style={{
                fontSize: 15,
                color: "#6B7280",
                margin: 0,
              }}
            >
              Your order history will appear here once you make a purchase
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {orders.map((o: any) => (
              <div
              key={o._id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: "0 2px 8px rgba(28, 47, 94, 0.08)",
                  border: "1px solid rgba(28, 47, 94, 0.06)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(73, 182, 198, 0.15)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(28, 47, 94, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 16,
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
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
                      }}
                    >
                      Order #{o._id.slice(-6)}
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        color: "#6B7280",
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {new Date(o.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 13,
                        color: "#6B7280",
                        margin: "0 0 4px 0",
                        fontWeight: 500,
                      }}
                    >
                      Total Amount
                    </p>
                    <p
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#1C2F5E",
                        margin: 0,
                      }}
                    >
                      ₹{o.total}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #E5E7EB",
                    paddingTop: 16,
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1F2937",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Items Ordered
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {o.items.map((item: any, idx: number) => (
                      <span
                        key={item._id || idx}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#F4F7FB",
                          color: "#1F2937",
                          fontSize: 14,
                          padding: "6px 14px",
                          borderRadius: 8,
                          border: "1px solid #E5E7EB",
                        }}
                      >
                        {item.medicineId?.name} (x{item.quantity})
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
