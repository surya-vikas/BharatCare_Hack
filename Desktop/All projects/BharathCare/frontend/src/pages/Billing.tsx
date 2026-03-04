import { useState } from "react";
import jsPDF from "jspdf";
import { medicines } from "../medicines";
import Papa from "papaparse";

type BillItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

type Medicine = {
  id: number;
  name: string;
  mrp: number;
  stock: number;
};

function Billing() {
  // STOCK MANAGEMENT
  const [stockMedicine, setStockMedicine] = useState<any>(null);
  const [stockQty, setStockQty] = useState(0);

  // NEW MEDICINE
  const [newMedicineName, setNewMedicineName] = useState("");
  const [newMedicinePrice, setNewMedicinePrice] = useState(0);
  const [newMedicineStock, setNewMedicineStock] = useState(0);
  const [allMedicines, setAllMedicines] = useState<Medicine[]>(medicines);

  // CUSTOMER DETAILS
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");

  // BILLING
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<"PAID" | "FAILED">("PAID");

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as any[];
  
        const updatedMedicines = [...allMedicines];
  
        data.forEach((row) => {
          const name = row.name?.trim();
          const mrp = Number(row.mrp);
          const stock = Number(row.stock);
  
          if (!name || isNaN(mrp) || isNaN(stock)) return;
  
          const existing = updatedMedicines.find(
            (m) => m.name.toLowerCase() === name.toLowerCase()
          );
  
          if (existing) {
            // If medicine exists → increase stock
            existing.stock += stock;
          } else {
            // If new → add medicine
            updatedMedicines.push({
              id: updatedMedicines.length + 1,
              name,
              mrp,
              stock,
            });
          }
        });
  
        setAllMedicines(updatedMedicines);
        alert("CSV stock uploaded successfully!");
      },
    });
  };

  // ADD NEW MEDICINE
  const addNewMedicine = () => {
    if (!newMedicineName || newMedicinePrice <= 0 || newMedicineStock < 0) {
      alert("Please fill all fields correctly");
      return;
    }

    const newMedicine: Medicine = {
      id: allMedicines.length + 1,
      name: newMedicineName,
      mrp: newMedicinePrice,
      stock: newMedicineStock,
    };

    setAllMedicines([...allMedicines, newMedicine]);
    alert(`${newMedicineName} added successfully!`);
    
    // Reset form
    setNewMedicineName("");
    setNewMedicinePrice(0);
    setNewMedicineStock(0);
  };

  // ADD ITEM
  const addItem = () => {
    if (!selected) return;

    // Check if medicine has stock
    if (selected.stock <= 0) {
      alert(`${selected.name} is out of stock!`);
      return;
    }

    // Check if requested quantity is available
    if (qty > selected.stock) {
      alert(`Only ${selected.stock} units available for ${selected.name}`);
      return;
    }

    setBillItems((prev) => [
      ...prev,
      {
        id: selected.id,
        name: selected.name,
        price: selected.mrp,
        qty,
      },
    ]);
    selected.stock -= qty;
    setSearch("");
    setSelected(null);
    setQty(1);
  };

  // REMOVE ITEM
  const removeItem = (index: number) => {
    const item = billItems[index];
    // Return stock
    const medicine = allMedicines.find((m) => m.id === item.id);
    if (medicine) {
      medicine.stock += item.qty;
    }
    setBillItems((prev) => prev.filter((_, i) => i !== index));
  };

  // UPDATE STOCK
  const updateStock = () => {
    if (!stockMedicine || stockQty <= 0) {
      alert("Please select a medicine and enter a valid quantity");
      return;
    }
    stockMedicine.stock += stockQty;
    alert(`Stock updated successfully! New stock: ${stockMedicine.stock}`);
    setStockMedicine(null);
    setStockQty(0);
  };

  // CALCULATIONS
  const baseAmount = billItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const cgst = (baseAmount * 2.5) / 100;
  const sgst = (baseAmount * 2.5) / 100;
  const totalAmount = baseAmount + cgst + sgst;

  // PDF
  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // HEADER - Company Info
    doc.setFillColor(30, 58, 138);
    doc.rect(0, 0, pageWidth, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("MEDI-BILL", 20, 18);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Five Star Medical Store", 20, 26);
    doc.text("123 Medical Avenue, Healthcare District", 20, 31);
    doc.text("Phone: +91 98765 43210", 20, 36);

    // INVOICE TITLE
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", pageWidth - 20, 18, { align: "right" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const invoiceNo = `INV-${Date.now().toString().slice(-8)}`;
    const invoiceDate = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Invoice Number: ${invoiceNo}`, pageWidth - 20, 26, {
      align: "right",
    });
    doc.text(`Invoice Date: ${invoiceDate}`, pageWidth - 20, 31, {
      align: "right",
    });

    // CUSTOMER DETAILS
    doc.setTextColor(0, 0, 0);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(20, 50, 85, 32);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO", 25, 57);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(customerName || "Walk-in Customer", 25, 64);
    if (customerPhone) doc.text(`Phone: ${customerPhone}`, 25, 69);
    if (customerAddress) {
      const addressLines = doc.splitTextToSize(customerAddress, 75);
      doc.text(addressLines, 25, 74);
    }

    // PAYMENT INFO
    doc.rect(pageWidth - 75, 50, 55, 32);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("PAYMENT STATUS", pageWidth - 70, 57);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    if (paymentStatus === "PAID") {
      doc.setTextColor(21, 128, 61);
      doc.text("PAID", pageWidth - 70, 66);
    } else {
      doc.setTextColor(185, 28, 28);
      doc.text("FAILED", pageWidth - 70, 66);
    }
    doc.setTextColor(0, 0, 0);

    // TABLE HEADER
    let yPos = 95;
    doc.setFillColor(30, 58, 138);
    doc.rect(20, yPos, pageWidth - 40, 8, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("NO", 23, yPos + 5.5);
    doc.text("ITEM DESCRIPTION", 35, yPos + 5.5);
    doc.text("QTY", 125, yPos + 5.5, { align: "center" });
    doc.text("RATE", 155, yPos + 5.5, { align: "right" });
    doc.text("AMOUNT", pageWidth - 23, yPos + 5.5, { align: "right" });

    // TABLE ROWS
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    yPos += 8;

    billItems.forEach((item, index) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      // Alternate row colors
      if (index % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, yPos, pageWidth - 40, 7, "F");
      }

      doc.text((index + 1).toString(), 23, yPos + 5);
      doc.text(item.name, 35, yPos + 5);
      doc.text(item.qty.toString(), 125, yPos + 5, { align: "center" });
      doc.text(item.price.toFixed(2), 155, yPos + 5, { align: "right" });
      doc.text((item.qty * item.price).toFixed(2), pageWidth - 23, yPos + 5, {
        align: "right",
      });

      yPos += 7;
    });

    // LINE SEPARATOR
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(20, yPos + 2, pageWidth - 20, yPos + 2);

    // TOTALS SECTION
    yPos += 10;
    const totalsX = pageWidth - 75;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    doc.text("Subtotal", totalsX, yPos);
    doc.text(`Rs ${baseAmount.toFixed(2)}`, pageWidth - 23, yPos, {
      align: "right",
    });

    yPos += 6;
    doc.text("CGST 2.5%", totalsX, yPos);
    doc.text(`Rs ${cgst.toFixed(2)}`, pageWidth - 23, yPos, { align: "right" });

    yPos += 6;
    doc.text("SGST 2.5%", totalsX, yPos);
    doc.text(`Rs ${sgst.toFixed(2)}`, pageWidth - 23, yPos, { align: "right" });

    // TOTAL
    yPos += 8;
    doc.setFillColor(30, 58, 138);
    doc.rect(totalsX - 3, yPos - 4, pageWidth - totalsX - 17, 10, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("TOTAL", totalsX, yPos + 2);
    doc.text(`Rs ${totalAmount.toFixed(2)}`, pageWidth - 23, yPos + 2, {
      align: "right",
    });

    // FOOTER
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    yPos += 20;
    doc.text("Thank you for your business", pageWidth / 2, yPos, {
      align: "center",
    });

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "This is a computer-generated invoice and does not require a signature",
      pageWidth / 2,
      yPos + 5,
      { align: "center" }
    );

    // PREVIEW
    const pdfUrl = doc.output("bloburl");
    window.open(pdfUrl);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f8",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "white",
          padding: "20px 30px",
          borderRadius: "8px",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#1e3a8a",
              letterSpacing: "0.5px",
            }}
          >
            MEDI-BILL
          </div>
          <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
            Professional Billing System
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "16px", fontWeight: "600", color: "#334155" }}>
            Five Star Medical Store
          </div>
          <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>
            +91 98765 43210
          </div>
        </div>
      </div>

      {/* INVENTORY MANAGEMENT CONTAINER */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* ADD NEW MEDICINE */}
        <div
          style={{
            flex: "1",
            minWidth: "300px",
            background: "white",
            padding: "25px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: "18px",
              color: "#1e293b",
              fontSize: "16px",
              fontWeight: "600",
              borderBottom: "2px solid #e2e8f0",
              paddingBottom: "8px",
            }}
          >
            Add New Medicine
          </h3>

          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                fontWeight: "500",
                color: "#475569",
              }}
            >
              Medicine Name
            </label>
            <input
              type="text"
              placeholder="Enter medicine name"
              value={newMedicineName}
              onChange={(e) => setNewMedicineName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1e3a8a")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#475569",
                }}
              >
                Price (Rs)
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={newMedicinePrice || ""}
                onChange={(e) => setNewMedicinePrice(Number(e.target.value))}
                min="0"
                step="0.01"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1e3a8a")}
                onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "#475569",
                }}
              >
                Initial Stock
              </label>
              <input
                type="number"
                placeholder="0"
                value={newMedicineStock || ""}
                onChange={(e) => setNewMedicineStock(Number(e.target.value))}
                min="0"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1e3a8a")}
                onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
              />
            </div>
          </div>

          <button
            onClick={addNewMedicine}
            style={{
              width: "100%",
              padding: "11px",
              background: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Add Medicine to Catalog
          </button>
          <div style={{ marginTop: "15px" }}>
  <label
    style={{
      display: "block",
      marginBottom: "6px",
      fontSize: "13px",
      fontWeight: "500",
      color: "#475569",
    }}
  >
    Upload Stock via CSV
  </label>

  <input
    type="file"
    accept=".csv"
    onChange={handleCSVUpload}
    style={{
      width: "100%",
      padding: "8px",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
      background: "#f8fafc",
      cursor: "pointer",
    }}
  />
</div>
        </div>

        {/* UPDATE STOCK */}
        <div
          style={{
            flex: "1",
            minWidth: "300px",
            background: "white",
            padding: "25px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: "18px",
              color: "#1e293b",
              fontSize: "16px",
              fontWeight: "600",
              borderBottom: "2px solid #e2e8f0",
              paddingBottom: "8px",
            }}
          >
            Update Stock
          </h3>

          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                fontWeight: "500",
                color: "#475569",
              }}
            >
              Select Medicine
            </label>
            <select
              value={stockMedicine?.id || ""}
              onChange={(e) =>
                setStockMedicine(
                  allMedicines.find((m) => m.id === Number(e.target.value)) ||
                    null
                )
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                background: "white",
                cursor: "pointer",
              }}
            >
              <option value="">Choose a medicine...</option>
              {allMedicines.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (Current Stock: {m.stock})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "13px",
                fontWeight: "500",
                color: "#475569",
              }}
            >
              Quantity to Add
            </label>
            <input
              type="number"
              placeholder="Enter quantity"
              value={stockQty || ""}
              onChange={(e) => setStockQty(Number(e.target.value))}
              min="1"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1e3a8a")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
            />
          </div>

          <button
            onClick={updateStock}
            style={{
              width: "100%",
              padding: "11px",
              background: "#15803d",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Add Stock
          </button>

          {stockMedicine && (
            <div
              style={{
                marginTop: "12px",
                padding: "12px 14px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "6px",
                fontSize: "13px",
                color: "#1e40af",
              }}
            >
              <strong>Selected:</strong> {stockMedicine.name} |{" "}
              <strong>Current Stock:</strong> {stockMedicine.stock} |{" "}
              <strong>Price:</strong> Rs {stockMedicine.mrp}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* LEFT PANEL */}
        <div
          style={{
            flex: "2",
            minWidth: "350px",
            background: "white",
            padding: "25px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          {/* CUSTOMER DETAILS */}
          <div style={{ marginBottom: "25px" }}>
            <h3
              style={{
                marginTop: 0,
                marginBottom: "15px",
                color: "#1e293b",
                fontSize: "16px",
                fontWeight: "600",
                borderBottom: "2px solid #e2e8f0",
                paddingBottom: "8px",
              }}
            >
              Customer Details
            </h3>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1e3a8a")}
                onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "14px",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1e3a8a")}
                onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
              />
            </div>
            <textarea
              placeholder="Address"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                minHeight: "55px",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1e3a8a")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
            />
          </div>

          {/* SEARCH MEDICINE */}
          <div style={{ marginBottom: "25px" }}>
            <h3
              style={{
                marginTop: 0,
                marginBottom: "15px",
                color: "#1e293b",
                fontSize: "16px",
                fontWeight: "600",
                borderBottom: "2px solid #e2e8f0",
                paddingBottom: "8px",
              }}
            >
              Add Medicine
            </h3>
            <input
              type="text"
              placeholder="Search medicine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1e3a8a")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
            />

            {search && (
              <div
                style={{
                  marginTop: "10px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  maxHeight: "200px",
                  overflowY: "auto",
                  background: "#f8fafc",
                }}
              >
                {allMedicines.filter((m) =>
                  m.name.toLowerCase().includes(search.toLowerCase())
                ).length === 0 ? (
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#dc2626",
                      fontSize: "14px",
                    }}
                  >
                    Medicine not available in catalog
                  </div>
                ) : (
                  allMedicines
                    .filter((m) =>
                      m.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          if (m.stock <= 0) {
                            alert(`${m.name} is out of stock!`);
                            return;
                          }
                          setSelected(m);
                          setSearch(m.name);
                        }}
                        style={{
                          padding: "10px 12px",
                          cursor: m.stock > 0 ? "pointer" : "not-allowed",
                          borderBottom: "1px solid #f1f5f9",
                          transition: "background 0.15s",
                          opacity: m.stock <= 0 ? 0.5 : 1,
                        }}
                        onMouseEnter={(e) => {
                          if (m.stock > 0) {
                            e.currentTarget.style.background = "#e0e7ff";
                          }
                        }}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        {/* CSV Upload */}

                        <div
                          style={{
                            fontWeight: "500",
                            fontSize: "14px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span>{m.name}</span>
                          {m.stock <= 0 && (
                            <span
                              style={{
                                fontSize: "11px",
                                background: "#dc2626",
                                color: "white",
                                padding: "2px 8px",
                                borderRadius: "4px",
                              }}
                            >
                              OUT OF STOCK
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>
                          Rs {m.mrp} | Stock: {m.stock}
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}

            {selected && (
              <div
                style={{
                  marginTop: "12px",
                  padding: "14px",
                  background: "#f1f5f9",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                }}
              >
                <div
                  style={{
                    marginBottom: "8px",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Selected: {selected.name}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    marginBottom: "10px",
                  }}
                >
                  Available Stock: {selected.stock} | Price: Rs {selected.mrp}
                </div>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <input
                    type="number"
                    value={qty}
                    min={1}
                    max={selected.stock}
                    onChange={(e) => setQty(Number(e.target.value))}
                    style={{
                      width: "70px",
                      padding: "8px 10px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                  <button
                    onClick={addItem}
                    style={{
                      flex: 1,
                      padding: "9px 18px",
                      background: "#1e3a8a",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    Add to Bill
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* BILL ITEMS TABLE */}
          <div>
            <h3
              style={{
                marginTop: 0,
                marginBottom: "15px",
                color: "#1e293b",
                fontSize: "16px",
                fontWeight: "600",
                borderBottom: "2px solid #e2e8f0",
                paddingBottom: "8px",
              }}
            >
              Bill Items
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#1e3a8a",
                      color: "white",
                    }}
                  >
                    <th
                      style={{
                        padding: "11px 12px",
                        textAlign: "left",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      No
                    </th>
                    <th
                      style={{
                        padding: "11px 12px",
                        textAlign: "left",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      Item
                    </th>
                    <th
                      style={{
                        padding: "11px 12px",
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      Qty
                    </th>
                    <th
                      style={{
                        padding: "11px 12px",
                        textAlign: "right",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      Rate
                    </th>
                    <th
                      style={{
                        padding: "11px 12px",
                        textAlign: "right",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      Total
                    </th>
                    <th
                      style={{
                        padding: "11px 12px",
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {billItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          padding: "30px",
                          textAlign: "center",
                          color: "#94a3b8",
                        }}
                      >
                        No items added yet
                      </td>
                    </tr>
                  ) : (
                    billItems.map((item, i) => (
                      <tr
                        key={i}
                        style={{
                          background: i % 2 === 0 ? "#f8fafc" : "white",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <td style={{ padding: "11px 12px" }}>{i + 1}</td>
                        <td style={{ padding: "11px 12px", fontWeight: "500" }}>
                          {item.name}
                        </td>
                        <td style={{ padding: "11px 12px", textAlign: "center" }}>
                          {item.qty}
                        </td>
                        <td style={{ padding: "11px 12px", textAlign: "right" }}>
                          Rs {item.price.toFixed(2)}
                        </td>
                        <td
                          style={{
                            padding: "11px 12px",
                            textAlign: "right",
                            fontWeight: "600",
                          }}
                        >
                          Rs {(item.price * item.qty).toFixed(2)}
                        </td>
                        <td style={{ padding: "11px 12px", textAlign: "center" }}>
                          <button
                            onClick={() => removeItem(i)}
                            style={{
                              padding: "5px 10px",
                              background: "#dc2626",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - SUMMARY */}
        <div
          style={{
            flex: "1",
            minWidth: "300px",
            background: "white",
            padding: "25px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
            height: "fit-content",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: "18px",
              color: "#1e293b",
              fontSize: "16px",
              fontWeight: "600",
              borderBottom: "2px solid #e2e8f0",
              paddingBottom: "8px",
            }}
          >
            Bill Summary
          </h3>

          <div
            style={{
              background: "#f8fafc",
              padding: "18px",
              borderRadius: "6px",
              marginBottom: "18px",
              border: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#64748b" }}>Subtotal</span>
              <span style={{ fontWeight: "600" }}>Rs {baseAmount.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#64748b" }}>CGST 2.5%</span>
              <span style={{ fontWeight: "600" }}>Rs {cgst.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
                fontSize: "14px",
                paddingBottom: "12px",
                borderBottom: "1px dashed #cbd5e1",
              }}
            >
              <span style={{ color: "#64748b" }}>SGST 2.5%</span>
              <span style={{ fontWeight: "600" }}>Rs {sgst.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}
              >
                Total
              </span>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#1e3a8a",
                }}
              >
                Rs {totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                marginBottom: "10px",
                fontWeight: "600",
                color: "#1e293b",
                fontSize: "14px",
              }}
            >
              Payment Status
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setPaymentStatus("PAID")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: paymentStatus === "PAID" ? "#15803d" : "#f1f5f9",
                  color: paymentStatus === "PAID" ? "white" : "#64748b",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "all 0.2s",
                }}
              >
                PAID
              </button>
              <button
                onClick={() => setPaymentStatus("FAILED")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: paymentStatus === "FAILED" ? "#b91c1c" : "#f1f5f9",
                  color: paymentStatus === "FAILED" ? "white" : "#64748b",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "all 0.2s",
                }}
              >
                FAILED
              </button>
            </div>
          </div>

          <button
            onClick={generatePDF}
            disabled={billItems.length === 0}
            style={{
              width: "100%",
              padding: "13px",
              background: billItems.length === 0 ? "#cbd5e1" : "#1e3a8a",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: billItems.length === 0 ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "15px",
              transition: "all 0.2s",
            }}
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default Billing;