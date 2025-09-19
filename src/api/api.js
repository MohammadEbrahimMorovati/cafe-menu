import axios from "axios"; // 📦 ایمپورت کتابخانه axios برای ارسال درخواست HTTP

// 📌 ساخت یک instance از axios با تنظیمات پیش‌فرض
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/cafes", // 🌐 آدرس پیش‌فرض سرور (API Base URL)
  timeout: 10000, // ⏳ حداکثر زمان انتظار برای پاسخ (10 ثانیه)
  headers: {
    "Content-Type": "application/json", // 📄 فرمت داده ارسالی JSON
  },
});

/* ------------------------- NEW: Tenant attach helper ------------------------ */
/**
 * attachTenant(getSlug, { mode })
 *  - getSlug: فانکشنی که اسلاگ فعلی را برمی‌گرداند (مثلاً از useParams در Router)
 *  - mode: 'path' | 'header' | 'query'  (پیش‌فرض: 'path')
 *     path  => /{slug}/... به ابتدای url اضافه می‌کند
 *     header=> هدر X-Tenant-Slug می‌گذارد
 *     query => پارامتر ?slug={slug} اضافه می‌کند
 *
 * config.skipTenant = true  => این درخواست خاص را از تننت‌گذاری مستثنی می‌کند.
 */
let tenantInterceptorId = null;
export const attachTenant = (getSlug, { mode = "path" } = {}) => {
  // برای جلوگیری از چند-بار اضافه شدن، قبلی را حذف می‌کنیم
  if (tenantInterceptorId !== null) {
    api.interceptors.request.eject(tenantInterceptorId);
    tenantInterceptorId = null;
  }

  tenantInterceptorId = api.interceptors.request.use(
    (config) => {
      const slug = getSlug?.();
      if (!slug || config.skipTenant) return config;

      // URL مطلق را دست نزن
      if (/^https?:\/\//i.test(config.url || "")) return config;

      if (mode === "header") {
        config.headers = { ...(config.headers || {}), "X-Tenant-Slug": slug };
        return config;
      }

      if (mode === "query") {
        const params = new URLSearchParams(config.params || {});
        params.set("slug", slug);
        config.params = Object.fromEntries(params.entries());
        return config;
      }

      // حالت پیش‌فرض: path
      const origPath = config.url || "";
      const path = origPath.startsWith("/") ? origPath : `/${origPath}`;

      // اگر قبلاً اسلاگ داشت، دوباره اضافه نکن
      if (path === `/${slug}` || path.startsWith(`/${slug}/`)) {
        config.url = path;
        return config;
      }

      config.url = `/${slug}${path}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
};
/* --------------------------------------------------------------------------- */

// 📌 اینترسپتور درخواست‌ها (Request Interceptor) — توکن
api.interceptors.request.use(
  (config) => {
    // 🔑 گرفتن توکن از localStorage (یا می‌توان از context/state گرفت)
    const token = localStorage.getItem("token");
    if (token) {
      // 📌 اضافه کردن توکن به هدر Authorization اگر وجود داشته باشد
      config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
    }
    return config; // حتماً باید config را برگردانیم
  },
  (error) => Promise.reject(error) // 🚫 اگر خطایی قبل از ارسال درخواست رخ دهد
);

// 📌 اینترسپتور پاسخ‌ها (Response Interceptor)
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
