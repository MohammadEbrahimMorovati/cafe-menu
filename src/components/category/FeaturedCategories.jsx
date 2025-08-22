import { useTheme } from "../../contexts/useTheme";

const FeaturedCategories = ({ categories, title = "دسته‌بندی‌ها" }) => {
  const { theme } = useTheme();
  const primaryColor = theme.primary;

  if (!categories?.length) return null;

  // 📌 تابع اسکرول نرم به سکشن دسته محصول
  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(`category-section-${categoryId}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="mb-12">
      {/* 🏷 عنوان */}
      <h2
        className="text-2xl font-extrabold mb-6 text-center"
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
                src={`/images/${cat.image}`}
                alt={cat.name}
                className="w-full h-full object-cover rounded-2xl shadow-xl 
                           transition-transform duration-700 group-hover:scale-110"
              />

              {/* لایه گرادیان پایین */}
              <div
                className="absolute inset-x-0 bottom-0 h-24 
                              bg-gradient-to-t from-black/80 to-transparent 
                              rounded-b-2xl"
              ></div>

              {/* نام دسته */}
              <div className="absolute bottom-3 w-full text-center">
                <span className="text-white font-bold text-lg drop-shadow-lg tracking-wide">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✨ متن راهنما */}
      <p
        className="text-center text-sm mt-3 opacity-70"
        style={{ color: primaryColor }}
      >
        ← برای دیدن دسته‌بندی‌ها بکشید →
      </p>
    </div>
  );
};

export default FeaturedCategories;
