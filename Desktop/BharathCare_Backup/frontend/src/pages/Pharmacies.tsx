import { useEffect, useState } from "react";
import { getNearestPharmacies } from "../api/pharmacy";

const Pharmacies = () => {
  const [pharmacies, setPharmacies] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getNearestPharmacies();
      setPharmacies(data);
    };
    load();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Nearby Pharmacies</h2>

      <ul>
        {pharmacies.map((p) => (
          <li key={p._id}>
            <strong>{p.name}</strong>
            <div>{p.address}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pharmacies;