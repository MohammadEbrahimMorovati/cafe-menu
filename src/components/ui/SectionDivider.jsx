import { useTheme } from "../../contexts/useTheme";
// 🎨 هوک سفارشی برای گرفتن رنگ‌های فعلی تم

// 📌 کامپوننت جداکننده سکشن‌ها با عنوان
// props: title => عنوان سکشن
const SectionDivider = ({ title }) => {
  const { theme } = useTheme(); // 🎨 گرفتن رنگ‌ها از تم
  const color = theme.primary; // رنگ اصلی برای خط و متن

  return (
    <div
      className="border-t-2 border-dashed mb-2"
      // 📏 خط بالایی (border top) با استایل خط‌چین
      style={{ borderColor: color }}
    >
      {/* 🏷 عنوان سکشن در مرکز */}
      <h2 className="text-center text-base font-bold mt-1" style={{ color }}>
        {title}
      </h2>
    </div>
  );
};

export default SectionDivider; // 📤 خروجی گرفتن کامپوننت برای استفاده در بخش‌های دیگر
