import { useTheme } from "../../contexts/useTheme";

const FeaturedCategories = ({ categories, title = "دسته‌بندی‌ها" }) => {
  const { theme } = useTheme();
  const primaryColor = theme.primary_color;

  if (!categories?.length) return null;

  // 📌 تابع اسکرول نرم به سکشن دسته محصول
  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(`category-section-${categoryId}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // ✨ افکت هایلایت کوتاه روی بخش مقصد
      element.classList.add("ring-4", "ring-yellow-400/70");
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-yellow-400/70");
      }, 1200);
    }
  };

  return (
    <div className="mb-12">
      {/* 🏷 عنوان */}
      <h2
        className="text-2xl sm:text-3xl font-extrabold tracking-widest mb-6 text-center drop-shadow-xl"
        style={{ color: primaryColor }}
      >
        {title} 
      </h2>

      {/* 📜 لیست دسته‌بندی‌ها (اسکرول نرم iOS) */}
      <div
        className="overflow-x-auto scrollbar-hide px-4"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch", // اینرسی iOS
        }}
      >
        <div className="flex gap-6 pb-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className="flex-shrink-0 w-44 h-56 relative cursor-pointer group 
             rounded-2xl overflow-hidden shadow-lg transition-all duration-500 
             hover:ring-2 hover:ring-yellow-400/70"
              style={{ scrollSnapAlign: "center" }}
            >
              {/* تصویر دسته */}
              <img
                src={`${cat.image}`}
                alt={cat.name}
                className="w-full h-full object-cover 
               transition-transform duration-700 group-hover:scale-110"
              />

              {/* لایه گرادیان پایین */}
              <div
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none
               bg-gradient-to-t from-black/80 to-transparent 
               rounded-b-2xl transition-all duration-500 
               group-hover:from-black/95"
              ></div>

              {/* نام دسته */}
              <div className="absolute bottom-3 w-full text-center px-2">
                <span
                  className="block text-lg sm:text-xl font-bold text-white drop-shadow-lg tracking-wide 
                     line-clamp-1 transition"
                >
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✨ متن راهنما */}
      <p
        className="text-xs sm:text-sm italic text-center mt-3 opacity-80"
        style={{ color: primaryColor }}
      >
        ← برای دیدن دسته‌بندی‌ها بکشید →
      </p>
    </div>
  );
};

export default FeaturedCategories;
