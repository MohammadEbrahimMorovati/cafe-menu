import { useState, useEffect } from "react";

const StickyHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100); // تغییر حالت بعد از 100 پیکسل اسکرول
    };

    window.addEventListener("scroll", handleScroll);
    
    // پاک کردن event listener هنگام unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isScrolled
          ? "fixed top-0 left-0 right-0 z-50 bg-[#FBE6D3] shadow-lg border-b-2 border-[#613A27] py-2"
          : "relative mb-8 pt-4"
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
          <h1
            className={`text-[#613A27] font-bold transition-all duration-300 ease-in-out ${
              isScrolled ? "text-sm" : "text-xl"
            }`}
          >
            Coffee
          </h1>
          {!isScrolled && (
            <p className="text-[#613A27] text-sm opacity-70 transition-opacity duration-300">
              logo design
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;