import { useState } from "react";
import { searchMedicines } from "../api/medicine";

const MedicineSearch = () => {
  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState<any[]>([]);

  const handleSearch = async () => {
    const data = await searchMedicines(query);
    setMedicines(data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Search Medicines</h2>

      <input
        placeholder="Enter medicine name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <ul>
        {medicines.map((m) => (
          <li key={m._id}>
            {m.name} — {m.manufacturer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineSearch;