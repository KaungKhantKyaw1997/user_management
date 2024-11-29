import axios from "axios";

const api = axios.create({
  baseURL: "https://user-management-api-rig1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = (email, password) => {
  return api.post("/api/v1/auth/login", { email, password });
};

export const getStaff = (token) => {
  return api.get("/api/v1/staff", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStaffRole = (staffId, token) => {
  return api.get(`/api/v1/staff/${staffId}/role`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStaffPermissions = (staffId, token) => {
  return api.get(`/api/v1/staff/${staffId}/permissions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
