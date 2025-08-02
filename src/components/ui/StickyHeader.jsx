import { useState, useEffect } from "react";

const StickyHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isScrolled ? "fixed top-0 left-0 right-0 z-50" : "relative mb-8 pt-4"
      }`}
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <div
            className={`bg-white rounded-full flex items-center justify-center mb-2 transition-all duration-300 ease-in-out ${
              isScrolled ? "w-12 h-12" : "w-20 h-20"
            }`}
          >
            <div
              className={`text-[#613A27] transition-all duration-300 ease-in-out ${
                isScrolled ? "text-xl" : "text-3xl"
              }`}
            >
              ☕
            </div>
          </div>
          {/* متن بزرگ و با رنگ متغیر */}
          <p
            className={`font-bold transition-all duration-300 mt-1 ${
              isScrolled
                ? "text-[#613A27] text-xl opacity-100"
                : "text-white text-2xl opacity-100"
            }`}
            style={{
              textShadow: !isScrolled ? "0 1px 10px rgba(0,0,0,0.20)" : "none",
            }}
          >
            منوی رستوران مورو
          </p>
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
