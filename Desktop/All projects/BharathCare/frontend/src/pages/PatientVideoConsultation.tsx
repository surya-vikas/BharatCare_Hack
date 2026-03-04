import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    JitsiMeetExternalAPI?: any;
  }
}

export default function PatientDashboard() {
  const [connected, setConnected] = useState(false);
  const [roomAvailable, setRoomAvailable] = useState(false);

  const jitsiRef = useRef<any>(null);
  const jitsiContainerRef = useRef<HTMLDivElement | null>(null);

  const patientName = localStorage.getItem("patientName") || "Patient";

  /* -------- CHECK ROOM -------- */
  useEffect(() => {
    const room = localStorage.getItem("activeRoom");
    if (room) setRoomAvailable(true);
  }, []);

  /* -------- LOAD JITSI SCRIPT -------- */
  useEffect(() => {
    if (window.JitsiMeetExternalAPI) return;

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* -------- INIT JITSI AFTER RENDER -------- */
  useEffect(() => {
    if (!connected) return;
    if (!window.JitsiMeetExternalAPI) return;
    if (!jitsiContainerRef.current) return;

    const roomName = localStorage.getItem("activeRoom");
    if (!roomName) return;

    jitsiRef.current = new window.JitsiMeetExternalAPI("meet.jit.si", {
      roomName,
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName: patientName,
      },
      width: "100%",
      height: 600,
    });

    return () => {
      jitsiRef.current?.dispose();
      jitsiRef.current = null;
    };
  }, [connected]);

  /* -------- JOIN CALL -------- */
  const joinCall = () => {
    if (!roomAvailable) {
      alert("Waiting for doctor to start consultation");
      return;
    }
    setConnected(true);
  };

  /* -------- LEAVE CALL -------- */
  const leaveCall = () => {
    setConnected(false);
  };

  return (
    <div className="container">
      <style>{css}</style>

      {/* HEADER */}
      <div className="header">
        <h1>🧑‍⚕️ BharathCare Patient Dashboard</h1>
        <div className="patient-info">
          <div className="avatar">{patientName[0]}</div>
          <div>
            <div className="name">{patientName}</div>
            <div className="role">Patient</div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="main">
        <div className="card">
          <h2>🎥 Video Consultation</h2>

          {!connected && (
            <>
              <button
                className="btn btn-success"
                disabled={!roomAvailable}
                onClick={joinCall}
              >
                🎥 Join Consultation
              </button>

              {!roomAvailable && (
                <p className="info-text">
                  ⏳ Waiting for doctor to start the consultation
                </p>
              )}
            </>
          )}

          {connected && (
            <>
              <button className="btn btn-danger" onClick={leaveCall}>
                ⛔ Leave Call
              </button>

              {/* JITSI CONTAINER */}
              <div ref={jitsiContainerRef} className="jitsi-box" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------- CSS -------- */
const css = `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #F4F7FB;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #1F2937;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(28, 47, 94, 0.05), 0 10px 20px rgba(28, 47, 94, 0.08);
  margin-top: 20px;
  margin-bottom: 20px;
}

.header {
  background: linear-gradient(135deg, #1C2F5E 0%, #2A4478 100%);
  color: #FFFFFF;
  padding: 32px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(28, 47, 94, 0.15);
}

.header h1 {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.patient-info {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #49B6C6, #7EDCE2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: #FFFFFF;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(73, 182, 198, 0.3);
}

.name {
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 2px;
}

.role {
  font-size: 13px;
  color: #7EDCE2;
  font-weight: 500;
}

.main {
  padding: 40px;
}

.card {
  background: #F4F7FB;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid rgba(28, 47, 94, 0.08);
  box-shadow: 0 1px 3px rgba(28, 47, 94, 0.05);
}

.card h2 {
  font-size: 22px;
  font-weight: 600;
  color: #1C2F5E;
  margin-bottom: 24px;
  letter-spacing: -0.3px;
}

.btn {
  padding: 14px 28px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.2px;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-success {
  background: linear-gradient(135deg, #49B6C6, #5BC4D3);
  color: #FFFFFF;
}

.btn-success:hover:not(:disabled) {
  background: linear-gradient(135deg, #3FA5B5, #49B6C6);
}

.btn-danger {
  background: #1C2F5E;
  color: #FFFFFF;
}

.btn-danger:hover:not(:disabled) {
  background: #152540;
}

.info-text {
  margin-top: 20px;
  color: #6B7280;
  font-size: 14px;
  padding: 16px;
  background: #FFFFFF;
  border-radius: 10px;
  border-left: 4px solid #7EDCE2;
  box-shadow: 0 1px 3px rgba(28, 47, 94, 0.05);
}

.jitsi-box {
  margin-top: 24px;
  width: 100%;
  height: 600px;
  background: #1F2937;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(28, 47, 94, 0.15);
  border: 2px solid #1C2F5E;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 20px;
    padding: 24px;
  }

  .header h1 {
    font-size: 22px;
    text-align: center;
  }

  .patient-info {
    width: 100%;
    justify-content: center;
  }

  .main {
    padding: 24px;
  }

  .card {
    padding: 24px;
  }

  .jitsi-box {
    height: 400px;
  }
}
`;