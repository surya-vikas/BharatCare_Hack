import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

// ─── BharathCare Brand Tokens ────────────────────────────────────────────────
// Navy:       #1C2F5E  → panel bg, primary buttons
// Teal:       #49B6C6  → CTAs, links, active states
// Aqua:       #7EDCE2  → hover accents
// White:      #FFFFFF  → card bg
// Light Gray: #F4F7FB  → page bg, tab bg
// Dark Gray:  #1F2937  → primary text
// Muted Gray: #6B7280  → secondary text
// ─────────────────────────────────────────────────────────────────────────────

/* ── SVG Icons ── */
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
);
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="3" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);
const AlertIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <circle cx="12" cy="16" r="1" fill="#DC2626" />
  </svg>
);
const SuccessIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="9,12 11,14 15,10" />
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#49B6C6"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const roleConfig = {
  patient:  { label: "Patient",  icon: "🩺" },
  doctor:   { label: "Doctor",   icon: "👨‍⚕️" },
  pharmacy: { label: "Pharmacy", icon: "💊" },
} as const;

const panelFeatures = [
  "Instant access to verified doctors",
  "Manage health records securely",
  "Digital prescriptions & renewals",
  "Smart pharmacy coordination",
];

/* ── Reusable field component ── */
interface FieldProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  required?: boolean;
  autoComplete?: string;
}
const Field = ({
  label, type = "text", placeholder, value, onChange,
  icon, focused, onFocus, onBlur, required, autoComplete,
}: FieldProps) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{
      display: "block", fontSize: 13, fontWeight: 600,
      color: "#1F2937", marginBottom: 7,
    }}>
      {label}
    </label>
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <span style={{
        position: "absolute", left: 14, pointerEvents: "none",
        display: "flex", alignItems: "center",
        color: focused ? "#49B6C6" : "#A0AAB8",
        transition: "color 0.15s",
      }}>
        {icon}
      </span>
      <input
        type={type}
        className="bc-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        autoComplete={autoComplete}
        style={{
          width: "100%",
          padding: "11px 14px 11px 42px",
          border: "1.5px solid #E2E8F2",
          borderRadius: 10,
          fontSize: 14,
          color: "#1F2937",
          background: "#FAFBFD",
          fontFamily: "inherit",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      />
    </div>
  </div>
);

export default function Signup() {
  const navigate = useNavigate();

  const [role, setRole]         = useState<"patient" | "doctor" | "pharmacy">("patient");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [message, setMessage]   = useState("");
  const [loading, setLoading]   = useState(false);

  const [nameFocused, setNameFocused]         = useState(false);
  const [emailFocused, setEmailFocused]       = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await register(name, email, password, role);
      setMessage("Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; background: #F4F7FB; }

        .bc-input:focus {
          border-color: #49B6C6 !important;
          box-shadow: 0 0 0 3px rgba(73,182,198,0.14) !important;
          outline: none;
        }
        .bc-input::placeholder { color: #B0B9C8; }

        .role-tab:hover:not(.role-tab--active) {
          background: rgba(255,255,255,0.7) !important;
          color: #1C2F5E !important;
        }

        .bc-submit {
          transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
        }
        .bc-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(73,182,198,0.40) !important;
          filter: brightness(1.06);
        }
        .bc-submit:active:not(:disabled) { transform: translateY(0); }
        .bc-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .bc-link-teal { transition: color 0.15s ease; }
        .bc-link-teal:hover { color: #1C2F5E !important; }

        /* Spinner */
        @keyframes bc-spin {
          to { transform: rotate(360deg); }
        }
        .bc-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: bc-spin 0.65s linear infinite;
          flex-shrink: 0;
        }

        /* Success pulse */
        @keyframes bc-fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bc-success-box {
          animation: bc-fadeIn 0.25s ease forwards;
        }

        @media (max-width: 768px) {
          .bc-panel   { display: none !important; }
          .bc-formsid { padding: 20px 16px !important; }
          .bc-card    { padding: 28px 20px 24px !important; }
        }
      `}</style>

      {/* ── Page shell ── */}
      <div style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        background: "#F4F7FB",
      }}>

        {/* ══════════ LEFT PANEL (identical to Login) ══════════ */}
        <div
          className="bc-panel"
          style={{
            width: "44%",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "64px 56px",
            backgroundImage: `
              linear-gradient(
                155deg,
                rgba(18,32,72,0.92) 0%,
                rgba(22,40,88,0.88) 50%,
                rgba(16,28,64,0.94) 100%
              ),
              url('/bharathtechbgg.jpg')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Decorative glowing circles */}
          {[
            { w: 380, h: 380, top: -110, right: -110, op: 0.09 },
            { w: 230, h: 230, bottom: 20, left: -80,  op: 0.07 },
            { w: 120, h: 120, bottom: 190, right: 50, op: 0.11 },
          ].map((c, i) => (
            <div key={i} style={{
              position: "absolute",
              width: c.w, height: c.h,
              borderRadius: "50%",
              background: `rgba(73,182,198,${c.op})`,
              top: c.top, right: c.right,
              bottom: c.bottom, left: c.left,
              pointerEvents: "none",
            }} />
          ))}

          {/* Logo */}
          <div style={{ marginBottom: 44, position: "relative", zIndex: 1 }}>
            <img
              src="/Bharath Care Logo.png"
              alt="BharathCare"
              style={{
                height: 58,
                width: "auto",
                maxWidth: 230,
                objectFit: "contain",
                display: "block",
                // filter: "brightness(0) invert(1)", // uncomment if logo is dark
              }}
            />
          </div>

          {/* Headline — signup-specific copy */}
          <h1 style={{
            fontSize: 38,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.22,
            marginBottom: 14,
            letterSpacing: "-0.6px",
            position: "relative",
            zIndex: 1,
          }}>
            Join BharathCare,<br />
            <span style={{ color: "#49B6C6" }}>Start Today</span>
          </h1>

          <p style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.57)",
            lineHeight: 1.7,
            maxWidth: 290,
            marginBottom: 44,
            fontWeight: 400,
            position: "relative",
            zIndex: 1,
          }}>
            Create your account in seconds and connect with a smarter
            healthcare experience.
          </p>

          {/* Feature checklist */}
          <ul style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 13,
            position: "relative",
            zIndex: 1,
          }}>
            {panelFeatures.map((f) => (
              <li key={f} style={{
                display: "flex", alignItems: "center", gap: 11,
                color: "rgba(255,255,255,0.78)",
                fontSize: 14, fontWeight: 400,
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: "rgba(73,182,198,0.18)",
                  border: "1px solid rgba(73,182,198,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <CheckIcon />
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* Copyright */}
          <p style={{
            position: "absolute", bottom: 26, left: 56,
            fontSize: 11, color: "rgba(255,255,255,0.27)",
            letterSpacing: "0.3px", zIndex: 1,
          }}>
            © 2025 BharathCare · All rights reserved
          </p>
        </div>

        {/* ══════════ RIGHT — FORM SIDE ══════════ */}
        <div
          className="bc-formsid"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 32px",
            background: "#F4F7FB",
          }}
        >
          <div
            className="bc-card"
            style={{
              width: "100%",
              maxWidth: 468,
              background: "#FFFFFF",
              borderRadius: 22,
              boxShadow: "0 2px 8px rgba(28,47,94,0.06), 0 8px 32px rgba(28,47,94,0.09)",
              padding: "44px 44px 38px",
            }}
          >
            {/* Logo inside card */}
            <div style={{ marginBottom: 20 }}>
              <img
                src="/Bharath Care Logo.png"
                alt="BharathCare"
                style={{
                  height: 38,
                  width: "auto",
                  maxWidth: 180,
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>

            {/* Heading */}
            <h2 style={{
              fontSize: 24, fontWeight: 700,
              color: "#1F2937", letterSpacing: "-0.4px", marginBottom: 5,
            }}>
              Create your account
            </h2>
            <p style={{
              fontSize: 14, color: "#6B7280",
              marginBottom: 26, lineHeight: 1.5,
            }}>
              Join thousands using BharathCare today
            </p>

            {/* ── Role Selector (tabs, same as Login) ── */}
            <div style={{
              display: "flex",
              background: "#F4F7FB",
              borderRadius: 13,
              padding: "4px",
              marginBottom: 22,
              gap: 4,
              border: "1px solid #E8EEF6",
            }}>
              {(["patient", "doctor", "pharmacy"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`role-tab ${role === r ? "role-tab--active" : ""}`}
                  style={{
                    flex: 1,
                    padding: "9px 6px",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: role === r ? 600 : 500,
                    cursor: "pointer",
                    transition: "all 0.17s ease",
                    background: role === r ? "#FFFFFF" : "transparent",
                    color: role === r ? "#1C2F5E" : "#6B7280",
                    boxShadow: role === r
                      ? "0 1px 6px rgba(28,47,94,0.10), 0 0 0 1px rgba(28,47,94,0.07)"
                      : "none",
                    fontFamily: "inherit",
                  }}
                  onClick={() => {
                    setRole(r);
                    setError("");
                    setMessage("");
                  }}
                >
                  <span style={{ marginRight: 5 }}>{roleConfig[r].icon}</span>
                  {roleConfig[r].label}
                </button>
              ))}
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSignup}>

              {/* Full Name */}
              <Field
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChange={setName}
                icon={<UserIcon />}
                focused={nameFocused}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                required
                autoComplete="name"
              />

              {/* Email */}
              <Field
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={setEmail}
                icon={<MailIcon />}
                focused={emailFocused}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                required
                autoComplete="email"
              />

              {/* Password */}
              <Field
                label="Password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={setPassword}
                icon={<LockIcon />}
                focused={passwordFocused}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                required
                autoComplete="new-password"
              />

              {/* Error box */}
              {error && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 14px",
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: 9, marginBottom: 14, marginTop: 2,
                }}>
                  <AlertIcon />
                  <span style={{ fontSize: 13, color: "#DC2626", fontWeight: 500 }}>
                    {error}
                  </span>
                </div>
              )}

              {/* Success box */}
              {message && (
                <div
                  className="bc-success-box"
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 14px",
                    background: "#ECFDF5",
                    border: "1px solid #6EE7B7",
                    borderRadius: 9, marginBottom: 14, marginTop: 2,
                  }}
                >
                  <SuccessIcon />
                  <span style={{ fontSize: 13, color: "#059669", fontWeight: 500 }}>
                    {message}
                  </span>
                </div>
              )}

              {/* Thin divider */}
              <div style={{ height: 1, background: "#EDF2FA", marginBottom: 18, marginTop: 4 }} />

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="bc-submit"
                style={{
                  width: "100%",
                  padding: "13px 20px",
                  background: "linear-gradient(135deg, #49B6C6 0%, #38a4b4 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "0.15px",
                  boxShadow: "0 4px 14px rgba(73,182,198,0.30)",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: 18,
                }}
              >
                {loading ? (
                  <>
                    <span className="bc-spinner" />
                    Creating account…
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowIcon />
                  </>
                )}
              </button>

              {/* Login link */}
              <p style={{ textAlign: "center", fontSize: 14, color: "#6B7280" }}>
                Already have an account?{" "}
                <span
                  className="bc-link-teal"
                  style={{ color: "#49B6C6", cursor: "pointer", fontWeight: 600 }}
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </span>
              </p>

            </form>
          </div>

          {/* Footer */}
          <p style={{
            marginTop: 18,
            fontSize: 12,
            color: "#A0AAB8",
            textAlign: "center",
            letterSpacing: "0.1px",
          }}>
            By signing up, you agree to our{" "}
            <span style={{ color: "#49B6C6", cursor: "pointer" }}>Terms of Service</span>
            {" "}·{" "}
            <span style={{ color: "#49B6C6", cursor: "pointer" }}>Privacy Policy</span>
          </p>

        </div>
      </div>
    </>
  );
}