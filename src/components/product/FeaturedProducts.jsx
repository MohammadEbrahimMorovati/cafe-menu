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
              onClick={() => scrollToProduct(product.id)}
              className="flex-shrink-0 
             bg-gradient-to-br from-white/70 to-white/30 
             backdrop-blur-lg border border-white/20 
             rounded-xl p-4 shadow-md hover:shadow-2xl 
             hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ minWidth: "160px" }}
            >
              {/* تصویر محصول */}
              <div className="w-24 h-24 bg-white/40 rounded-lg mb-3 flex items-center justify-center mx-auto overflow-hidden">
                {product.image ? (
                  <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-700">
                    {product.name?.[0] || "?"}
                  </span>
                )}
              </div>

              {/* نام محصول */}
              <h3 className="text-sm font-semibold text-center mb-1 text-gray-800 line-clamp-2">
                {product.name}
              </h3>

              {/* تگ ویژه */}
              <div className="text-center">
                <span className="px-2 py-1 bg-yellow-400/80 text-xs rounded-full text-white font-bold shadow">
                  ⭐ ویژه
                </span>
              </div>
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
