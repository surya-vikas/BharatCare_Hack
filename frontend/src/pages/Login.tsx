import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

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

const features = [
  "Book appointments with verified doctors",
  "Manage prescriptions digitally",
  "Secure health record storage",
  "24/7 pharmacy coordination",
];

export default function Login() {
  const navigate = useNavigate();
  const [forgotMessage, setForgotMessage] = useState("");

  const [selectedRole, setSelectedRole] =
    useState<"patient" | "doctor" | "pharmacy">("patient");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [emailFocused, setEmailFocused]       = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login(email, password);
      console.log("LOGIN RESPONSE:", response);

      if (!response?.token) {
        throw new Error("Token not received");
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("name", response.name);

      if (response.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
        .bc-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(73,182,198,0.40) !important;
          filter: brightness(1.06);
        }
        .bc-submit:active { transform: translateY(0); }

        .bc-link-teal { transition: color 0.15s ease; }
        .bc-link-teal:hover { color: #1C2F5E !important; }

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

        {/* ══════════ LEFT PANEL ══════════ */}
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
            /*
              Layer 1: semi-transparent navy gradient  (ensures text contrast)
              Layer 2: your brand background image
            */
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
            { w:380, h:380, top:-110, right:-110, op:0.09 },
            { w:230, h:230, bottom:20, left:-80, op:0.07 },
            { w:120, h:120, bottom:190, right:50, op:0.11 },
          ].map((c, i) => (
            <div key={i} style={{
              position:"absolute",
              width:c.w, height:c.h,
              borderRadius:"50%",
              background:`rgba(73,182,198,${c.op})`,
              top: c.top, right: c.right,
              bottom: c.bottom, left: c.left,
              pointerEvents:"none",
            }} />
          ))}

          {/* ── LOGO on left panel ──
              No CSS filter — rendered directly on the dark navy background.
              If your logo is dark/invisible here, add:
                filter: "brightness(0) invert(1)"
              to make it render white.
          */}
          <div style={{ marginBottom: 44, position:"relative", zIndex:1 }}>
            <img
              src="/Bharath Care Logo.png"
              alt="BharathCare"
              style={{
                height: 58,
                width: "auto",
                maxWidth: 230,
                objectFit: "contain",
                display: "block",
                // Uncomment below if logo is dark-on-transparent and hard to see:
                // filter: "brightness(0) invert(1)",
              }}
            />
          </div>

          {/* Headline */}
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
            Your Health,<br />
            <span style={{ color: "#49B6C6" }}>Our Priority</span>
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
            A unified platform connecting patients, doctors, and
            pharmacies for seamless, modern healthcare.
          </p>

          {/* Feature checklist */}
          <ul style={{
            listStyle:"none",
            display:"flex",
            flexDirection:"column",
            gap:13,
            position:"relative",
            zIndex:1,
          }}>
            {features.map((f) => (
              <li key={f} style={{
                display:"flex", alignItems:"center", gap:11,
                color:"rgba(255,255,255,0.78)",
                fontSize:14, fontWeight:400,
              }}>
                <span style={{
                  width:22, height:22, borderRadius:"50%",
                  background:"rgba(73,182,198,0.18)",
                  border:"1px solid rgba(73,182,198,0.35)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  flexShrink:0,
                }}>
                  <CheckIcon />
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* Copyright */}
          <p style={{
            position:"absolute", bottom:26, left:56,
            fontSize:11, color:"rgba(255,255,255,0.27)",
            letterSpacing:"0.3px", zIndex:1,
          }}>
            © 2025 BharathCare · All rights reserved
          </p>
        </div>

        {/* ══════════ RIGHT — FORM SIDE ══════════ */}
        <div
          className="bc-formsid"
          style={{
            flex:1,
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            padding:"48px 32px",
            background:"#F4F7FB",
          }}
        >
          {/* Card */}
          <div
            className="bc-card"
            style={{
              width:"100%",
              maxWidth:468,
              background:"#FFFFFF",
              borderRadius:22,
              boxShadow:"0 2px 8px rgba(28,47,94,0.06), 0 8px 32px rgba(28,47,94,0.09)",
              padding:"44px 44px 38px",
            }}
          >
            {/* ── Logo inside card (acts as brand mark on form side) ── */}
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
              fontSize:24, fontWeight:700,
              color:"#1F2937", letterSpacing:"-0.4px", marginBottom:5,
            }}>
              Welcome back
            </h2>
            <p style={{
              fontSize:14, color:"#6B7280",
              marginBottom:28, lineHeight:1.5,
            }}>
              Sign in to your BharathCare account
            </p>

            {/* ── Role Selector ── */}
            <div style={{
              display:"flex",
              background:"#F4F7FB",
              borderRadius:13,
              padding:"4px",
              marginBottom:24,
              gap:4,
              border:"1px solid #E8EEF6",
            }}>
              {(["patient","doctor","pharmacy"] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`role-tab ${selectedRole === role ? "role-tab--active" : ""}`}
                  style={{
                    flex:1,
                    padding:"9px 6px",
                    border:"none",
                    borderRadius:10,
                    fontSize:13,
                    fontWeight: selectedRole === role ? 600 : 500,
                    cursor:"pointer",
                    transition:"all 0.17s ease",
                    background: selectedRole === role ? "#FFFFFF" : "transparent",
                    color: selectedRole === role ? "#1C2F5E" : "#6B7280",
                    boxShadow: selectedRole === role
                      ? "0 1px 6px rgba(28,47,94,0.10), 0 0 0 1px rgba(28,47,94,0.07)"
                      : "none",
                    fontFamily:"inherit",
                  }}
                  onClick={() => {
                    setSelectedRole(role);
                    setError("");
                    setEmail("");
                    setPassword("");
                  }}
                >
                  <span style={{ marginRight:5 }}>{roleConfig[role].icon}</span>
                  {roleConfig[role].label}
                </button>
              ))}
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleLogin}>

              {/* Email */}
              <div style={{ marginBottom:16 }}>
                <label style={{
                  display:"block", fontSize:13, fontWeight:600,
                  color:"#1F2937", marginBottom:7,
                }}>
                  Email Address
                </label>
                <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
                  <span style={{
                    position:"absolute", left:14, pointerEvents:"none",
                    display:"flex", alignItems:"center",
                    color: emailFocused ? "#49B6C6" : "#A0AAB8",
                    transition:"color 0.15s",
                  }}>
                    <MailIcon />
                  </span>
                  <input
                    type="email"
                    className="bc-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    required
                    style={{
                      width:"100%",
                      padding:"11px 14px 11px 42px",
                      border:"1.5px solid #E2E8F2",
                      borderRadius:10,
                      fontSize:14,
                      color:"#1F2937",
                      background:"#FAFBFD",
                      fontFamily:"inherit",
                      transition:"border-color 0.15s, box-shadow 0.15s",
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom:4 }}>
                <label style={{
                  display:"block", fontSize:13, fontWeight:600,
                  color:"#1F2937", marginBottom:7,
                }}>
                  Password
                </label>
                <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
                  <span style={{
                    position:"absolute", left:14, pointerEvents:"none",
                    display:"flex", alignItems:"center",
                    color: passwordFocused ? "#49B6C6" : "#A0AAB8",
                    transition:"color 0.15s",
                  }}>
                    <LockIcon />
                  </span>
                  <input
                    type="password"
                    className="bc-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    required
                    style={{
                      width:"100%",
                      padding:"11px 14px 11px 42px",
                      border:"1.5px solid #E2E8F2",
                      borderRadius:10,
                      fontSize:14,
                      color:"#1F2937",
                      background:"#FAFBFD",
                      fontFamily:"inherit",
                      transition:"border-color 0.15s, box-shadow 0.15s",
                    }}
                  />
                </div>
              </div>

              {/* Forgot password */}
              <div style={{
                display:"flex", justifyContent:"flex-end",
                marginBottom:18, marginTop:8,
              }}>
              <span
  className="bc-link-teal"
  style={{
    fontSize:13,
    color:"#49B6C6",
    cursor:"pointer",
    fontWeight:500,
  }}
  onClick={() =>
    setForgotMessage(
      "Please contact support@bharathcare.com for password assistance."
    )
  }
