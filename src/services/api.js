import axios from "axios";

const api = axios.create({
  baseURL: "https://hostel-management-system-backend-9ar8.onrender.com/api",
});

// Attach token automatically if present
api.interceptors.request.use((config) => {
  let token = null;
  const role = localStorage.getItem("role");

  if(role === "ADMIN") {
    token = localStorage.getItem("adminToken");
  } else {
    token = localStorage.getItem("token");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
