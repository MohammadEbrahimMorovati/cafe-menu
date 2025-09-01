"use client";
import { useTheme } from "../../contexts/useTheme";
import { Star } from "lucide-react"; // 📦 آیکون ستاره برای بج ویژه

// 📌 کامپوننت محصولات ویژه
const FeaturedProducts = ({ products, title = "محصولات ویژه" }) => {
  const { theme } = useTheme();

  if (!products?.length) return null;

  const scrollToProduct = (productId) => {
    const element = document.getElementById(`product-section-${productId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const featured = products.slice(0, 5);

  return (
    <div className="mb-8">
      {/* 🏷 عنوان بخش */}
      <h2
        className="text-xl font-title font-extrabold mb-6 text-center tracking-wide"
        style={{ color: theme.primary }}
      >
        {title}
      </h2>

      {/* 📜 لیست محصولات به صورت اسکرولی افقی */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 pb-3" style={{ width: "max-content" }}>
          {featured.map((product) => (
            <div
              key={product.id}
              onClick={() => scrollToProduct(product.id)}
              className="relative flex-shrink-0 w-48 rounded-2xl 
                         backdrop-blur-md shadow-lg hover:shadow-2xl hover:scale-105 
                         transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                border: `2px solid ${theme.borderColor}`,
                backgroundColor: theme.cardBg,
              }}
            >
              {/* بج ویژه */}
              <div
                className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow font-body"
                style={{
                  backgroundColor: theme.featuredBadgeBg,
                  color: theme.featuredBadgeText,
                }}
              >
                <Star className="w-3 h-3" /> ویژه
              </div>

              {/* تصویر محصول */}
              <div
                className="w-full h-32 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: theme.secondary }}
              >
                {product.image ? (
                  <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                  />
                ) : (
                  <span
                    className="text-2xl font-title font-bold"
                    style={{ color: theme.textPrimary }}
                  >
                    {product.name?.[0] || "?"}
                  </span>
                )}
              </div>

              {/* اطلاعات محصول */}
              <div className="p-3 text-center">
                <h3
                  className="text-base font-title font-bold mb-1 line-clamp-1"
                  style={{ color: theme.productTitle }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-xs line-clamp-2 font-body"
                  style={{ color: theme.productDescription }}
                >
                  {product.description || "توضیحات محصول"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ℹ️ متن راهنمای اسکرول */}
      <div className="flex justify-center mt-3">
        <div
          className="text-xs opacity-70 font-body"
          style={{ color: theme.primary }}
        >
          ← برای دیدن محصولات بیشتر بکشید 😊 →
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
