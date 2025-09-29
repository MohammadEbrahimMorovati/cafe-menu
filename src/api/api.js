import axios from "axios"; // 📦 ایمپورت کتابخانه axios برای ارسال درخواست HTTP

// 📌 ساخت یک instance از axios با تنظیمات پیش‌فرض
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/cafes", // 🌐 آدرس پیش‌فرض سرور (API Base URL)
  timeout: 10000, // ⏳ حداکثر زمان انتظار برای پاسخ (10 ثانیه)
  headers: {
    "Content-Type": "application/json", // 📄 فرمت داده ارسالی JSON
  },
});




export default api; // 📤 خروجی گرفتن instance برای استفاده در کل پروژه

