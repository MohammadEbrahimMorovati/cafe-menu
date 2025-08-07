import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/useTheme";

const StickyHeader = () => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // رنگ‌های استفاده شده از theme
  const logoColor = theme.primary;
  const logoBackground = "#ffffff";
  const titleColor = isScrolled ? theme.primary : "#ffffff";
  const titleShadow = isScrolled
    ? {}
    : { textShadow: "0 1px 10px rgba(0,0,0,0.2)" };

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

          {/* عنوان */}
          <p
            className={`font-bold mt-1 transition-all duration-300 ${
              isScrolled ? "text-xl" : "text-2xl"
            }`}
            style={{ color: titleColor, ...titleShadow }}
          >
            منوی رستوران مورو
          </p>
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
