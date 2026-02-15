import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    JitsiMeetExternalAPI?: any;
  }
}

export default function DoctorDashboard() {
  const [patientAssigned, setPatientAssigned] = useState(false);
  const [seconds, setSeconds] = useState(300);
  const [callActive, setCallActive] = useState(false);

  const timerRef = useRef<number | null>(null);
  const jitsiRef = useRef<any>(null);

  const doctorName = localStorage.getItem("doctorName") || "Doctor";

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (!callActive) return;

    timerRef.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          endCall();
          return 300;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callActive]);

  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  /* ---------------- ACTIONS ---------------- */
  const assignPatient = () => setPatientAssigned(true);

  const startCall = () => {
    setCallActive(true);

    if (window.JitsiMeetExternalAPI) {
      jitsiRef.current = new window.JitsiMeetExternalAPI("meet.jit.si", {
        roomName: "BharathCare_" + Date.now(),
        parentNode: document.getElementById("jitsi-container"),
        width: "100%",
        height: 600,
      });
    }
  };

  const endCall = () => {
    setCallActive(false);
    setPatientAssigned(false);
    setSeconds(300);

    if (timerRef.current) clearInterval(timerRef.current);
    if (jitsiRef.current) {
      jitsiRef.current.dispose();
      jitsiRef.current = null;
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#F4F7FB',
      padding: '40px 20px'
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto'
      }}>
        {/* HEADER */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: 32,
          borderRadius: 12,
          marginBottom: 24,
          boxShadow: '0 2px 8px rgba(28, 47, 94, 0.08)',
          border: '1px solid rgba(28, 47, 94, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20
        }}>
          <div>
            <h1 style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#1C2F5E',
              margin: '0 0 8px 0',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Doctor Dashboard
            </h1>
            <p style={{
              fontSize: 16,
              color: '#6B7280',
              margin: 0
            }}>
              Manage your consultations and patient interactions
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            backgroundColor: '#F4F7FB',
            padding: '12px 20px',
            borderRadius: 10,
            border: '1px solid #E5E7EB'
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: '#49B6C6',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 600
            }}>
              {doctorName[0]}
            </div>
            <div>
              <div style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#1F2937',
                marginBottom: 2
              }}>
                Dr. {doctorName}
              </div>
              <div style={{
                fontSize: 14,
                color: '#6B7280'
              }}>
                Medical Practitioner
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          marginBottom: 24
        }}>
          {/* PATIENT CARD */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: 28,
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(28, 47, 94, 0.08)',
            border: '1px solid rgba(28, 47, 94, 0.06)'
          }}>
            <h2 style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#1C2F5E',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Current Patient
            </h2>

            {!patientAssigned ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: '#F4F7FB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <p style={{
                  fontSize: 15,
                  color: '#6B7280',
                  marginBottom: 20
                }}>
                  No patient assigned
                </p>
                <button
                  onClick={assignPatient}
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    backgroundColor: '#49B6C6',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#3BA4B3';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#49B6C6';
                  }}
                >
                  Assign Next Patient
                </button>
              </div>
            ) : (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: 16,
                  backgroundColor: '#F4F7FB',
                  borderRadius: 10,
                  marginBottom: 16
                }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: '#1C2F5E',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    fontWeight: 600,
                    flexShrink: 0
                  }}>
                    R
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: '#1F2937',
                      marginBottom: 4
                    }}>
                      Ramesh Kumar
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 14,
                      color: '#6B7280'
                    }}>
                      <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#F59E0B'
                      }}/>
                      Waiting for consultation
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CALL CONTROL CARD */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: 28,
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(28, 47, 94, 0.08)',
            border: '1px solid rgba(28, 47, 94, 0.06)'
          }}>
            <h2 style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#1C2F5E',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
              Video Consultation
            </h2>

            {!callActive ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: patientAssigned ? '#E8F7F9' : '#F4F7FB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={patientAssigned ? '#49B6C6' : '#6B7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"/>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                </div>
                <p style={{
                  fontSize: 15,
                  color: '#6B7280',
                  marginBottom: 20
                }}>
                  {patientAssigned ? 'Ready to start consultation' : 'Assign a patient to begin'}
                </p>
                <button
                  disabled={!patientAssigned}
                  onClick={startCall}
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    backgroundColor: patientAssigned ? '#49B6C6' : '#E5E7EB',
                    border: 'none',
                    borderRadius: 8,
                    cursor: patientAssigned ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    if (patientAssigned) {
                      e.currentTarget.style.backgroundColor = '#3BA4B3';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (patientAssigned) {
                      e.currentTarget.style.backgroundColor = '#49B6C6';
                    }
                  }}
                >
                  Start Video Call
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: '#1C2F5E',
                  marginBottom: 12,
                  fontFamily: 'monospace',
                  letterSpacing: 4
                }}>
                  {formatTime()}
                </div>
                <p style={{
                  fontSize: 14,
                  color: '#6B7280',
                  marginBottom: 24
                }}>
                  Consultation in progress
                </p>
                <button
                  onClick={endCall}
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#FFFFFF',
                    backgroundColor: '#EF4444',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#DC2626';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#EF4444';
                  }}
                >
                  End Call
                </button>
              </div>
            )}
          </div>
        </div>

        {/* VIDEO CONTAINER */}
        <div
          id="jitsi-container"
          style={{
            display: callActive ? 'block' : 'none',
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(28, 47, 94, 0.08)',
            border: '1px solid rgba(28, 47, 94, 0.06)'
          }}
        />
      </div>
    </div>
  );
}