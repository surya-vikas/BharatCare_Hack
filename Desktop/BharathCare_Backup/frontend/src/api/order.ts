import api from "./axios";

export const createOrder = async (medicineId: string) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    "/orders/create",
    { medicineId, quantity: 1 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};