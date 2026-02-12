import api from "./axios";

export const register = (
  name: string,
  email: string,
  password: string,
  role: "patient" | "doctor" | "pharmacy"
) => {
  return api.post("/auth/register", {
    name,
    email,
    password,
    role,
  });
};

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};


