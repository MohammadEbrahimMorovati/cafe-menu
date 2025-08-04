const FeaturedProducts = ({ products, title = "محصولات ویژه" }) => {
  // تابع اسکرول به سکشن محصول
  const scrollToProduct = (productId) => {
    const element = document.getElementById(`product-section-${productId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  // فقط ۵ محصول اول
  const featured = products.slice(0, 5);

  return (
    <div className="mb-6">
      <h2 className="text-[#613A27] text-lg font-bold mb-4 text-center">
        {title}
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
          {featured.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-[#613A27] min-w-[140px]"
              onClick={() => scrollToProduct(product.id)}
            >
              {/* عکس محصول */}
              <div className="w-20 h-20 bg-gray-100 rounded-lg mb-3 flex items-center justify-center mx-auto overflow-hidden">
                {product.image ? (
                  <img
                    src={`URL_TO_IMAGES/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-[#613A27] text-2xl font-bold">
                    {/* اولین حرف اسم محصول */}
                    {product.name?.[0] || "?"}
                  </span>
                )}
              </div>
              {/* نام محصول */}
              <h3 className="text-[#613A27] text-sm font-medium text-center mb-2 line-clamp-2">
                {product.name}
              </h3>
              {/* (می‌تونی قیمت یا توضیحات کوتاه هم اضافه کنی) */}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <div className="text-[#613A27] text-xs opacity-60">
          ← برای دیدن محصولات بیشتر بکشید 😊 →
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
