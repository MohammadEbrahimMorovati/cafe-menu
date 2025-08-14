import { useTheme } from "../../contexts/useTheme";

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
    <div className="mb-6">
      <h2
        className="text-lg font-bold mb-4 text-center"
        style={{ color: primaryColor }}
      >
        {title}
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
          {featured.map((product) => (
            <div
              key={product.id}
              onClick={() => scrollToProduct(product.id)}
              className="flex-shrink-0 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
              style={{ minWidth: "140px", borderColor: primaryColor }}
            >
              {/* تصویر یا حرف اول نام محصول */}
              <div className="w-20 h-20 bg-gray-100 rounded-lg mb-3 flex items-center justify-center mx-auto overflow-hidden">
                {product.image ? (
                  <img
                    src={`URL_TO_IMAGES/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span
                    className="text-2xl font-bold"
                    style={{ color: primaryColor }}
                  >
                    {product.name?.[0] || "?"}
                  </span>
                )}
              </div>

              {/* نام محصول */}
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

      <div className="flex justify-center mt-2">
        <div className="text-xs opacity-60" style={{ color: primaryColor }}>
          ← برای دیدن محصولات بیشتر بکشید 😊 →
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
