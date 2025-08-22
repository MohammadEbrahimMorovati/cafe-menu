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
  const primaryColor = theme.primary;

  return (
    <div className="mb-8">
      {/* 🏷 عنوان بخش */}
      <h2
        className="text-xl font-bold mb-6 text-center tracking-wide"
        style={{ color: primaryColor }}
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
              backdrop-blur-md bg-white/20 border-2 border-yellow-400/60
              shadow-lg hover:shadow-2xl hover:scale-105 
              transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* بج ویژه */}
              <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow">
                <Star className="w-3 h-3" /> ویژه
              </div>

              {/* تصویر محصول */}
              <div className="w-full h-32 bg-white/40 flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-700">
                    {product.name?.[0] || "?"}
                  </span>
                )}
              </div>

              {/* اطلاعات محصول */}
              <div className="p-3 text-center">
                <h3 className="text-base font-semibold text-yellow-700 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {product.description || "توضیحات محصول"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ℹ️ متن راهنمای اسکرول */}
      <div className="flex justify-center mt-3">
        <div className="text-xs opacity-70" style={{ color: primaryColor }}>
          ← برای دیدن محصولات بیشتر بکشید 😊 →
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
