import { useTheme } from "../../contexts/useTheme"; 
// 🎨 هوک سفارشی برای دریافت رنگ‌ها و استایل از تم فعلی

// 📌 کامپوننت لودینگ اسپینر
// props: message => متن دلخواهی که هنگام لود نمایش داده می‌شود
const LoadingSpinner = ({ message = "در حال بارگذاری..." }) => {
  const { theme } = useTheme(); // 🎨 دریافت رنگ‌ها از تم

  // 🎨 رنگ پس‌زمینه و رنگ متن/بوردر بر اساس تم
  const backgroundColor = theme.primary_color || "#613A27"; // رنگ اصلی (fallback قهوه‌ای)
  const textColor = theme.secondary_color || "#FBE6D3"; // رنگ دوم (fallback بژ)

  return (
    <div
      className="min-h-screen flex items-center justify-center" 
      // 📌 ارتفاع کامل صفحه و وسط‌چین کردن محتوا
      style={{ backgroundColor }}
    >
      <div className="text-center">
        {/* 🔄 حلقه اسپینر */}
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
          style={{ borderColor: textColor }}
        ></div>

        {/* 📝 متن پیام لودینگ */}
        <div className="text-xl" style={{ color: textColor }}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; // 📤 خروجی گرفتن برای استفاده در بخش‌های دیگر
