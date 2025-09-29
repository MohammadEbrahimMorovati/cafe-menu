import { useMemo, useEffect, useRef, useState } from "react";
import { X, Star, Minus, Plus, Coffee } from "lucide-react";
import useBodyFreeze from "../../../../hooks/useBodyFreeze";

// تبدیل اعداد به فرمت فارسی
const formatFA = (n) => Number(n || 0).toLocaleString("fa-IR");

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  useBodyFreeze(isOpen); // قفل کردن اسکرول وقتی مودال باز است

  const dialogRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    dialogRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // مقداردهی پیش‌فرض حتی وقتی product وجود نداره
  const {
    name = "",
    description = "",
    image = "",
    price = 0,
    discount = 0,
    rating = 4.6,
    calories = null,
    origin = "",
    tags = [],
  } = product || {};

  const hasDiscount = discount > 0;
  const finalPrice = useMemo(
    () => (hasDiscount ? Math.round(price - (price * discount) / 100) : price),
    [price, discount]
  );

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("متوسط");
  const [sugar, setSugar] = useState(1);
  const [notes, setNotes] = useState("");

  const total = useMemo(() => finalPrice * qty, [finalPrice, qty]);

  const sugarLabel = (lvl) =>
    lvl === 0 ? "بی‌قند" : lvl === 1 ? "عادی" : "شیرین";
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  const handleAdd = () => {
    onAddToCart?.({
      ...product,
      qty,
      size,
      sugar,
      notes,
      finalPrice,
      total,
    });
    onClose?.();
  };

  // شرط بعد از hooks می‌آید
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-3 md:px-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="w-full max-w-2xl md:max-w-3xl max-h-[92vh] overflow-y-auto overflow-x-hidden no-scrollbar rounded-[28px] shadow-2xl relative border border-amber-100/70 bg-[#fffaf4] ring-1 ring-white/40 animate-[modalIn_220ms_ease-out]"
        style={{
          boxShadow:
            "0 30px 80px rgba(62,44,34,0.35), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {/* ربان تخفیف (داخل کادر) */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-green-600 text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
              {discount}% تخفیف
            </div>
          </div>
        )}

        {/* دکمه بستن */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 md:top-4 md:left-4 
             h-10 w-10 grid place-items-center rounded-full 
             bg-white shadow-md border border-gray-200 
             hover:bg-gray-100 z-50" // 👈 z-50 اضافه شد
          aria-label="بستن"
          title="بستن"
        >
          <X size={20} className="text-gray-800" />
        </button>

        {/* هدر تصویری */}
        <div className="relative overflow-hidden rounded-t-[28px]">
          <div className="w-full h-56 md:h-80 bg-[#f3ebe2]">
            <img
              src={image || "/images/cafe/default.jpg"}
              alt={name}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#fffaf4] via-transparent to-transparent opacity-80" />
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

          {description && (
            <p className="text-[15px] md:text-base leading-7 text-[#5c4330] bg-white/70 rounded-2xl p-3 border border-amber-100/70 shadow-sm mb-4">
              {description}
            </p>
          )}

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

          {/* یادداشت */}
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

          {/* تعداد + جمع کل */}
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

          {/* اکشن اصلی */}
          <div className="mt-4">
            <button
              onClick={handleAdd}
              className="w-full bg-[#3e2c22] text-white font-semibold py-3 rounded-2xl hover:bg-[#5a3f2e] transition-all duration-200 shadow-md"
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>

      {/* استایل‌های تکمیلی */}
      <style>{`
        @keyframes modalIn { from { opacity:0; transform: translateY(10px) scale(.98) } to { opacity:1; transform: translateY(0) scale(1) } }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ProductModal;
