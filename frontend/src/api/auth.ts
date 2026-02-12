import api from "./axios";

export const login = async (email: string, password: string) => {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data;
};

export const register = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const res = await api.post("/api/auth/register", {
    name,
    email,
    password,
    role,
  });

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};


