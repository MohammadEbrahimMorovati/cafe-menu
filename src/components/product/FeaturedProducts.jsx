import { useTheme } from "../../contexts/useTheme";
import { Star } from "lucide-react";

const FeaturedProducts = ({ products, title = "محصولات ویژه" }) => {
  const { theme } = useTheme();

  if (!products?.length) return null;

  const scrollToProduct = (categoryId, productId) => {
    const element = document.getElementById(
      `product-${categoryId}-${productId}`
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.warn("❌ Product not found:", categoryId, productId);
    }
  };

  const featured = products.slice(0, 5);
  const primaryColor = theme.primary;

  return (
    <div className="mb-16">
      {/* 🏷 عنوان */}
      <h2
        className="text-2xl sm:text-3xl font-extrabold tracking-widest mb-6 text-center drop-shadow-xl"
        style={{ color: primaryColor }}
      >
        {title}
      </h2>

      {/* 📜 لیست محصولات */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 pb-6" style={{ width: "max-content" }}>
          {featured.map((product) => (
            <div
              key={product.id}
              onClick={() => scrollToProduct(product.category, product.id)}
              className="flex-shrink-0 w-44 h-56 relative cursor-pointer group 
             rounded-2xl overflow-hidden shadow-lg transition-all duration-500 
             hover:ring-2 hover:ring-yellow-400/70"
              style={{ scrollSnapAlign: "center" }}
            >
              {/* تصویر محصول + گرادیان + متن */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover 
                   transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <span className="flex items-center justify-center w-full h-full text-4xl font-bold text-yellow-600">
                    {product.name?.[0] || "?"}
                  </span>
                )}

                {/* لایه گرادیان پایین */}
                <div
                  className="absolute inset-x-0 bottom-0 h-28 pointer-events-none
                 bg-gradient-to-t from-black/80 to-transparent 
                 flex flex-col items-center justify-end 
                 px-3 pb-3 text-center transition-all duration-500 
                 group-hover:from-black/95"
                >
                  <span className="block text-lg sm:text-xl font-bold text-white drop-shadow-lg line-clamp-1">
                    {product.name}
                  </span>
                  <span className="block mt-1 text-xs sm:text-sm text-gray-200 drop-shadow-md line-clamp-1">
                    {product.description || "توضیحات محصول"}
                  </span>
                </div>
              </div>

              {/* بج ویژه */}
              <div className="absolute top-3 left-3 bg-yellow/40 border border-yellow-400 text-yellow-200 text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md backdrop-blur-sm">
                <Star className="w-3 h-3 text-yellow-300" /> ویژه
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ℹ️ متن راهنما */}
      <div className="flex justify-center mt-5">
        <p
          className="text-xs sm:text-sm italic opacity-80 animate-bounce"
          style={{ color: primaryColor }}
        >
          ← برای دیدن محصولات بیشتر بکشید →
        </p>
      </div>
    </div>
  );
};

export default FeaturedProducts;
