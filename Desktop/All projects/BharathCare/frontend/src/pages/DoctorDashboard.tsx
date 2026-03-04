import { useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

type Patient = {
  id: number;
  name: string;
  issue: string;
  age?: number;
  gender?: string;
  appointmentTime?: string;
  status?: "waiting" | "in-progress" | "completed";
};

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [patients] = useState<Patient[]>([
    {
      id: 1,
      name: "Ramesh Kumar",
      issue: "Fever and headache",
      age: 45,
      gender: "Male",
      appointmentTime: "10:30 AM",
      status: "waiting",
    },
    {
      id: 2,
      name: "Sita Devi",
      issue: "Cold and cough",
      age: 38,
      gender: "Female",
      appointmentTime: "11:00 AM",
      status: "waiting",
    },
    {
      id: 3,
      name: "Arjun Reddy",
      issue: "Back pain & fatigue",
      age: 52,
      gender: "Male",
      appointmentTime: "11:30 AM",
      status: "in-progress",
    },
    {
      id: 4,
      name: "Meena Sharma",
      issue: "Skin allergy rash",
      age: 29,
      gender: "Female",
      appointmentTime: "09:00 AM",
      status: "completed",
    },
  ]);

  const [activePatient, setActivePatient] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleStartConsultation = (patient: Patient) => {
    setActivePatient(patient.id);
    setTimeout(() => {
      navigate("/doctor/video-consultation", { state: { patient } });
    }, 500);
  };

  const statusConfig: Record<
    string,
    { color: string; bg: string; border: string; label: string; icon: string }
  > = {
    waiting:     { color: "#92400E", bg: "#FEF3C7", border: "#FDE68A", label: "Waiting",     icon: "⏳" },
    "in-progress":{ color: "#1E40AF", bg: "#DBEAFE", border: "#BFDBFE", label: "In Progress", icon: "🔄" },
    completed:   { color: "#065F46", bg: "#D1FAE5", border: "#A7F3D0", label: "Completed",    icon: "✓"  },
  };

  const stats = [
    { label: "Today's Patients",  value: patients.length,                                          icon: "👥" },
    { label: "Waiting",           value: patients.filter((p) => p.status === "waiting").length,    icon: "⏳" },
    { label: "In Progress",       value: patients.filter((p) => p.status === "in-progress").length,icon: "🔄" },
    { label: "Completed",         value: patients.filter((p) => p.status === "completed").length,  icon: "✅" },
  ];

  const filteredPatients =
    filterStatus === "all"
      ? patients
      : patients.filter((p) => p.status === filterStatus);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.topAccent} />

      <div style={styles.container}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={styles.header}>
          <div>
            <div style={styles.brandRow}>
              <div style={styles.brandDot} />
              <span style={styles.brandLabel}>BharathCare</span>
            </div>
            <h2 style={styles.title}>Doctor Dashboard</h2>
            <p style={styles.subtitle}>{dateStr} &nbsp;·&nbsp; {timeStr}</p>
          </div>

          <div style={styles.doctorCard}>
            <div style={styles.doctorAvatar}>
              <span style={styles.doctorAvatarText}>AK</span>
            </div>
            <div>
              <p style={styles.doctorName}>Dr. Anil Kumar</p>
              <p style={styles.doctorSpec}>General Physician</p>
              <div style={styles.onlineBadge}>
                <span style={styles.onlineDot} />
                <span style={styles.onlineText}>Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Strip ────────────────────────────────────────────────── */}
        <div style={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} style={styles.statCard}>
              <span style={styles.statIcon}>{s.icon}</span>
              <div>
                <p style={styles.statValue}>{s.value}</p>
                <p style={styles.statLabel}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Patient Queue ──────────────────────────────────────────────── */}
        <div style={styles.section}>
          {/* Section header + filter chips */}
          <div style={styles.sectionTopRow}>
            <div style={styles.sectionTitleRow}>
              <div style={styles.sectionAccentBar} />
              <h3 style={styles.sectionTitle}>Patient Queue</h3>
              <span style={styles.queueCount}>{filteredPatients.length} patients</span>
            </div>

            <div style={styles.filterChips}>
              {["all", "waiting", "in-progress", "completed"].map((f) => (
                <button
                  key={f}
                  style={{
                    ...styles.filterChip,
                    ...(filterStatus === f ? styles.filterChipActive : {}),
                  }}
                  onClick={() => setFilterStatus(f)}
                >
                  {f === "all" ? "All" : f === "in-progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Cards */}
          <div style={styles.patientList}>
            {filteredPatients.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIconRing}><span style={{ fontSize: "32px" }}>👥</span></div>
                <p style={styles.emptyTitle}>No patients in this category</p>
                <p style={styles.emptySubtext}>Switch filters to view other patients</p>
              </div>
            ) : (
              filteredPatients.map((patient) => {
                const cfg = statusConfig[patient.status || ""] || statusConfig.waiting;
                const isActive    = activePatient === patient.id;
                const isCompleted = patient.status === "completed";
                const isHovered   = hoveredCard === patient.id;

                return (
                  <div
                    key={patient.id}
                    style={{
                      ...styles.patientCard,
                      ...(isHovered && !isCompleted ? styles.patientCardHovered : {}),
                    }}
                    onMouseEnter={() => setHoveredCard(patient.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Left accent by status */}
                    <div
                      style={{
                        ...styles.cardAccentBar,
                        backgroundColor: cfg.color,
                      }}
                    />

                    {/* Avatar */}
                    <div
                      style={{
                        ...styles.patientAvatar,
                        background:
                          patient.gender === "Female"
                            ? "linear-gradient(135deg, #EC4899 0%, #F9A8D4 100%)"
                            : "linear-gradient(135deg, #1C2F5E 0%, #49B6C6 100%)",
                      }}
                    >
                      <span style={styles.patientAvatarText}>
                        {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>

                    {/* Patient Info */}
                    <div style={styles.patientInfo}>
                      <div style={styles.patientTopRow}>
                        <h4 style={styles.patientName}>{patient.name}</h4>
                        <div
                          style={{
                            ...styles.statusBadge,
                            color: cfg.color,
                            backgroundColor: cfg.bg,
                            border: `1px solid ${cfg.border}`,
                          }}
                        >
                          <span>{cfg.icon}</span>
                          <span>{cfg.label}</span>
                        </div>
                      </div>

                      <div style={styles.issuePill}>
                        <span style={styles.issueIcon}>🩺</span>
                        <span style={styles.issueText}>{patient.issue}</span>
                      </div>

                      <div style={styles.metaRow}>
                        {patient.age && (
                          <span style={styles.metaChip}>
                            <span style={styles.metaChipIcon}>👤</span>
                            {patient.age} yrs
                          </span>
                        )}
                        {patient.gender && (
                          <span style={styles.metaChip}>
                            <span style={styles.metaChipIcon}>
                              {patient.gender === "Female" ? "♀" : "♂"}
                            </span>
                            {patient.gender}
                          </span>
                        )}
                        {patient.appointmentTime && (
                          <span style={styles.metaChip}>
                            <span style={styles.metaChipIcon}>🕐</span>
                            {patient.appointmentTime}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <div style={styles.patientActions}>
                      {isCompleted ? (
                        <div style={styles.completedTag}>
                          <span>✓</span>
                          <span>Done</span>
                        </div>
                      ) : (
                        <button
                          style={{
                            ...styles.consultBtn,
                            ...(isActive
                              ? styles.consultBtnConnecting
                              : hoveredBtn === patient.id
                              ? styles.consultBtnHovered
                              : {}),
                          }}
                          onClick={() => handleStartConsultation(patient)}
                          disabled={isActive}
                          onMouseEnter={() => setHoveredBtn(patient.id)}
                          onMouseLeave={() => setHoveredBtn(null)}
                        >
                          {isActive ? (
                            <>
                              <span style={styles.spinnerDot} />
                              Connecting...
                            </>
                          ) : (
                            <>
                              <span>▶</span>
                              Start Consult
                            </>
                          )}
                        </button>
                      )}
                      <button style={styles.viewBtn}>View Profile</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── Quick Actions ──────────────────────────────────────────────── */}
        <div style={styles.section}>
          <div style={styles.sectionTitleRow}>
            <div style={styles.sectionAccentBar} />
            <h3 style={styles.sectionTitle}>Quick Actions</h3>
          </div>
          <div style={styles.quickActionsGrid}>
            {[
              { icon: "📋", title: "Prescriptions",  sub: "Write & manage prescriptions",   route: "/doctor/prescriptions" },
              { icon: "📅", title: "Schedule",       sub: "View today's full schedule",      route: "/doctor/schedule"      },
              { icon: "📊", title: "Patient Records", sub: "Access medical histories",       route: "/doctor/records"       },
              { icon: "💬", title: "Messages",       sub: "Patient queries & follow-ups",    route: "/doctor/messages"      },
            ].map((action, i) => (
              <div
                key={i}
                style={styles.quickCard}
                onClick={() => navigate(action.route)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#49B6C6";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(28,47,94,0.12)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#E8EEF6";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 6px rgba(28,47,94,0.06)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div style={styles.quickCardIcon}>{action.icon}</div>
                <div style={styles.quickCardContent}>
                  <p style={styles.quickCardTitle}>{action.title}</p>
                  <p style={styles.quickCardSub}>{action.sub}</p>
                </div>
                <span style={styles.quickCardArrow}>→</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <div style={styles.footer}>
          <span>© 2024 BharathCare — Trusted Healthcare Platform</span>
          <span style={styles.footerDiv}>|</span>
          <span>Doctor Portal v2.0</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  // ─── Page ──────────────────────────────────────────────────────────────────
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
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 20px 48px",
    animation: "fadeSlideUp 0.45s ease both",
  },

  // ─── Header ────────────────────────────────────────────────────────────────
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
    flexWrap: "wrap" as const,
    gap: "20px",
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "8px",
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
    margin: "0 0 4px",
    fontSize: "30px",
    fontWeight: "800",
    color: "#1C2F5E",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
    fontWeight: "500",
  },
  doctorCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #E8EEF6",
    borderRadius: "14px",
    padding: "14px 22px",
    boxShadow: "0 2px 12px rgba(28,47,94,0.07)",
  },
  doctorAvatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1C2F5E 0%, #49B6C6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  doctorAvatarText: {
    color: "#FFFFFF",
    fontSize: "18px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },
  doctorName: {
    margin: "0 0 2px",
    fontSize: "15px",
    fontWeight: "800",
    color: "#1C2F5E",
  },
  doctorSpec: {
    margin: "0 0 6px",
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
  },
  onlineBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "#D1FAE5",
    border: "1px solid #A7F3D0",
    borderRadius: "20px",
    padding: "3px 10px",
  },
  onlineDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#10B981",
    animation: "pulse 2s infinite",
  },
  onlineText: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#065F46",
  },

  // ─── Stats ─────────────────────────────────────────────────────────────────
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    marginBottom: "36px",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #E8EEF6",
    borderRadius: "12px",
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    boxShadow: "0 1px 6px rgba(28,47,94,0.06)",
  },
  statIcon: { fontSize: "28px", flexShrink: 0 },
  statValue: {
    margin: "0 0 2px",
    fontSize: "26px",
    fontWeight: "800",
    color: "#1C2F5E",
    lineHeight: 1,
  },
  statLabel: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
  },

  // ─── Section ───────────────────────────────────────────────────────────────
  section: { marginBottom: "40px" },
  sectionTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    flexWrap: "wrap" as const,
    gap: "12px",
  },
  sectionTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "18px",
  },
  sectionAccentBar: {
    width: "4px",
    height: "22px",
    borderRadius: "4px",
    background: "linear-gradient(180deg, #49B6C6 0%, #1C2F5E 100%)",
    flexShrink: 0,
  },
  sectionTitle: {
    margin: 0,
    fontSize: "19px",
    fontWeight: "800",
    color: "#1C2F5E",
    letterSpacing: "-0.2px",
  },
  queueCount: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#1C2F5E",
    backgroundColor: "#EBF9FB",
    border: "1px solid #B8EBF0",
    borderRadius: "20px",
    padding: "5px 14px",
  },

  // ─── Filter Chips ──────────────────────────────────────────────────────────
  filterChips: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
  },
  filterChip: {
    padding: "7px 16px",
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #E8EEF6",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#6B7280",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.18s",
  },
  filterChipActive: {
    backgroundColor: "#1C2F5E",
    borderColor: "#1C2F5E",
    color: "#FFFFFF",
  },

  // ─── Patient List ──────────────────────────────────────────────────────────
  patientList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  patientCard: {
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #E8EEF6",
    borderRadius: "16px",
    padding: "20px 20px 20px 0",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    boxShadow: "0 1px 6px rgba(28,47,94,0.06)",
    overflow: "hidden",
    transition: "all 0.2s",
    position: "relative" as const,
  },
  patientCardHovered: {
    boxShadow: "0 6px 24px rgba(28,47,94,0.11)",
    borderColor: "#C7E9EE",
    transform: "translateY(-1px)",
  },
  cardAccentBar: {
    width: "5px",
    alignSelf: "stretch",
    borderRadius: "0 4px 4px 0",
    flexShrink: 0,
    minHeight: "100%",
  },
  patientAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  patientAvatarText: {
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },
  patientInfo: { flex: 1, minWidth: 0 },
  patientTopRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "6px",
    flexWrap: "wrap" as const,
  },
  patientName: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "800",
    color: "#1C2F5E",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    borderRadius: "20px",
    padding: "3px 10px",
    fontSize: "12px",
    fontWeight: "700",
  },
  issuePill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#F4F7FB",
    border: "1px solid #E8EEF6",
    borderRadius: "6px",
    padding: "4px 10px",
    marginBottom: "8px",
  },
  issueIcon: { fontSize: "13px" },
  issueText: {
    fontSize: "13px",
    color: "#1F2937",
    fontWeight: "600",
  },
  metaRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
  },
  metaChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: "500",
    backgroundColor: "#F4F7FB",
    padding: "3px 9px",
    borderRadius: "20px",
    border: "1px solid #E8EEF6",
  },
  metaChipIcon: { fontSize: "11px" },

  // ─── Patient Actions ───────────────────────────────────────────────────────
  patientActions: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    alignItems: "flex-end",
    flexShrink: 0,
    paddingRight: "4px",
  },
  consultBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "10px 20px",
    background: "linear-gradient(135deg, #1C2F5E 0%, #2A4A7A 100%)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
    boxShadow: "0 3px 10px rgba(28,47,94,0.20)",
    whiteSpace: "nowrap" as const,
  },
  consultBtnHovered: {
    background: "linear-gradient(135deg, #49B6C6 0%, #3DA8B5 100%)",
    boxShadow: "0 5px 16px rgba(73,182,198,0.28)",
    transform: "translateY(-1px)",
  },
  consultBtnConnecting: {
    background: "linear-gradient(135deg, #6B7280 0%, #9CA3AF 100%)",
    cursor: "not-allowed",
    boxShadow: "none",
    transform: "none",
  },
  spinnerDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#FFFFFF",
    animation: "pulse 1s infinite",
    display: "inline-block",
  },
  viewBtn: {
    padding: "8px 18px",
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #E8EEF6",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#1C2F5E",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "border-color 0.18s",
    whiteSpace: "nowrap" as const,
  },
  completedTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 18px",
    backgroundColor: "#D1FAE5",
    border: "1px solid #A7F3D0",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#065F46",
  },

  // ─── Empty State ───────────────────────────────────────────────────────────
  emptyState: {
    textAlign: "center" as const,
    padding: "60px 20px",
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    border: "1.5px solid #E8EEF6",
  },
  emptyIconRing: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#F4F7FB",
    border: "2px solid #E8EEF6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  },
  emptyTitle: {
    margin: "0 0 6px",
    fontSize: "17px",
    fontWeight: "800",
    color: "#1C2F5E",
  },
  emptySubtext: {
    margin: 0,
    fontSize: "13px",
    color: "#6B7280",
  },

  // ─── Quick Actions ─────────────────────────────────────────────────────────
  quickActionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
  },
  quickCard: {
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #E8EEF6",
    borderRadius: "14px",
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    cursor: "pointer",
    transition: "all 0.22s",
    boxShadow: "0 1px 6px rgba(28,47,94,0.06)",
  },
  quickCardIcon: {
    fontSize: "26px",
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    backgroundColor: "#EBF9FB",
    border: "1px solid #B8EBF0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  quickCardContent: { flex: 1 },
  quickCardTitle: {
    margin: "0 0 3px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#1C2F5E",
  },
  quickCardSub: {
    margin: 0,
    fontSize: "12px",
    color: "#6B7280",
    lineHeight: "1.4",
  },
  quickCardArrow: {
    fontSize: "18px",
    color: "#CBD5E1",
    fontWeight: "700",
    flexShrink: 0,
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
    paddingTop: "12px",
  },
  footerDiv: { color: "#D1D5DB" },
};

export default DoctorDashboard;