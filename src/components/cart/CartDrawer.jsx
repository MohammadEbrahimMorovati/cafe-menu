// "use client";
// import { useState } from "react";
// import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
// import { useCart } from "../../contexts/CartContext";

// export default function CartDrawer() {
//   const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
//   const [isOpen, setIsOpen] = useState(false);

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

//   return (
//     <>
//       {/* دکمه شناور */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-gradient-to-br from-yellow-400 to-yellow-600 text-brown-900 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50"
//       >
//         <ShoppingCart className="w-6 h-6" />
//         {cartItems.length > 0 && (
//           <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
//             {cartItems.length}
//           </span>
//         )}
//       </button>

//       {/* بک‌دراپ */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeIn"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* پنل کشویی */}
//       <div
//         className={`fixed top-0 right-0 h-full w-80 bg-white/30 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-l border-white/20 transform transition-transform duration-300 flex flex-col z-50 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* هدر */}
//         <div className="flex justify-between items-center p-4 border-b border-white/20 shrink-0">
//           <h2 className="text-lg font-extrabold text-brown-900 tracking-wide">
//             🛍️ سبد خرید
//           </h2>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="p-1 hover:bg-white/20 rounded-full"
//           >
//             <X className="w-6 h-6 text-brown-800" />
//           </button>
//         </div>

//         {/* آیتم‌ها */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3">
//           {cartItems.length === 0 ? (
//             <p className="text-center text-brown-700 italic">
//               سبد خرید خالی است 🛒
//             </p>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex justify-between items-center bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg p-3 transition hover:scale-[1.02]"
//               >
//                 <div>
//                   <h3 className="font-semibold text-brown-900">{item.name}</h3>
//                   <p className="text-sm text-brown-600">
//                     {item.price.toLocaleString("fa-IR")} تومان
//                   </p>

//                   {/* کنترل تعداد */}
//                   <div className="flex items-center gap-2 mt-2">
//                     <button
//                       onClick={() => decreaseQty(item.id)}
//                       className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
//                     >
//                       <Minus className="w-4 h-4 text-brown-800" />
//                     </button>
//                     <span className="px-2 font-bold text-brown-900">
//                       {item.qty}
//                     </span>
//                     <button
//                       onClick={() => increaseQty(item.id)}
//                       className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
//                     >
//                       <Plus className="w-4 h-4 text-brown-800" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* قیمت کل + حذف */}
//                 <div className="flex flex-col items-end gap-2">
//                   <span className="text-brown-900 font-bold text-sm">
//                     {(item.qty * item.price).toLocaleString("fa-IR")} تومان
//                   </span>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="p-1 rounded-full hover:bg-red-100 transition"
//                   >
//                     <Trash2 className="w-5 h-5 text-red-600" />
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* فوتر */}
//         <div className="p-4 border-t border-white/20 shrink-0 bg-white/30 backdrop-blur-xl">
//           <p className="flex justify-between font-bold text-brown-900 text-lg">
//             <span>جمع کل:</span>
//             <span>{total.toLocaleString("fa-IR")} تومان</span>
//           </p>
//           <button className="w-full mt-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-brown-900 font-extrabold py-3 rounded-xl shadow-lg hover:scale-[1.02] transition">
//             ادامه سفارش →
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import { useEffect, useMemo, useState } from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  Store,
  TicketPercent,
} from "lucide-react";
import { useCart } from "../../contexts/CartContext";

const formatFA = (n) => Number(n || 0).toLocaleString("fa-IR");

export default function CartDrawer() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // جمع تعداد کل آیتم‌ها (برای بج روی دکمه)
  const totalQty = useMemo(
    () => cartItems.reduce((s, it) => s + (it.qty || 0), 0),
    [cartItems]
  );

  // محاسبه قیمتِ واحد: اولویت با finalPrice، بعد discount، بعد price
  const unitPriceOf = (it) => {
    if (typeof it.finalPrice === "number") return it.finalPrice;
    if (typeof it.discount === "number" && it.discount > 0) {
      return Math.round(it.price - (it.price * it.discount) / 100);
    }
    return it.price;
  };

  // ساب‌تو‌تال و تخفیف آیتم‌ها
  const { subtotal, itemDiscount } = useMemo(() => {
    let st = 0;
    let disc = 0;
    for (const it of cartItems) {
      const unit = unitPriceOf(it);
      st += unit * it.qty;
      const perItemDisc =
        typeof it.price === "number" ? (it.price - unit) * it.qty : 0;
      disc += Math.max(0, perItemDisc);
    }
    return { subtotal: st, itemDiscount: disc };
  }, [cartItems]);

  // حالت‌های تکمیلی سبد
  const [method, setMethod] = useState("pickup"); // pickup | delivery
  const [tip, setTip] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  // هزینه ارسال (نمونه؛ سفارشی کن)
  const deliveryFee = method === "delivery" ? 25000 : 0;

  // اعمال یک منطق ساده کوپن (اختیاری؛ به بک‌اند وصل کن)
  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    // نمونه: MORO10 → 10% روی subtotal پس از تخفیف آیتم‌ها
    if (code === "MORO10") {
      const base = Math.max(0, subtotal - itemDiscount);
      setCouponDiscount(Math.floor(base * 0.1));
    } else if (code === "MORO20") {
      const base = Math.max(0, subtotal - itemDiscount);
      setCouponDiscount(Math.floor(base * 0.2));
    } else {
      setCouponDiscount(0);
    }
  };

  const total = useMemo(() => {
    const base = Math.max(0, subtotal - itemDiscount - couponDiscount);
    return Math.max(0, base + deliveryFee + tip);
  }, [subtotal, itemDiscount, couponDiscount, deliveryFee, tip]);

  // ESC برای بستن + قفل اسکرول صفحه پشت دراور
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev || "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <>
      {/* دکمه شناور */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-gradient-to-br from-amber-300 to-amber-500 text-[#3e2c22] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 border border-white/40"
        aria-label="باز کردن سبد خرید"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
            {formatFA(totalQty)}
          </span>
        )}
      </button>

      {/* بک‌دراپ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-[fadeIn_.2s_ease]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* دراور */}
      <aside
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`fixed top-0 right-0 h-full w-[92vw] sm:w-[420px] md:w-[460px]
          bg-[#fffaf4]/90 backdrop-blur-2xl shadow-[0_12px_60px_rgba(62,44,34,.35)]
          border-l border-amber-100/70 z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* هدر */}
        <div className="sticky top-0 bg-[#fffaf4]/95 backdrop-blur-xl border-b border-amber-100/70 px-4 py-3 flex items-center justify-between">
          <h2
            id="cart-title"
            className="text-lg md:text-xl font-extrabold text-[#3e2c22] tracking-wide"
          >
            🛍️ سبد خرید
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="h-10 w-10 grid place-items-center rounded-full bg-white/80 hover:bg-white shadow-md border border-white/60 transition"
            aria-label="بستن سبد"
          >
            <X className="w-5 h-5 text-[#3e2c22]" />
          </button>
        </div>

        {/* بدنه اسکرولی */}
        <div className="h-[calc(100%-200px)] overflow-y-auto overflow-x-hidden no-scrollbar px-4 py-4 space-y-4">
          {/* حالت خالی */}
          {cartItems.length === 0 ? (
            <div className="text-center text-[#5c4330] bg-white/70 border border-amber-100 rounded-2xl p-6">
              <p className="mb-3">سبد خرید خالی است 🛒</p>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#3e2c22] text-white font-semibold hover:bg-[#5a3f2e] transition"
              >
                شروع سفارش
              </button>
            </div>
          ) : (
            <>
              {/* آیتم‌ها */}
              {cartItems.map((item) => {
                const unit = unitPriceOf(item);
                const line = unit * item.qty;
                const perUnitDisc =
                  typeof item.price === "number"
                    ? Math.max(0, item.price - unit)
                    : 0;

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-white/75 backdrop-blur-md border border-amber-100 rounded-2xl shadow-lg p-3"
                  >
                    {/* تصویر */}
                    <div className="h-16 w-16 rounded-xl overflow-hidden bg-[#f3ebe2] border border-amber-100 shrink-0">
                      <img
                        src={item.image || "/images/cafe/default-thumb.jpg"}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>

                    {/* اطلاعات */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#3e2c22] truncate">
                            {item.name}
                          </h3>

                          {/* متادیتا آیتم (سایز/شیرینی/نوت) */}
                          <div className="flex flex-wrap items-center gap-1 mt-1">
                            {item.size && (
                              <span className="text-[11px] text-[#5c4330] bg-[#f8efe6] border border-amber-100 px-2 py-0.5 rounded-full">
                                {item.size}
                              </span>
                            )}
                            {typeof item.sugar === "number" && (
                              <span className="text-[11px] text-[#5c4330] bg-[#f8efe6] border border-amber-100 px-2 py-0.5 rounded-full">
                                {item.sugar === 0
                                  ? "بی‌قند"
                                  : item.sugar === 1
                                  ? "عادی"
                                  : "شیرین"}
                              </span>
                            )}
                            {item.notes && (
                              <span className="text-[11px] text-[#5c4330]/80 bg-white border border-amber-100 px-2 py-0.5 rounded-full line-clamp-1">
                                یادداشت: {item.notes}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* حذف */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 rounded-full hover:bg-red-50 transition shrink-0"
                          aria-label="حذف آیتم"
                          title="حذف"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>

                      {/* قیمت + کنترل تعداد */}
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="p-1.5 rounded-lg bg-white hover:bg-amber-50 border border-amber-200 disabled:opacity-30"
                            disabled={item.qty <= 1}
                            aria-label="کاهش تعداد"
                          >
                            <Minus className="w-4 h-4 text-[#3e2c22]" />
                          </button>
                          <span className="px-3 font-bold text-[#3e2c22] min-w-9 text-center">
                            {formatFA(item.qty)}
                          </span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="p-1.5 rounded-lg bg-white hover:bg-amber-50 border border-amber-200"
                            aria-label="افزایش تعداد"
                          >
                            <Plus className="w-4 h-4 text-[#3e2c22]" />
                          </button>
                        </div>

                        <div className="text-right">
                          {perUnitDisc > 0 ? (
                            <div className="flex items-center gap-2">
                              <span className="line-through text-gray-400 text-xs">
                                {formatFA(item.price)} تومان
                              </span>
                              <span className="text-[#3e2c22] font-extrabold">
                                {formatFA(line)} تومان
                              </span>
                            </div>
                          ) : (
                            <span className="text-[#3e2c22] font-extrabold">
                              {formatFA(line)} تومان
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* انتخاب روش دریافت */}
              <div className="bg-white/75 border border-amber-100 rounded-2xl p-3">
                <div className="text-sm font-semibold text-[#3e2c22] mb-2">
                  روش دریافت
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMethod("pickup")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm transition ${
                      method === "pickup"
                        ? "bg-[#3e2c22] text-white border-[#3e2c22]"
                        : "bg-white text-[#3e2c22] border-amber-200 hover:border-amber-300"
                    }`}
                  >
                    <Store size={16} />
                    حضوری در کافه
                  </button>
                  <button
                    onClick={() => setMethod("delivery")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm transition ${
                      method === "delivery"
                        ? "bg-[#3e2c22] text-white border-[#3e2c22]"
                        : "bg-white text-[#3e2c22] border-amber-200 hover:border-amber-300"
                    }`}
                  >
                    <Truck size={16} />
                    ارسال
                  </button>
                </div>
                {method === "delivery" && (
                  <p className="mt-2 text-xs text-[#5c4330]">
                    هزینه ارسال: {formatFA(deliveryFee)} تومان
                  </p>
                )}
              </div>

              {/* کد تخفیف + انعام */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white/75 border border-amber-100 rounded-2xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <TicketPercent size={18} className="text-[#3e2c22]" />
                    <span className="text-sm font-semibold text-[#3e2c22]">
                      کد تخفیف
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="مثلاً: MORO10"
                      className="flex-1 rounded-xl border border-amber-200 bg-white/80 px-3 py-2 text-sm text-[#3e2c22] placeholder:text-[#3e2c22]/40 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-3 py-2 rounded-xl bg-[#3e2c22] text-white text-sm font-semibold hover:bg-[#5a3f2e] transition"
                    >
                      اعمال
                    </button>
                  </div>
                  {couponDiscount > 0 && (
                    <p className="text-xs text-green-700 mt-2">
                      {formatFA(couponDiscount)} تومان از جمع کسر شد.
                    </p>
                  )}
                </div>

                <div className="bg-white/75 border border-amber-100 rounded-2xl p-3">
                  <div className="text-sm font-semibold text-[#3e2c22] mb-2">
                    انعام برای باریستا (اختیاری)
                  </div>
                  <div className="flex items-center gap-2">
                    {[0, 5000, 10000, 20000].map((v) => (
                      <button
                        key={v}
                        onClick={() => setTip(v)}
                        className={`px-3 py-1.5 rounded-xl border text-sm transition ${
                          tip === v
                            ? "bg-amber-600 text-white border-amber-600"
                            : "bg-white text-[#3e2c22] border-amber-200 hover:border-amber-300"
                        }`}
                      >
                        {v === 0 ? "—" : `${formatFA(v)} تومان`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* فوتر جمع‌بندی */}
        <div className="sticky bottom-0 bg-[#fffaf4]/95 backdrop-blur-xl border-t border-amber-100/70 p-4">
          <div className="space-y-2 text-[#3e2c22] text-sm">
            <div className="flex justify-between">
              <span>جمع جزء</span>
              <span>{formatFA(subtotal)} تومان</span>
            </div>
            {itemDiscount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>تخفیف آیتم‌ها</span>
                <span>- {formatFA(itemDiscount)} تومان</span>
              </div>
            )}
            {couponDiscount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>کد تخفیف</span>
                <span>- {formatFA(couponDiscount)} تومان</span>
              </div>
            )}
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>هزینه ارسال</span>
                <span>{formatFA(deliveryFee)} تومان</span>
              </div>
            )}
            {tip > 0 && (
              <div className="flex justify-between">
                <span>انعام</span>
                <span>{formatFA(tip)} تومان</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-amber-100">
              <span className="font-extrabold text-base">مبلغ قابل پرداخت</span>
              <span className="font-extrabold text-lg">
                {formatFA(total)} تومان
              </span>
            </div>
          </div>

          <button
            className="w-full mt-3 bg-[#3e2c22] text-white font-extrabold py-3 rounded-2xl hover:bg-[#5a3f2e] transition-all duration-200 shadow-md"
            onClick={() => {
              // TODO: هدایت به مرحله بعد سفارش (آدرس/پرداخت)
              // مثلا: router.push('/checkout')
            }}
          >
            ادامه سفارش →
          </button>
        </div>
      </aside>

      {/* استایل کمکی برای مخفی کردن اسکرول‌بار */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
