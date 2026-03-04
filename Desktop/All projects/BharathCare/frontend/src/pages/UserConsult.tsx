import { doctors } from "../data/doctors";
import { useNavigate } from "react-router-dom";

const UserConsult = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ 
      padding: '40px 20px',
      backgroundColor: '#F4F7FB',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: 32,
          fontWeight: 700,
          color: '#1C2F5E',
          marginBottom: 8,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          Available Doctors
        </h2>
        <p style={{
          fontSize: 16,
          color: '#6B7280',
          marginBottom: 32
        }}>
          Connect with our healthcare professionals for online consultation
        </p>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20
        }}>
          {doctors.map((doc) => (
            <div
              key={doc.id}
              style={{
                padding: 24,
                background: '#FFFFFF',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(28, 47, 94, 0.08)',
                border: '1px solid rgba(28, 47, 94, 0.06)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(73, 182, 198, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(28, 47, 94, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Status Indicator */}
              <div style={{
                position: 'absolute',
                top: 16,
                right: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: doc.available ? '#10B981' : '#EF4444'
                }}></div>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: doc.available ? '#10B981' : '#EF4444',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {doc.available ? 'Available' : 'Busy'}
                </span>
              </div>

              <div style={{ marginBottom: 20 }}>
                <h4 style={{ 
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#1F2937',
                  marginBottom: 8,
                  paddingRight: 80
                }}>
                  {doc.name}
                </h4>
                <p style={{ 
                  fontSize: 15,
                  color: '#6B7280',
                  margin: 0
                }}>
                  {doc.specialization}
                </p>
              </div>

              <button
                disabled={!doc.available}
                onClick={() => {
                  localStorage.setItem("activeRoom", "bharathcare-room-1");
                  navigate("/user/video-consult");
                }}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: doc.available ? '#FFFFFF' : '#6B7280',
                  backgroundColor: doc.available ? '#49B6C6' : '#E5E7EB',
                  border: 'none',
                  borderRadius: 8,
                  cursor: doc.available ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
                onMouseEnter={(e) => {
                  if (doc.available) {
                    e.currentTarget.style.backgroundColor = '#3BA4B3';
                  }
                }}
                onMouseLeave={(e) => {
                  if (doc.available) {
                    e.currentTarget.style.backgroundColor = '#49B6C6';
                  }
                }}
              >
                {doc.available ? 'Start Consultation' : 'Currently Unavailable'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserConsult;