import { useEffect, useState } from "react";

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/prescriptions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setPrescriptions(data);
    };

    fetchPrescriptions();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Prescriptions</h2>

      {prescriptions.length === 0 && <p>No prescriptions uploaded yet.</p>}

      {prescriptions.map((p) => (
        <div key={p._id} style={{ marginBottom: "15px" }}>
          <a
            href={`http://localhost:5000/${p.filePath}`}
            target="_blank"
            rel="noreferrer"
          >
            View Prescription
          </a>
        </div>
      ))}
    </div>
  );
};

export default MyPrescriptions;