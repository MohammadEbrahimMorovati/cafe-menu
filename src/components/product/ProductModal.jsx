// import { X } from "lucide-react";

// const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
//   if (!isOpen || !product) return null;

//   const { name, description, image, price, discount = 0 } = product;
//   const hasDiscount = discount > 0;
//   const finalPrice = hasDiscount ? price - (price * discount) / 100 : price;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
//       <div className="bg-[#fffaf4] w-full max-w-md rounded-3xl shadow-xl overflow-hidden relative animate-fadeIn border border-white/30">
//         {/* دکمه بستن */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-brown-800/70 hover:text-red-500 transition"
//         >
//           <X size={24} />
//         </button>

//         {/* عکس محصول */}
//         <div className="w-full h-60 bg-[#f3ebe2]">
//           <img
//             src={image || "cat-default.jpg"}
//             alt={name}
//             className="w-full h-full object-cover object-center"
//           />
//         </div>

//         {/* اطلاعات محصول */}
//         <div className="p-6 text-center">
//           <h2 className="text-2xl font-extrabold text-[#3e2c22] mb-2">
//             {name}
//           </h2>

//           {description && (
//             <p className="text-sm text-[#5c4330] mb-4 leading-relaxed">
//               {description}
//             </p>
//           )}

//           {/* قیمت */}
//           <div className="mb-6">
//             {hasDiscount ? (
//               <div className="flex justify-center items-center gap-3">
//                 <span className="line-through text-gray-400 text-sm">
//                   {price.toLocaleString("fa-IR")} تومان
//                 </span>
//                 <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
//                   {finalPrice.toLocaleString("fa-IR")} تومان
//                 </span>
//               </div>
//             ) : (
//               <span className="bg-yellow-400 text-[#3e2c22] px-3 py-1 rounded-full text-sm">
//                 {price.toLocaleString("fa-IR")} تومان
//               </span>
//             )}
//           </div>

//           {/* دکمه افزودن به سبد خرید */}
//           <button
//             onClick={() => {
//               onAddToCart(product);
//               onClose();
//             }}
//             className="w-full bg-[#3e2c22] text-white font-semibold py-2.5 rounded-xl hover:bg-[#5a3f2e] transition-all duration-200 shadow-sm"
//           >
//             افزودن به سبد خرید
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;
import { useEffect, useMemo, useRef, useState } from "react";
import { X, Star, Heart, Minus, Plus, Coffee } from "lucide-react";

const formatFA = (n) => Number(n || 0).toLocaleString("fa-IR");

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  const {
    name,
    description,
    image,
    price = 0,
    discount = 0,
    rating = 4.6,
    calories,
    origin,
    tags = [],
  } = product;

  const hasDiscount = discount > 0;
  const finalPrice = useMemo(
    () => (hasDiscount ? Math.round(price - (price * discount) / 100) : price),
    [price, discount, hasDiscount]
  );

  // UI state
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("متوسط");
  const [sugar, setSugar] = useState(1); // 0 بی‌قند، 1 عادی، 2 شیرین
  const [notes, setNotes] = useState("");
  const total = useMemo(() => finalPrice * qty, [finalPrice, qty]);

  // Accessibility & UX
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // قفل اسکرول پشت‌زمینه
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // فوکوس اولیه
      dialogRef.current?.focus();
      const onKey = (e) => {
        if (e.key === "Escape") onClose?.();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev || "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [isOpen, onClose]);

  const handleAdd = () => {
    const payload = {
      ...product,
      qty,
      size,
      sugar,
      notes,
      finalPrice,
      total,
    };
    onAddToCart?.(payload);
    onClose?.();
  };

  const sugarLabel = (lvl) =>
    lvl === 0 ? "بی‌قند" : lvl === 1 ? "عادی" : "شیرین";

  // ستاره‌ها
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-3 md:px-6"
      onMouseDown={(e) => {
        // کلیک روی اوورلی ببنده
        if (e.target === e.currentTarget) onClose?.();
      }}
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="
          w-full max-w-2xl md:max-w-3xl
          max-h-[92vh] overflow-y-auto
          rounded-[28px] shadow-2xl relative
          border border-amber-100/70
          bg-[#fffaf4]
          ring-1 ring-white/40
          animate-[modalIn_220ms_ease-out]
        "
        style={{
          boxShadow:
            "0 30px 80px rgba(62,44,34,0.35), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {/* ربان تخفیف */}
        {hasDiscount && (
          <div className="absolute -top-3 -left-3 z-10">
            <div className="bg-green-600 text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
              {discount}% تخفیف
            </div>
          </div>
        )}

        {/* دکمه بستن */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 md:top-4 md:left-4 h-10 w-10 grid place-items-center rounded-full bg-white/80 hover:bg-white shadow-md border border-white/60 transition"
          aria-label="بستن"
          title="بستن"
        >
          <X size={20} className="text-[#3e2c22]" />
        </button>

        {/* هدر تصویری */}
        <div className="relative">
          <div className="w-full h-56 md:h-80 bg-[#f3ebe2]">
            <img
              src={image || "/images/cafe/default.jpg"}
              alt={name}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>

          {/* حلقه نور دور تصویر */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#fffaf4] via-transparent to-transparent opacity-80" />
          {/* نشان ویژه/سیگنچر در گوشه */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <div className="bg-white/85 backdrop-blur px-3 py-1.5 rounded-full border border-amber-100 shadow">
              <div className="flex items-center gap-1.5 text-[#5c4330] text-xs md:text-sm">
                <Coffee size={16} />
                <span>امضای مورو</span>
              </div>
            </div>
          </div>
        </div>

        {/* بدنه اطلاعات */}
        <div className="p-4 md:p-6 lg:p-8">
          {/* عنوان و امتیاز */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
            <h2
              id="product-modal-title"
              className="text-2xl md:text-3xl font-extrabold text-[#3e2c22] tracking-wide"
            >
              {name}
            </h2>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
                {halfStar && <Star size={18} className="text-amber-400" />}
              </div>
              <span className="text-sm text-[#5c4330]/80">
                {rating?.toFixed?.(1) ?? "4.6"}
              </span>
            </div>
          </div>

          {/* متادیتا (اختیاری) */}
          {(origin || calories) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {origin && (
                <span className="text-xs md:text-sm text-[#5c4330] bg-amber-50 border border-amber-100 rounded-full px-2.5 py-1">
                  خاستگاه: {origin}
                </span>
              )}
              {calories && (
                <span className="text-xs md:text-sm text-[#5c4330] bg-amber-50 border border-amber-100 rounded-full px-2.5 py-1">
                  {formatFA(calories)} کیلوکالری
                </span>
              )}
            </div>
          )}

          {/* توضیحات */}
          {description && (
            <p className="text-[15px] md:text-base leading-7 text-[#5c4330] bg-white/70 rounded-2xl p-3 border border-amber-100/70 shadow-sm mb-4">
              {description}
            </p>
          )}

          {/* تگ‌ها */}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {tags.slice(0, 6).map((t, i) => (
                <span
                  key={i}
                  className="text-xs text-[#5c4330] bg-[#f8efe6] border border-amber-100 px-2.5 py-1 rounded-full"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* قیمت */}
          <div className="mb-5">
            {hasDiscount ? (
              <div className="flex items-center gap-3">
                <span className="line-through text-gray-400 text-sm">
                  {formatFA(price)} تومان
                </span>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  {formatFA(finalPrice)} تومان
                </span>
              </div>
            ) : (
              <span className="bg-amber-300/90 text-[#3e2c22] px-3 py-1 rounded-full text-sm">
                {formatFA(price)} تومان
              </span>
            )}
          </div>

          {/* گزینه‌ها */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* سایز */}
            <div className="bg-white/80 rounded-2xl border border-amber-100 p-3 shadow-sm">
              <div className="text-sm font-semibold text-[#3e2c22] mb-2">
                سایز
              </div>
              <div className="flex items-center gap-2">
                {["کوچک", "متوسط", "بزرگ"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1.5 rounded-xl border text-sm transition ${
                      size === s
                        ? "bg-[#3e2c22] text-white border-[#3e2c22]"
                        : "bg-white text-[#3e2c22] border-amber-200 hover:border-amber-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* میزان شیرینی */}
            <div className="bg-white/80 rounded-2xl border border-amber-100 p-3 shadow-sm">
              <div className="text-sm font-semibold text-[#3e2c22] mb-2">
                میزان شیرینی
              </div>
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSugar(lvl)}
                    className={`px-3 py-1.5 rounded-xl border text-sm transition ${
                      sugar === lvl
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-white text-[#3e2c22] border-amber-200 hover:border-amber-300"
                    }`}
                  >
                    {sugarLabel(lvl)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* یادداشت برای باریستا */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-[#3e2c22] mb-2 block">
              یادداشت برای باریستا (اختیاری)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثلاً: با شیر بادام / بدون یخ / شدت روست متوسط"
              className="w-full rounded-2xl border border-amber-200 bg-white/80 p-3 text-sm text-[#3e2c22] placeholder:text-[#3e2c22]/40 focus:outline-none focus:ring-2 focus:ring-amber-300"
              rows={3}
            />
          </div>

          {/* کنترل تعداد + جمع کل */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#3e2c22]/80">تعداد</span>
              <div className="flex items-center rounded-xl border border-amber-200 bg-white/80">
                <button
                  className="p-2 hover:bg-amber-50 rounded-l-xl disabled:opacity-30"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="کاهش تعداد"
                >
                  <Minus size={18} />
                </button>
                <div className="px-4 min-w-10 text-center font-semibold text-[#3e2c22]">
                  {formatFA(qty)}
                </div>
                <button
                  className="p-2 hover:bg-amber-50 rounded-r-xl"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="افزایش تعداد"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="text-sm md:text-base text-[#3e2c22]">
              جمع کل:{" "}
              <span className="font-extrabold">{formatFA(total)} تومان</span>
            </div>
          </div>

          {/* اکشن‌ها */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleAdd}
              className="flex-1 bg-[#3e2c22] text-white font-semibold py-3 rounded-2xl hover:bg-[#5a3f2e] transition-all duration-200 shadow-md"
            >
              افزودن به سبد خرید
            </button>

            <button
              type="button"
              className="h-[52px] w-[52px] grid place-items-center rounded-2xl border border-amber-200 bg-white/90 hover:bg-amber-50 transition shadow"
              aria-label="افزودن به علاقه‌مندی‌ها"
              title="افزودن به علاقه‌مندی‌ها"
            >
              <Heart size={20} className="text-[#3e2c22]" />
            </button>
          </div>
        </div>
      </div>

      {/* انیمیشن کلیدی (Tailwind arbitrary) */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(10px) scale(.98); }
          to   { opacity: 1; transform: translateY(0)     scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ProductModal;
