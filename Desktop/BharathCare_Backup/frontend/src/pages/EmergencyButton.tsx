import { useState, useEffect, useRef } from "react";

const EmergencyButton = () => {
  const [open, setOpen] = useState(false);
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | detecting | found | error
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [pulseRing, setPulseRing] = useState(false);
  const timerRef = useRef(null);
  const watchRef = useRef(null);

  const AMBULANCES = [
    { name: "CityCare Ambulance", dist: "1.2 km", eta: "4 min", phone: "108" },
    { name: "RedCross Rapid", dist: "2.1 km", eta: "7 min", phone: "108" },
  ];

  const startLocation = () => {
    setLocationStatus("detecting");
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setAddress("Geolocation not supported");
      return;
    }
    watchRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setAddress(
          `${pos.coords.latitude.toFixed(5)}° N, ${pos.coords.longitude.toFixed(5)}° E`
        );
        setLocationStatus("found");
      },
      () => {
        setLocationStatus("error");
        setAddress("Location access denied");
      },
      { enableHighAccuracy: true, maximumAge: 5000 }
    );
  };

  const stopLocation = () => {
    if (watchRef.current) navigator.geolocation.clearWatch(watchRef.current);
    watchRef.current = null;
  };

  useEffect(() => {
    if (open) {
      startLocation();
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      stopLocation();
      setLocationStatus("idle");
      setCoords(null);
      setAddress("");
      setElapsed(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      stopLocation();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [open]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const handleSOSClick = () => {
    setPulseRing(true);
    setTimeout(() => {
      setPulseRing(false);
      setOpen(true);
    }, 600);
  };

  const mapsUrl = coords
    ? `https://maps.google.com/?q=${coords.lat},${coords.lng}`
    : "#";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap');

        :root {
          --red: #ff2d2d;
          --red-dark: #c0001e;
          --bg: #0d0d0d;
          --surface: #161616;
          --surface2: #1e1e1e;
          --border: rgba(255,255,255,0.07);
          --text: #f0f0f0;
          --muted: #888;
          --green: #00e676;
          --amber: #ffb300;
        }

        .sos-btn {
          position: fixed;
          bottom: 24px;
          left: 24px;
          width: 68px;
          height: 68px;
          border-radius: 50%;
          border: none;
          background: radial-gradient(circle at 35% 35%, #ff5555, var(--red-dark));
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          cursor: pointer;
          z-index: 9999;
          box-shadow: 0 0 0 0 rgba(255,45,45,0.6), 0 6px 24px rgba(0,0,0,0.5);
          animation: sosIdle 2.5s ease-in-out infinite;
          transition: transform 0.15s;
        }
        .sos-btn:hover { transform: scale(1.08); }
        .sos-btn:active { transform: scale(0.95); }
        .sos-btn.pulse-burst {
          animation: sosBurst 0.6s ease-out forwards;
        }

        @keyframes sosIdle {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,45,45,0.5), 0 6px 24px rgba(0,0,0,0.5); }
          50%      { box-shadow: 0 0 0 14px rgba(255,45,45,0), 0 6px 24px rgba(0,0,0,0.5); }
        }
        @keyframes sosBurst {
          0%   { box-shadow: 0 0 0 0 rgba(255,45,45,0.9); }
          100% { box-shadow: 0 0 0 60px rgba(255,45,45,0); }
        }

        .overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(6px);
          display: flex; align-items: flex-end; justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }

        .panel {
          background: var(--surface);
          border-radius: 24px 24px 0 0;
          border: 1px solid var(--border);
          border-bottom: none;
          width: 100%; max-width: 440px;
          padding: 0 0 24px;
          font-family: 'DM Sans', sans-serif;
          color: var(--text);
          animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 -20px 60px rgba(255,45,45,0.08);
          overflow: hidden;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .panel-header {
          background: linear-gradient(135deg, #2a0000, #1a0005);
          padding: 20px 24px 18px;
          border-bottom: 1px solid rgba(255,45,45,0.15);
          display: flex; align-items: center; gap: 12px;
        }
        .header-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: var(--red);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          box-shadow: 0 4px 14px rgba(255,45,45,0.4);
          flex-shrink: 0;
        }
        .header-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; letter-spacing: 1.5px;
          color: #fff;
          line-height: 1;
        }
        .header-sub {
          font-size: 12px; color: var(--muted); margin-top: 2px;
        }
        .timer-badge {
          margin-left: auto;
          background: rgba(255,45,45,0.15);
          border: 1px solid rgba(255,45,45,0.3);
          padding: 4px 10px; border-radius: 20px;
          font-size: 13px; font-weight: 600;
          color: #ff6b6b;
          letter-spacing: 1px;
          font-variant-numeric: tabular-nums;
        }

        .section { padding: 0 24px; }
        .section + .section { margin-top: 2px; }

        .divider { height: 1px; background: var(--border); margin: 14px 24px; }

        /* Location card */
        .loc-card {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 14px 16px;
          margin-top: 14px;
          display: flex; gap: 12px; align-items: flex-start;
        }
        .loc-icon-wrap {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(0,230,118,0.1);
          border: 1px solid rgba(0,230,118,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 18px;
          position: relative;
        }
        .loc-dot {
          position: absolute; top: 6px; right: 6px;
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--green);
        }
        .loc-dot.pulsing { animation: dotPulse 1.2s ease-in-out infinite; }
        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,230,118,0.5); }
          50%      { box-shadow: 0 0 0 6px rgba(0,230,118,0); }
        }
        .loc-dot.amber { background: var(--amber); animation: dotPulse2 1s ease-in-out infinite; }
        @keyframes dotPulse2 {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,179,0,0.5); }
          50%      { box-shadow: 0 0 0 6px rgba(255,179,0,0); }
        }
        .loc-dot.red { background: var(--red); }

        .loc-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; }
        .loc-value { font-size: 13px; font-weight: 500; margin-top: 2px; color: var(--text); word-break: break-all; }
        .loc-status-detecting { color: var(--amber); font-size: 12px; display: flex; align-items: center; gap: 6px; }
        .loc-status-found { color: var(--green); font-size: 12px; }
        .loc-link { color: #64b5f6; font-size: 12px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; margin-top: 4px; }
        .loc-link:hover { text-decoration: underline; }

        /* Spinner */
        .spinner {
          width: 10px; height: 10px; border-radius: 50%;
          border: 2px solid rgba(255,179,0,0.3);
          border-top-color: var(--amber);
          animation: spin 0.7s linear infinite; display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Ambulance cards */
        .amb-list { margin-top: 14px; display: flex; flex-direction: column; gap: 10px; }
        .amb-card {
          background: var(--surface2); border: 1px solid var(--border);
          border-radius: 14px; padding: 12px 14px;
          display: flex; align-items: center; gap: 12px;
        }
        .amb-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(255,45,45,0.1); border: 1px solid rgba(255,45,45,0.2);
          display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;
        }
        .amb-name { font-weight: 600; font-size: 13px; }
        .amb-meta { font-size: 11px; color: var(--muted); margin-top: 2px; }
        .amb-dist { margin-left: auto; text-align: right; }
        .amb-dist-val { font-family: 'Bebas Neue', sans-serif; font-size: 18px; color: var(--red); letter-spacing: 1px; }
        .amb-eta { font-size: 11px; color: var(--muted); }

        /* Buttons */
        .btn-row { display: flex; gap: 10px; margin-top: 18px; }
        .btn-call {
          flex: 1; padding: 14px; border-radius: 14px; border: none;
          background: linear-gradient(135deg, var(--red), var(--red-dark));
          color: #fff; font-family: 'Bebas Neue', sans-serif;
          font-size: 18px; letter-spacing: 2px; cursor: pointer;
          box-shadow: 0 4px 18px rgba(255,45,45,0.35);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-call:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,45,45,0.45); }
        .btn-call:active { transform: scale(0.97); }

        .btn-cancel {
          padding: 14px 20px; border-radius: 14px; border: 1px solid var(--border);
          background: var(--surface2); color: var(--muted);
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          cursor: pointer; transition: color 0.15s, border-color 0.15s;
        }
        .btn-cancel:hover { color: var(--text); border-color: rgba(255,255,255,0.2); }

        .section-label {
          font-size: 11px; text-transform: uppercase; letter-spacing: 1px;
          color: var(--muted); margin-top: 16px; margin-bottom: 0;
        }


      `}</style>

      {/* Floating SOS Button */}
      <button
        className={`sos-btn${pulseRing ? " pulse-burst" : ""}`}
        onClick={handleSOSClick}
        aria-label="SOS Emergency"
      >
        SOS
      </button>

      {/* Emergency Panel */}
      {open && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="panel" role="dialog" aria-modal="true">

            {/* Header */}
            <div className="panel-header">
              <div className="header-icon">🚨</div>
              <div>
                <div className="header-title">Emergency Active</div>
                <div className="header-sub">Help is on the way</div>
              </div>
              <div className="timer-badge">⏱ {formatTime(elapsed)}</div>
            </div>

            {/* Location */}
            <div className="section">
              <p className="section-label">Your Live Location</p>
              <div className="loc-card">
                <div className="loc-icon-wrap">
                  📍
                  <div className={`loc-dot ${
                    locationStatus === "found" ? "pulsing" :
                    locationStatus === "detecting" ? "amber" :
                    locationStatus === "error" ? "red" : ""
                  }`} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="loc-label">GPS Coordinates</div>
                  {locationStatus === "detecting" && (
                    <div className="loc-status-detecting">
                      <span className="spinner" /> Acquiring signal...
                    </div>
                  )}
                  {locationStatus === "found" && (
                    <>
                      <div className="loc-value">{address}</div>
                      <div className="loc-status-found">● Live tracking active</div>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="loc-link"
                      >
                        🗺 Open in Maps ↗
                      </a>
                    </>
                  )}
                  {locationStatus === "error" && (
                    <div className="loc-value" style={{ color: "var(--red)" }}>{address}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* Nearby Ambulances */}
            <div className="section">
              <p className="section-label">Nearest Units</p>
              <div className="amb-list">
                {AMBULANCES.map((a, i) => (
                  <div className="amb-card" key={i}>
                    <div className="amb-icon">🚑</div>
                    <div>
                      <div className="amb-name">{a.name}</div>
                      <div className="amb-meta">Dispatch #{String(i + 1).padStart(3, "0")} · Rapid Response</div>
                    </div>
                    <div className="amb-dist">
                      <div className="amb-dist-val">{a.dist}</div>
                      <div className="amb-eta">ETA ~{a.eta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="section">
              <div className="btn-row">
                <button
                  className="btn-call"
                  onClick={() => { window.location.href = "tel:108"; }}
                >
                  📞 CALL 108
                </button>
                <button className="btn-cancel" onClick={() => setOpen(false)}>
                  Dismiss
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyButton;