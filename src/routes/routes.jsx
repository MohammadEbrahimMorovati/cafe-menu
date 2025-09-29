import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import { TenantProvider } from "../contexts/TenantProvider";
import { ThemeProvider } from "../contexts/ThemeContext";

// اگر صفحه/لی‌اوت‌های دیگری داشتی، اینجا ایمپورت‌شان کن

export default function AppRoutes() {
  return (
    <Routes>
      {/* اختیاری: ریدایرکت از روت به یک اسلاگ پیش‌فرض */}
      <Route path="/" element={<Navigate to="/moro/iman-cafe" replace />} />

      {/* مسیر اصلی به‌صورت اسلاگ‌دار */}
      <Route
        path="/:slug/*"
        element={
          <TenantProvider>
            <ThemeProvider >
            <App />
            </ThemeProvider>
          </TenantProvider>
        }
      />
    </Routes>
  );
}
