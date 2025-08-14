import { getCategoryIcon } from "../../constants";
// 📦 تابعی برای گرفتن آیکون دسته‌بندی بر اساس id

import { useTheme } from "../../contexts/useTheme";
// 🎨 هوک سفارشی برای گرفتن رنگ‌ها و تنظیمات تم

// 📌 کامپوننت دسته‌بندی‌های ویژه
const FeaturedCategories = ({ categories, title = "دسته‌بندی‌ها" }) => {
  const { theme } = useTheme(); // گرفتن اطلاعات تم فعلی
  const primaryColor = theme.primary; // 🎨 رنگ اصلی تم

  // ⛔ اگر لیست دسته‌بندی خالی یا undefined باشد، چیزی نمایش نمی‌دهیم
  if (!categories?.length) return null;

  // 📌 تابع برای اسکرول نرم به سکشن دسته‌بندی
  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(`category-section-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="mb-6">
      {/* 🏷 عنوان بخش */}
      <h2
        className="text-lg font-bold mb-4 text-center"
        style={{ color: primaryColor }}
      >
        {title}
      </h2>

      {/* 📜 لیست افقی دسته‌بندی‌ها */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
          {categories.map(({ id, name, image }) => (
            <div
              key={id}
              onClick={() => scrollToCategory(id)} // کلیک برای اسکرول به دسته
              className="flex-shrink-0 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
              style={{
                minWidth: "120px",
                borderColor: "transparent",
              }}
            >
              {/* 🖼 نمایش تصویر یا آیکون */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg mb-3 flex items-center justify-center mx-auto overflow-hidden">
                {image ? (
                  // 📷 اگر تصویر وجود دارد
                  <img
                    src={`URL_TO_IMAGES/${image}`} // مسیر تصویر دسته‌بندی
                    alt={name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  // 🔤 اگر تصویر نبود، آیکون پیش‌فرض
                  <span className="text-2xl" style={{ color: primaryColor }}>
                    {getCategoryIcon(id)}
                  </span>
                )}
              </div>

              {/* 🏷 نام دسته */}
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

      {/* ℹ️ متن راهنمای اسکرول */}
      <div className="flex justify-center mt-2">
        <div className="text-xs opacity-60" style={{ color: primaryColor }}>
          ← برای دیدن دسته‌بندی‌های بیشتر بکشید 😊 →
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories; // 📤 خروجی گرفتن کامپوننت
