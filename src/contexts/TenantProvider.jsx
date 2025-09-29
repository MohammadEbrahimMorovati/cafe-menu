// src/contexts/TenantContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { setCurrentTenant } from "../api/api"; // 👈 ایمپورت فانکشن از api.js

// 🧩 ساخت Context برای tenant (slug)
export const TenantContext = createContext();

// 🧠 Provider که tenant رو مدیریت می‌کنه
export function TenantProvider({ children }) {
  const [tenant, setTenant] = useState(null); // 📌 tenant/slug (تا لود بشه null)
  const location = useLocation();

  useEffect(() => {
    // 👇 استخراج slug از URL (فرض /moro/:slug یا مشابه)
    const pathnameParts = location.pathname.split('/');
    const slug = pathnameParts[2]; // index 0: '', 1: 'moro', 2: slug

    if (slug && slug !== tenant) {
      setTenant(slug);
      setCurrentTenant(slug); // 👈 آپدیت global برای interceptor
    }
  }, [location.pathname]); // ⏱ هر بار URL تغییر کنه، چک کن (برای navigation)

  // ⏳ اگر tenant لود نشده، می‌تونی لودینگ نشون بدی، اما اینجا ساده نگه می‌داریم
  if (!tenant) return <div>در حال بارگذاری tenant...</div>;

  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

// 👇 هوک برای استفاده آسان از tenant در کامپوننت‌ها (اختیاری)
export const useTenant = () => useContext(TenantContext);