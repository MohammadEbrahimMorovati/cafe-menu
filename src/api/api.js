import axios from "axios"; // 📦 ایمپورت کتابخانه axios برای ارسال درخواست HTTP

// 📌 ساخت یک instance از axios با تنظیمات پیش‌فرض
const api = axios.create({
  // baseURL: "https://cafejsonserver.liara.run", // 🌐 آدرس پیش‌فرض سرور (API Base URL) — قابل تغییر
  baseURL: "http://localhost:3000/",
  timeout: 10000, // ⏳ حداکثر زمان انتظار برای پاسخ (10 ثانیه)
  headers: {
    "Content-Type": "application/json", // 📄 فرمت داده ارسالی JSON
    "Access-Control-Allow-Origin": "*", // 🌍 اجازه دسترسی از همه دامنه‌ها (CORS)
  },
});

// 📌 اینترسپتور درخواست‌ها (Request Interceptor)
// قبل از ارسال هر درخواست اجرا می‌شود
api.interceptors.request.use(
  (config) => {
    // 🔑 گرفتن توکن از localStorage (یا می‌توان از context/state گرفت)
    const token = localStorage.getItem("token");
    if (token) {
      // 📌 اضافه کردن توکن به هدر Authorization اگر وجود داشته باشد
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // حتماً باید config را برگردانیم
  },
  (error) => Promise.reject(error) // 🚫 اگر خطایی قبل از ارسال درخواست رخ دهد
);

// 📌 اینترسپتور پاسخ‌ها (Response Interceptor)
// بعد از دریافت پاسخ از سرور اجرا می‌شود
api.interceptors.response.use(
  (response) => response, // ✅ اگر پاسخ بدون خطا باشد، همان را برمی‌گردانیم
  (error) => {
    // ❌ مدیریت خطاهای متداول
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized! Redirect to login...");
        // 📌 مثال: هدایت کاربر به صفحه ورود
      } else if (error.response.status === 500) {
        console.error("Server Error!");
      }
    }
    return Promise.reject(error); // 🚫 بازگرداندن خطا برای مدیریت در بخش دیگر
  }
);

export default api; // 📤 خروجی گرفتن instance برای استفاده در کل پروژه

// 📌 نکته‌ها:
// GET  => وقتی داده‌ای را از سرور می‌گیریم (Read)
// POST/PUT/PATCH => وقتی داده‌ای را به سرور می‌فرستیم یا بروزرسانی می‌کنیم (Write)
