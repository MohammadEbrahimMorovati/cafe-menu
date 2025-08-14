import { useTheme } from "../../contexts/useTheme"; 
// 🎨 هوک سفارشی برای دریافت رنگ‌ها و تنظیمات تم

// 📌 کامپوننت محصولات ویژه
const FeaturedProducts = ({ products, title = "محصولات ویژه" }) => {
  const { theme } = useTheme(); // 🎨 دریافت رنگ‌ها از تم

  // ⛔ اگر آرایه محصولات خالی یا undefined باشد، نمایش نده
  if (!products?.length) return null;

  // 📌 تابع اسکرول نرم به سکشن محصول موردنظر
  const scrollToProduct = (productId) => {
    const element = document.getElementById(`product-section-${productId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // 📌 گرفتن ۵ محصول اول به عنوان محصولات ویژه
  const featured = products.slice(0, 5);

  // 🎨 رنگ اصلی تم
  const primaryColor = theme.primary;

  return (
    <div className="mb-6">
      {/* 🏷 عنوان بخش */}
      <h2
        className="text-lg font-bold mb-4 text-center"
        style={{ color: primaryColor }}
      >
        {title}
      </h2>

      {/* 📜 لیست محصولات به صورت اسکرولی افقی */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
          {featured.map((product) => (
            <div
              key={product.id}
              onClick={() => scrollToProduct(product.id)} // کلیک برای اسکرول به محصول
              className="flex-shrink-0 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
              style={{ minWidth: "140px", borderColor: primaryColor }}
            >
              {/* 🖼 تصویر محصول یا حرف اول نام محصول */}
              <div className="w-20 h-20 bg-gray-100 rounded-lg mb-3 flex items-center justify-center mx-auto overflow-hidden">
                {product.image ? (
                  // اگر تصویر محصول وجود دارد
                  <img
                    src={`URL_TO_IMAGES/${product.image}`} // مسیر تصویر
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  // اگر تصویر وجود ندارد، حرف اول نام محصول یا ؟ نمایش داده می‌شود
                  <span
                    className="text-2xl font-bold"
                    style={{ color: primaryColor }}
                  >
                    {product.name?.[0] || "?"}
                  </span>
                )}
              </div>

              {/* 🏷 نام محصول */}
              <h3
                className="text-sm font-medium text-center mb-2 line-clamp-2"
                style={{ color: primaryColor }}
              >
                {product.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ℹ️ متن راهنمای اسکرول */}
      <div className="flex justify-center mt-2">
        <div className="text-xs opacity-60" style={{ color: primaryColor }}>
          ← برای دیدن محصولات بیشتر بکشید 😊 →
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts; // 📤 خروجی گرفتن برای استفاده در پروژه
