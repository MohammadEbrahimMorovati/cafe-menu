const ProductCard = ({ product }) => {
  if (!product) return null;

  const { name, description, price, discount = 0, image } = product;

  const hasDiscount = discount > 0;
  const formattedPrice = Number(price).toLocaleString("fa-IR");
  const formattedFinalPrice = (price - (price * discount) / 100).toLocaleString(
    "fa-IR"
  );

  return (
    <div className="relative rounded-xl overflow-hidden shadow-md group">
      {/* تصویر محصول */}
      <img
        src={`/images/${image || "cat-default.jpg"}`}
        alt={name}
        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => (e.currentTarget.src = "/images/cat-default.jpg")}
      />

      {/* لایه گرادیان قوی‌تر پشت متن */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>

      {/* اطلاعات محصول */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-3 text-white">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        {description && (
          <p className="text-sm opacity-90 mb-2 line-clamp-2">{description}</p>
        )}

        {/* 💲 قیمت */}
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-red-300 line-through text-sm">
                {formattedPrice} تومان
              </span>
              <span className="px-2 py-0.5 bg-green-600/90 rounded-lg text-sm font-bold">
                {formattedFinalPrice} تومان
              </span>
            </>
          ) : (
            <span className="px-2 py-0.5 bg-yellow-500/90 rounded-lg text-sm font-bold">
              {formattedPrice} تومان
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
