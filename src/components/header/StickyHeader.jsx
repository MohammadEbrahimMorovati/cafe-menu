import { useState, useEffect } from "react"; 
// 📦 هوک‌های React برای مدیریت state و lifecycle

import { useTheme } from "../../contexts/useTheme"; 
// 🎨 هوک سفارشی برای دسترسی به رنگ‌ها و تنظیمات تم

import TextType from "../ui/TextType"; 
// ⌨️ کامپوننت متن تایپی با انیمیشن

// 📌 هدر چسبان (Sticky Header)
const StickyHeader = () => {
  const { theme } = useTheme(); // 🎨 گرفتن رنگ اصلی از تم
  const [isScrolled, setIsScrolled] = useState(false); // 📜 وضعیت اسکرول شدن صفحه

  // 📌 اثر جانبی: گوش دادن به رویداد اسکرول
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100); // اگر بالای 100px اسکرول شد، تغییر وضعیت
    window.addEventListener("scroll", handleScroll);

    // 🧹 پاک کردن event listener هنگام خروج از کامپوننت
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🎨 رنگ لوگو
  const logoColor = theme.primary;
  const logoBackground = "#ffffff";

  // 📌 سایه متن فقط وقتی اسکرول نشده اعمال می‌شود
  const titleShadow = isScrolled
    ? {}
    : { textShadow: "0 1px 10px rgba(0,0,0,0.2)" };

  // 🎨 رنگ متن بر اساس اسکرول
  const textColor = isScrolled ? theme.primary : "#ffffff";

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isScrolled ? "fixed top-0 left-0 right-0 z-50" : "relative pt-4 mb-8"
      }`}
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex flex-col items-center">

          {/* 🔵 دایره لوگو */}
          <div
            className={`rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
              isScrolled ? "w-12 h-12" : "w-20 h-20"
            }`}
            style={{ backgroundColor: logoBackground }}
          >
            {/* ☕ آیکون داخل لوگو */}
            <div
              className={`transition-all duration-300 ${
                isScrolled ? "text-xl" : "text-3xl"
              }`}
              style={{ color: logoColor }}
            >
              ☕
            </div>
          </div>

          {/* ⌨️ متن با افکت تایپ */}
          <TextType
            text={[
              "منوی رستوران مورو",
              "برای سفارش کلیک کنید",
              "تجربه‌ای متفاوت با مورو",
            ]} // متن‌هایی که به صورت چرخشی تایپ می‌شوند
            typingSpeed={80} // سرعت تایپ
            pauseDuration={2000} // مکث بین جملات
            showCursor={true} // نمایش نشانگر تایپ
            cursorCharacter="|" // کاراکتر نشانگر
            className={`font-bold mt-1 transition-all duration-300 ${
              isScrolled ? "text-xl" : "text-2xl"
            }`}
            textColors={[textColor]} // 🎨 رنگ داینامیک متن
            style={titleShadow} // سایه متن
          />
        </div>
      </div>
    </div>
  );
};

export default StickyHeader; // 📤 خروجی گرفتن برای استفاده در بخش‌های دیگر
