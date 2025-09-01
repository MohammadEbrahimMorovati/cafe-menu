import { createContext, useEffect, useState } from "react";
import api from "../api/api.js"; // 📦 اینستنس axios پروژه

// 🧩 ساخت Context برای تم تا در کل اپ در دسترس باشد
export const ThemeContext = createContext();

// 🧠 Provider که تم را می‌خواند و در اختیار فرزندان قرار می‌دهد
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null); // 🎨 وضعیت تم (تا وقتی لود شود null است)

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        // 🌐 گرفتن تنظیمات تم از سرور
        const res = await api.get("moro/theme/");
        console.log("res :",res)
        setTheme(res.data); // ✅ تم دریافتی را مستقیم ست کن
      } catch (error) {
        // ⚠️ اگر درخواست ناموفق بود، تم پیش‌فرض را ست کن
        setTheme({
          name: "light",
          primary: "#613A27",
          secondary: "#FBE6D3",
          bodyBg: "#FBE6D3",
        });
      }
    };

    fetchTheme();
  }, []); // ⏱ فقط بارِ اول اجرا شود

  // ⏳ رندرِ موقت تا زمانی که تم لود شود
  if (!theme) return <div>در حال بارگذاری تم...</div>;

  // 📤 فراهم کردن تم برای تمام کامپوننت‌های زیرمجموعه
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}
