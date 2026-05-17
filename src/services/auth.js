import api from "./api";
import { jwtDecode } from "jwt-decode";



export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const getToken = (role) => {
  if (role === "ADMIN") {
    return localStorage.getItem("adminToken");
  }
  return localStorage.getItem("token");
};

export const getUserRoleFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch {
    return null;
  }
};