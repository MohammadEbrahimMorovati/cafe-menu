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
        className="text-2xl font-title font-extrabold mb-6 text-center tracking-wide"
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
              className="flex-shrink-0 w-44 h-56 relative cursor-pointer group"
              style={{ scrollSnapAlign: "center" }}
            >
              {/* تصویر دسته */}
              <img
                src={`${cat.image}`}
                alt={cat.name}
                className="w-full h-full object-cover rounded-2xl shadow-lg 
                           transition-transform duration-700 group-hover:scale-110"
              />

              {/* لایه گرادیان پایین */}
              <div
                className="absolute inset-x-0 bottom-0 h-24 
                              bg-gradient-to-t from-black/90 to-transparent 
                              rounded-b-2xl transition-all duration-500 
                              group-hover:from-black/95"
              ></div>

              {/* نام دسته */}
              <div className="absolute bottom-3 w-full text-center">
                <span className="font-title text-white text-lg font-bold drop-shadow-lg tracking-wide px-2 py-1 bg-black/40 rounded-md group-hover:bg-black/70 transition">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✨ متن راهنما */}
      <p
        className="text-center text-sm mt-3 opacity-70 font-body"
        style={{ color: primaryColor }}
      >
        ← برای دیدن دسته‌بندی‌ها بکشید →
      </p>
    </div>
  );
};

export default FeaturedCategories;
