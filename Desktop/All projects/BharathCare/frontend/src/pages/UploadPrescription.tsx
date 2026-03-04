import { useState, useEffect } from "react";

const UploadPrescription = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const token = localStorage.getItem("token");

  // 🔥 Fetch all prescriptions
  const fetchPrescriptions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/prescriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("Fetched prescriptions:", data); // 🔥 Debug log
      setPrescriptions(data);
    } catch (err) {
      console.error("Failed to fetch prescriptions");
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  // 🔥 Upload file
  const upload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("prescription", file);

      const response = await fetch(
        "http://localhost:5000/api/prescriptions/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Uploaded successfully ✅");
      setFile(null);
      fetchPrescriptions(); // 🔥 refresh list
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  // 🔥 Handle view prescription
  const handleViewPrescription = (prescription: any) => {
    console.log("Prescription object:", prescription); // 🔥 Debug log
    
    // Try different possible property names
    const fileUrl = prescription.fileUrl || 
                    prescription.url || 
                    prescription.file || 
                    prescription.path ||
                    prescription.filePath;
    
    if (fileUrl) {
      // If it's a relative path, prepend the server URL
      const fullUrl = fileUrl.startsWith('http') 
        ? fileUrl 
        : `http://localhost:5000${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`;
      
      console.log("Opening URL:", fullUrl); // 🔥 Debug log
      window.open(fullUrl, '_blank');
    } else {
      console.error("No file URL found in prescription:", prescription);
      alert("File URL not found. Please check console for details.");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#F4F7FB",
      padding: "2rem 1rem",
    },
    wrapper: {
      maxWidth: "1000px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "2rem",
    },
    logo: {
      height: "64px",
      margin: "0 auto 1rem",
      display: "block",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#1C2F5E",
      marginBottom: "0.5rem",
    },
    subtitle: {
      color: "#6B7280",
      fontSize: "1rem",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      padding: "1.5rem",
      marginBottom: "2rem",
    },
    uploadBox: {
      border: "2px dashed #7EDCE2",
      borderRadius: "12px",
      padding: "3rem 2rem",
      textAlign: "center" as const,
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    uploadBoxHover: {
      borderColor: "#49B6C6",
    },
    uploadIcon: {
      width: "48px",
      height: "48px",
      margin: "0 auto 1rem",
      color: "#49B6C6",
    },
    fileInput: {
      display: "none",
    },
    fileLabel: {
      color: "#49B6C6",
      fontWeight: "500",
      cursor: "pointer",
      textDecoration: "none",
    },
    fileLabelHover: {
      color: "#1C2F5E",
    },
    fileHint: {
      fontSize: "0.75rem",
      color: "#6B7280",
      marginTop: "0.5rem",
    },
    filePreview: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#F4F7FB",
      borderRadius: "12px",
      padding: "1rem",
      marginTop: "1rem",
    },
    fileInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    fileIcon: {
      width: "32px",
      height: "32px",
      color: "#49B6C6",
    },
    fileName: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#1F2937",
    },
    fileSize: {
      fontSize: "0.75rem",
      color: "#6B7280",
    },
    uploadButton: {
      padding: "0.5rem 1.5rem",
      backgroundColor: "#49B6C6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    uploadButtonHover: {
      backgroundColor: "#1C2F5E",
    },
    uploadButtonDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    spinner: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#1C2F5E",
      marginBottom: "1rem",
    },
    emptyState: {
      textAlign: "center" as const,
      padding: "3rem 1rem",
    },
    emptyIcon: {
      width: "64px",
      height: "64px",
      margin: "0 auto 1rem",
      color: "#6B7280",
    },
    emptyText: {
      color: "#6B7280",
    },
    prescriptionList: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.75rem",
    },
    prescriptionItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem",
      border: "1px solid #E5E7EB",
      borderRadius: "12px",
      transition: "all 0.3s ease",
    },
    prescriptionItemHover: {
      borderColor: "#49B6C6",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
    prescriptionInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    prescriptionIconBox: {
      width: "48px",
      height: "48px",
      backgroundColor: "#F4F7FB",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    prescriptionIcon: {
      width: "24px",
      height: "24px",
      color: "#49B6C6",
    },
    viewButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "#1C2F5E",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "0.875rem",
      fontWeight: "500",
      transition: "background-color 0.3s ease",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      cursor: "pointer",
    },
    viewButtonHover: {
      backgroundColor: "#49B6C6",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header with Logo */}
        <div style={styles.header}>
          <img
            src="/Bharath Care Logo.png"
            alt="BharathCare"
            style={styles.logo}
          />
          <h1 style={styles.title}>Upload Prescription</h1>
          <p style={styles.subtitle}>
            Securely upload and manage your medical prescriptions
          </p>
        </div>

        {/* Upload Card */}
        <div style={styles.card}>
          <div
            style={styles.uploadBox}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#49B6C6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#7EDCE2";
            }}
          >
            <svg
              style={styles.uploadIcon}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <label
                htmlFor="file-upload"
                style={styles.fileLabel}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#1C2F5E";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#49B6C6";
                }}
              >
                Choose a file
                <input
                  id="file-upload"
                  type="file"
                  style={styles.fileInput}
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    if (e.target.files) setFile(e.target.files[0]);
                  }}
                />
              </label>
              <span style={{ color: "#1F2937" }}> or drag and drop</span>
            </div>
            <p style={styles.fileHint}>PNG, JPG, PDF up to 10MB</p>
          </div>

          {file && (
            <div style={styles.filePreview}>
              <div style={styles.fileInfo}>
                <svg style={styles.fileIcon} fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p style={styles.fileName}>{file.name}</p>
                  <p style={styles.fileSize}>
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={upload}
                disabled={uploading}
                style={{
                  ...styles.uploadButton,
                  ...(uploading ? styles.uploadButtonDisabled : {}),
                }}
                onMouseEnter={(e) => {
                  if (!uploading) {
                    e.currentTarget.style.backgroundColor = "#1C2F5E";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!uploading) {
                    e.currentTarget.style.backgroundColor = "#49B6C6";
                  }
                }}
              >
                {uploading ? (
                  <span style={styles.spinner}>
                    <svg
                      style={{ width: "16px", height: "16px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        style={{ opacity: 0.25 }}
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        style={{ opacity: 0.75 }}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          )}
        </div>

        {/* Prescriptions List */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>My Uploaded Prescriptions</h2>

          {prescriptions.length === 0 && (
            <div style={styles.emptyState}>
              <svg
                style={styles.emptyIcon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p style={styles.emptyText}>No prescriptions uploaded yet.</p>
            </div>
          )}

          <div style={styles.prescriptionList}>
            {prescriptions.map((p: any) => (
              <div
                key={p._id}
                style={styles.prescriptionItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#49B6C6";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={styles.prescriptionInfo}>
                  <div style={styles.prescriptionIconBox}>
                    <svg
                      style={styles.prescriptionIcon}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p style={styles.fileName}>
                      {p.fileName || "Prescription"}
                    </p>
                    <p style={styles.fileSize}>
                      Uploaded on {new Date(p.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleViewPrescription(p)}
                  style={styles.viewButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#49B6C6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#1C2F5E";
                  }}
                >
                  View Prescription
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPrescription;