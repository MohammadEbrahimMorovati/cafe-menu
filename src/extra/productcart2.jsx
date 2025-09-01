<div
  className="
    bg-[#fffaf0] rounded-xl border border-yellow-200 shadow-sm overflow-hidden
    flex flex-col h-full   /* موبایل: پر کن تا کارت‌ها هم‌قد بشن */
    md:flex-row md:h-auto  /* دسکتاپ: ارتفاع اتوماتیک */
  "
>
  {/* تصویر */}
  <div className="w-full h-32 md:w-28 md:h-28 flex-shrink-0 md:order-2">
    <img
      src={`${image || "cat-default.jpg"}`}
      alt={name}
      className="w-full h-full object-cover"
      onError={(e) => (e.currentTarget.src = "/images/cat-default.jpg")}
    />
  </div>

  {/* متن */}
  <div className="p-3 flex flex-col flex-1 justify-between md:pr-4">
    <div>
      <h3 className="font-bold text-base mb-1 text-gray-800">{name}</h3>
      {description && (
        <p className="text-xs text-gray-600 mb-2">{description}</p>
      )}
    </div>

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
</div>;
