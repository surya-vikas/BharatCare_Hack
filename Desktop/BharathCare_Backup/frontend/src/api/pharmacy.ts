import api from "./axios";

export const getNearestPharmacies = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/pharmacies/nearest", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};