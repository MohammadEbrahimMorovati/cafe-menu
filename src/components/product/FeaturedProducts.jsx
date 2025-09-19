"use client";
import { useTheme } from "../../contexts/useTheme";
import { Star } from "lucide-react";

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
    <div className="mb-10">
      {/* 🏷 عنوان بخش */}
      <h2
        className="text-2xl font-title font-extrabold mb-6 text-center tracking-wide relative after:block after:w-20 after:h-0.5 after:bg-gradient-to-r after:from-yellow-400 after:to-red-400 after:mx-auto after:mt-2"
        style={{ color: theme.primary_color }}
      >
        {title}
      </h2>

      {/* 📜 لیست محصولات */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 pb-3" style={{ width: "max-content" }}>
          {featured.map((product) => (
            <div
              key={product.id}
              onClick={() => scrollToProduct(product.id)}
              className="relative flex-shrink-0 w-48 rounded-2xl bg-opacity-80 backdrop-blur-md 
                         shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 
                         cursor-pointer overflow-hidden group border border-white/20"
              style={{
                backgroundColor: theme.cardBg,
              }}
            >
              {/* بج ویژه */}
              <div
                className="absolute top-2 left-2 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 
                           shadow font-body font-semibold bg-[#FFD700] text-black"
              >
                <Star className="w-3.5 h-3.5" />
                ویژه
              </div>

              {/* تصویر محصول */}
              <div
                className="w-full h-32 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: theme.secondary_color }}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                <h3 className="text-base font-title font-bold mb-1 line-clamp-1 bg-gradient-to-r from-amber-700 via-yellow-600 to-orange-500 bg-clip-text text-transparent">
                  {product.name}
                </h3>
                <p className="text-xs line-clamp-2 font-body text-[#3e2c22] opacity-80">
                  {product.description || "توضیحات محصول"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ℹ️ متن راهنمای اسکرول */}
      <div className="flex justify-center mt-4">
        <div
          className="flex items-center gap-2 text-xs opacity-70 font-body"
          style={{ color: theme.primary_color }}
        >
          <span>←</span> برای دیدن محصولات بیشتر بکشید <span>→</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
