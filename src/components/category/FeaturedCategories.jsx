import { getCategoryIcon } from "../../constants";
import { useTheme } from "../../contexts/useTheme";

const FeaturedCategories = ({ categories, title = "دسته‌بندی‌ها" }) => {
  const { theme } = useTheme();

  if (!categories?.length) return null;

  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(`category-section-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const primaryColor = theme.primary;

  return (
    <div className="mb-6">
      {/* عنوان سکشن */}
      <h2
        className="text-lg font-bold mb-4 text-center"
        style={{ color: primaryColor }}
      >
        {title}
      </h2>

      {/* لیست اسکرولی دسته‌ها */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
          {categories.map(({ id, name, image }) => (
            <div
              key={id}
              onClick={() => scrollToCategory(id)}
              className="flex-shrink-0 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
              style={{
                minWidth: "120px",
                borderColor: "transparent",
              }}
            >
              {/* تصویر یا آیکون */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg mb-3 flex items-center justify-center mx-auto overflow-hidden">
                {image ? (
                  <img
                    src={`URL_TO_IMAGES/${image}`}
                    alt={name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-2xl" style={{ color: primaryColor }}>
                    {getCategoryIcon(id)}
                  </span>
                )}
              </div>

              {/* نام دسته */}
              <h3
                className="text-sm font-medium text-center mb-2 line-clamp-2"
                style={{ color: primaryColor }}
              >
                {name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* متن راهنمای اسکرول */}
      <div className="flex justify-center mt-2">
        <div className="text-xs opacity-60" style={{ color: primaryColor }}>
          ← برای دیدن دسته‌بندی‌های بیشتر بکشید 😊 →
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
