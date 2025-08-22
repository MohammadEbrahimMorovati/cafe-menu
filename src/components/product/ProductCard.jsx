const ProductCard = ({ product }) => {
  if (!product) return null;

  const { name, description, price, discount = 0, image } = product;

  const hasDiscount = discount > 0;
  const formattedPrice = Number(price).toLocaleString("fa-IR");
  const formattedFinalPrice = (price - (price * discount) / 100).toLocaleString(
    "fa-IR"
  );

  return (
    <div
      className="
        bg-[#fffaf0] rounded-xl border border-yellow-200 shadow-sm overflow-hidden
        flex flex-col
        md:flex-row md:items-center md:justify-between
      "
    >
      {/* تصویر بالا در موبایل - سمت راست در دسکتاپ */}
      <div className="w-full h-32 md:w-28 md:h-28 flex-shrink-0 md:order-2">
        <img
          src={`/images/${image || "cat-default.jpg"}`}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = "/images/cat-default.jpg")}
        />
      </div>

      {/* متن سمت چپ */}
      <div className="p-3 flex flex-col flex-1 justify-between md:pr-4">
        <h3 className="font-bold text-base mb-1 text-gray-800">{name}</h3>
        {description && (
          <p className="text-xs text-gray-600 mb-2">{description}</p>
        )}

        {/* 💲 قیمت */}
        <div className="flex items-center gap-2 mt-auto">
          {hasDiscount ? (
            <>
              <span className="text-red-500 line-through text-sm">
                {formattedPrice} تومان
              </span>
              <span className="px-2 py-0.5 bg-green-600 text-white rounded-lg text-sm font-bold">
                {formattedFinalPrice} تومان
              </span>
            </>
          ) : (
            <span className="px-2 py-0.5 bg-yellow-500 text-white rounded-lg text-sm font-bold">
              {formattedPrice} تومان
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
