// src/api/api.js
import axios from "axios";

// 📌 یک global variable برای tenant (ابتدا null)
let currentTenant = null;

// 👇 فانکشن برای آپدیت global tenant (از TenantProvider کال می‌شه)
export const setCurrentTenant = (tenant) => {
  currentTenant = tenant;
};

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/cafes",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 👇 Interceptor برای اضافه کردن tenant به URL
api.interceptors.request.use(
  (config) => {
    if (currentTenant) {
      // 👇 URL رو تغییر بده: /cafes + /${currentTenant} + rest (مثل /theme -> /cafes/slug/theme)
      config.url = `/${currentTenant}${config.url}`;
    } else {
      console.warn("Tenant not set yet!");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;