>
  Forgot password?
</span>

{forgotMessage && (
  <div style={{
    marginTop:8,
    fontSize:12,
    color:"#1C2F5E",
    textAlign:"right"
  }}>
    {forgotMessage}
  </div>
)}
              </div>

              {/* Error */}
              {error && (
                <div style={{
                  display:"flex", alignItems:"center", gap:8,
                  padding:"10px 14px",
                  background:"#FEF2F2",
                  border:"1px solid #FECACA",
                  borderRadius:9, marginBottom:16,
                }}>
                  <AlertIcon />
                  <span style={{ fontSize:13, color:"#DC2626", fontWeight:500 }}>
                    {error}
                  </span>
                </div>
              )}

              {/* Thin divider */}
              <div style={{ height:1, background:"#EDF2FA", marginBottom:20 }} />

              {/* Submit */}
              <button
                type="submit"
                className="bc-submit"
                style={{
                  width:"100%",
                  padding:"13px 20px",
                  background:"linear-gradient(135deg, #49B6C6 0%, #38a4b4 100%)",
                  color:"#FFFFFF",
                  border:"none",
                  borderRadius:12,
                  fontSize:15,
                  fontWeight:600,
                  cursor:"pointer",
                  letterSpacing:"0.15px",
                  boxShadow:"0 4px 14px rgba(73,182,198,0.30)",
                  fontFamily:"inherit",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  gap:8,
                  marginBottom:18,
                }}
              >
                Sign In
                <ArrowIcon />
              </button>

              {/* Sign up link */}
              <p style={{ textAlign:"center", fontSize:14, color:"#6B7280" }}>
                Don't have an account?{" "}
                <span
                  className="bc-link-teal"
                  style={{
                    color:"#49B6C6", cursor:"pointer", fontWeight:600,
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Create account
                </span>
              </p>

            </form>
          </div>

          {/* ── Footer BELOW the card, not floating outside ── */}
          <p style={{
            marginTop:18,
            fontSize:12,
            color:"#A0AAB8",
            textAlign:"center",
            letterSpacing:"0.1px",
          }}>
            Protected by BharathCare security ·{" "}
            <span style={{ color:"#49B6C6", cursor:"pointer" }}>
              Privacy Policy
            </span>
          </p>

        </div>
      </div>
    </>
  );
}