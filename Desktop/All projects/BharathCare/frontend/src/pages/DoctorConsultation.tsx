import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { CSSProperties } from "react";

const DoctorConsultation = () => {
  const navigate = useNavigate();
  const [isConsulting, setIsConsulting] = useState(false);

  const handleStartConsultation = () => {
    setIsConsulting(true);
    // Simulate consultation start
    setTimeout(() => {
      alert("Connecting you with Dr. Anil Kumar...");
      setIsConsulting(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate("/user")}>
          ← Back
        </button>
        <h2 style={styles.title}>Doctor Consultation</h2>
      </div>

      <div style={styles.content}>
        <div style={styles.doctorCard}>
          <div style={styles.doctorHeader}>
            <div style={styles.avatarContainer}>
              <div style={styles.avatar}>
                <span style={styles.avatarText}>AK</span>
              </div>
              <span style={styles.statusBadge}>● Available</span>
            </div>
            <div style={styles.doctorInfo}>
              <h3 style={styles.doctorName}>Dr. Anil Kumar</h3>
              <p style={styles.specialization}>General Physician</p>
              <div style={styles.credentials}>
                <span style={styles.credential}>MBBS, MD</span>
                <span style={styles.separator}>•</span>
                <span style={styles.credential}>15 years experience</span>
              </div>
            </div>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.details}>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Consultation Fee:</span>
              <span style={styles.detailValue}>₹500</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Languages:</span>
              <span style={styles.detailValue}>English, Hindi, Telugu</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Rating:</span>
              <span style={styles.detailValue}>⭐ 4.8 (250+ reviews)</span>
            </div>
          </div>

          <button
            style={{
              ...styles.consultButton,
              ...(isConsulting ? styles.consultButtonDisabled : {}),
            }}
            onClick={handleStartConsultation}
            disabled={isConsulting}
          >
            {isConsulting ? "Connecting..." : "Start Video Consultation"}
          </button>

          <p style={styles.note}>
            💡 Please have your medical history and symptoms ready
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    padding: "20px",
  },
  header: {
    maxWidth: "800px",
    margin: "0 auto 30px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
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
    color: "#1a1a1a",
    fontSize: "28px",
    fontWeight: "600",
  },
  content: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  doctorCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  doctorHeader: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#4a90e2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: "28px",
    fontWeight: "600",
  },
  statusBadge: {
    position: "absolute",
    bottom: "0",
    right: "0",
    backgroundColor: "white",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
    color: "#22c55e",
    fontWeight: "500",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    margin: "0 0 8px 0",
    fontSize: "24px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  specialization: {
    margin: "0 0 8px 0",
    fontSize: "16px",
    color: "#666",
  },
  credentials: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    fontSize: "14px",
    color: "#888",
  },
  credential: {
    color: "#888",
  },
  separator: {
    color: "#ddd",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "20px 0",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "25px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: "15px",
    color: "#666",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: "15px",
    color: "#1a1a1a",
    fontWeight: "500",
  },
  consultButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  consultButtonDisabled: {
    backgroundColor: "#94b8e0",
    cursor: "not-allowed",
  },
  note: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
    backgroundColor: "#f0f9ff",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #bfdbfe",
  },
};

export default DoctorConsultation;