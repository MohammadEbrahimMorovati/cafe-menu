import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/useTheme";
import TextType from "../ui/TextType";

const StickyHeader = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoColor = theme.primary;
  const logoBackground = "#ffffff";
  const titleShadow = isScrolled
    ? {}
    : { textShadow: "0 1px 10px rgba(0,0,0,0.2)" };

  const textColor = isScrolled ? theme.primary : "#ffffff";

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isScrolled ? "fixed top-0 left-0 right-0 z-50" : "relative pt-4 mb-8"
      }`}
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* دایره لوگو */}
          <div
            className={`rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
              isScrolled ? "w-12 h-12" : "w-20 h-20"
            }`}
            style={{ backgroundColor: logoBackground }}
          >
            <div
              className={`transition-all duration-300 ${
                isScrolled ? "text-xl" : "text-3xl"
              }`}
              style={{ color: logoColor }}
            >
              ☕
            </div>
          </div>

          {/* متن با انیمیشن تایپ */}
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
            className={`font-bold mt-1 transition-all duration-300 ${
              isScrolled ? "text-xl" : "text-2xl"
            }`}
            textColors={[textColor]} // ← رنگ داینامیک
            style={titleShadow}
          />
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
