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
  const primaryColor = theme.primary;

  return (
    <div className="mb-16">
      {/* 🏷 عنوان لوکس */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className="h-px w-20 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        <h2
          className="text-2xl sm:text-3xl font-extrabold tracking-widest text-center drop-shadow-xl"
          style={{ color: primaryColor }}
        >
          ✨ {title} ✨
        </h2>
        <span className="h-px w-20 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
      </div>

      {/* 📜 لیست محصولات */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 pb-6" style={{ width: "max-content" }}>
          {featured.map((product) => (
            <div
              key={product.id}
              onClick={() => scrollToProduct(product.id)}
              className="group relative flex-shrink-0 w-56 rounded-3xl 
              overflow-hidden cursor-pointer
              border border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)]
              hover:shadow-[0_0_35px_rgba(250,204,21,0.4)]
              transform hover:-translate-y-3 transition-all duration-500"
            >
              {/* تصویر محصول */}
              <div className="relative w-full h-56 flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 
                      group-hover:scale-110"
                  />
                ) : (
                  <span className="text-4xl font-bold text-yellow-600">
                    {product.name?.[0] || "?"}
                  </span>
                )}

                {/* لایه گرادیان پایین + متن */}
                <div
                  className="absolute inset-x-0 bottom-0 h-28 
                  bg-gradient-to-t from-black/80 to-transparent 
                  rounded-b-2xl flex flex-col items-center justify-end 
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
              <div className="absolute top-3 left-3 bg-white/70 border border-yellow-400 text-yellow-600 text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md backdrop-blur-sm">
                <Star className="w-3 h-3 text-yellow-500" /> ویژه
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ℹ️ متن راهنما */}
      <div className="flex justify-center mt-5">
        <div
          className="text-xs sm:text-sm italic opacity-80 animate-bounce"
          style={{ color: primaryColor }}
        >
          ← برای دیدن محصولات بیشتر بکشید →
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
