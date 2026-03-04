import api from "./axios";

export const searchMedicines = async (query: string) => {
  const token = localStorage.getItem("token");

  const res = await api.get(`/medicines/search?q=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const searchNearbyMedicines = async (
  medicine: string,
  lat: number,
  lng: number
) => {
  const token = localStorage.getItem("token");

  const res = await api.get(
    `/api/medicines/search-nearby?medicine=${medicine}&lat=${lat}&lng=${lng}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};