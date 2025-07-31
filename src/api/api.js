import axios from "axios";

// ساخت اینستنس اصلی axios با baseURL
const api = axios.create({
  baseURL: "https://cafejsonserver.liara.run", // 🔁 این رو تغییر بده
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// افزودن توکن به هر درخواست در صورت وجود
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // یا از context/state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// مدیریت پاسخ‌ها و ارورها
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // مدیریت خطاهای رایج
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized! Redirect to login...");
        // مثلاً redirect به login
      } else if (error.response.status === 500) {
        console.error("Server Error!");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
//وقتی چیزی از سرور بگیریم Get
//هرجا قرار بود چیزی بفرستیم Set
