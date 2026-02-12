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

export const login = (email: string, password: string) => {
  return api.post("/auth/login", {
    email,
    password,
  });
};
