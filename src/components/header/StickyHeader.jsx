import { useTheme } from "../../contexts/useTheme";
import TextType from "../ui/TextType";
import Wave from "react-wavify"; // 📦 اضافه کن

const StickyHeader = () => {
  const { theme } = useTheme();

  // 🎨 رنگ‌ها
  const logoColor = theme.primary;
  const logoBackground = "#ffffff";

  return (
    <div className="relative pt-4 mb-8 overflow-hidden">
      {/* 🌊 موج متحرک پس‌زمینه */}
      <Wave
        fill="#3b2416" // رنگ موج (قهوه‌ای تیره‌تر)
        paused={false}
        options={{
          height: 40, // ارتفاع موج
          amplitude: 40, // میزان بالا و پایین رفتن موج
          speed: 0.25, // سرعت حرکت
          points: 3, // تعداد قوس‌ها
        }}
        className="absolute bottom-0 left-0 w-full h-32"
      />

      {/* محتوای اصلی هدر */}
      <div className="relative max-w-2xl mx-auto px-4 z-10">
        <div className="flex flex-col items-center">
          {/* 🔵 دایره لوگو */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-2 shadow-md"
            style={{ backgroundColor: logoBackground }}
          >
            <div className="text-3xl" style={{ color: logoColor }}>
              ☕
            </div>
          </div>

          {/* ⌨️ متن با افکت تایپ */}
          <TextType
            text={[
              "منوی رستوران مورو",
              "برای سفارش کلیک کنید",
              "تجربه‌ای متفاوت با مورو",
            ]}
            typingSpeed={80}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
            className="font-bold mt-1 text-2xl text-white"
            style={{ textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
