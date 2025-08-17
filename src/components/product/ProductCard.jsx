import { calculateFinalPrice } from "../../services/products/productService";
// 📦 تابعی برای محاسبه قیمت نهایی بعد از تخفیف

import { useTheme } from "../../contexts/useTheme";
// 🎨 گرفتن رنگ‌ها و استایل تم

// 📌 تابع برای ساخت مسیر عکس از public
const getImagePath = (image) => {
  if (!image) return "/images/cat-default.jpg"; // fallback
  return `/images/${image}`;
};

// 📌 کارت محصول
const ProductCard = ({ product, showImage = true }) => {
  const { theme } = useTheme(); // 🎨 دریافت رنگ‌های تم

  // 📦 گرفتن جزئیات محصول از props
  const { id, name, description, price, discount = 0, image } = product;

  // 📌 بررسی وجود تخفیف
  const hasDiscount = discount > 0;

  // 💲 قالب‌بندی قیمت‌ها به فرمت فارسی
  const formattedPrice = price.toLocaleString("fa-IR");
  const formattedFinalPrice = calculateFinalPrice(
    price,
    discount
  ).toLocaleString("fa-IR");

  // 📌 بخش نمایش قیمت (با یا بدون تخفیف)
  const priceSection = hasDiscount ? (
    <>
      {/* قیمت قبلی خط‌خورده */}
      <span className="text-red-500 line-through text-sm">
        {formattedPrice} تومان
      </span>
      {/* قیمت نهایی با رنگ سبز */}
      <span className="text-green-600 font-bold">
        {formattedFinalPrice} تومان
      </span>
    </>
  ) : (
    // اگر تخفیف ندارد، فقط قیمت اصلی را نمایش بده
    <span className="font-bold" style={{ color: theme.primary }}>
      {formattedPrice} تومان
    </span>
  );

  return (
    <div
      id={`product-section-${id}`} // شناسه یکتا برای اسکرول یا دسترسی DOM
      className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
    >
      {/* 📝 متن و اطلاعات محصول */}
      <div className="flex-1">
        <h3 className="font-bold text-lg mb-1" style={{ color: theme.primary }}>
          {name}
        </h3>
        <p className="text-sm opacity-80 mb-2" style={{ color: theme.primary }}>
          {description}
        </p>
        <div className="flex items-center gap-2">{priceSection}</div>
      </div>

      {/* 🖼 عکس محصول */}
      {showImage && (
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center ml-4 overflow-hidden">
          <img
            src={getImagePath(image)}
            alt={name}
            className="w-full h-full object-contain"
            onError={(e) => (e.currentTarget.src = "/images/cat-default.jpg")}
          />
        </div>
      )}
    </div>
  );
};

export default ProductCard; // 📤 خروجی گرفتن کامپوننت برای استفاده در بخش‌های دیگر
