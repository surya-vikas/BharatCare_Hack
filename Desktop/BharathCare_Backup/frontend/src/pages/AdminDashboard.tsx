import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  const fetchDoctors = async () => {
    const token = localStorage.getItem("token");
  
    const res = await fetch("http://localhost:5000/api/doctors/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      console.error("Not authorized");
      return;
    }
  
    const data = await res.json();
  
    if (Array.isArray(data)) {
      setDoctors(data);
    } else {
      setDoctors([]);
    }
  };

  const approveDoctor = async (id: string) => {
    await fetch(`http://localhost:5000/api/doctors/${id}/approve`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchDoctors();
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Dashboard — Doctor Verification</h2>

      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <span>Name</span>
          <span>Email</span>
          <span>Specialization</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {doctors.map((doc) => (
          <div key={doc._id} style={styles.row}>
            <span>{doc.userId?.name}</span>
            <span>{doc.userId?.email}</span>
            <span>{doc.specialization}</span>

            <span>
              {doc.isApproved ? (
                <span style={{ color: "green", fontWeight: 600 }}>
                  Approved
                </span>
              ) : (
                <span style={{ color: "orange", fontWeight: 600 }}>
                  Pending
                </span>
              )}
            </span>

            <span>
              {!doc.isApproved && (
                <button
                  style={styles.approveBtn}
                  onClick={() => approveDoctor(doc._id)}
                >
                  Approve
                </button>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: any = {
  container: {
    padding: "40px",
    fontFamily: "Segoe UI",
    backgroundColor: "#F4F7FB",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "30px",
    color: "#1C2F5E",
  },
  table: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    fontWeight: 700,
    paddingBottom: "12px",
    borderBottom: "1px solid #eee",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    padding: "14px 0",
    borderBottom: "1px solid #f2f2f2",
  },
  approveBtn: {
    backgroundColor: "#49B6C6",
    border: "none",
    padding: "6px 12px",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AdminDashboard;