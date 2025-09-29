// import { useEffect, useMemo, useState } from "react";
// import { Heart } from "lucide-react";
// import { useCart } from "../../contexts/CartContext";
// import { calculateFinalPrice } from "../../services/products/productService";
// import ProductModal from "./ProductModal";

// const FAV_KEY = "favorite_ids";

// // --- LS helpers ---
// const readFavs = () =>
//   new Set(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
// const writeFavs = (set) =>
//   localStorage.setItem(FAV_KEY, JSON.stringify([...set]));

// const ProductCard = ({ product }) => {
//   const { addToCart } = useCart();
//   if (!product) return null;

//   const { id, name, description, price, discount = 0, image } = product;
//   const hasDiscount = discount > 0;

//   // قیمت‌ها
//   const finalPrice = useMemo(
//     () => (hasDiscount ? calculateFinalPrice(price, discount) : price),
//     [price, discount, hasDiscount]
//   );
//   const formattedPrice = useMemo(
//     () => Number(price).toLocaleString("fa-IR"),
//     [price]
//   );
//   const formattedFinalPrice = useMemo(
//     () => Number(finalPrice).toLocaleString("fa-IR"),
//     [finalPrice]
//   );

//   // علاقه‌مندی‌ها
//   const [isFavorite, setIsFavorite] = useState(false);
//   useEffect(() => {
//     setIsFavorite(readFavs().has(id));
//   }, [id]);

//   const toggleFavorite = () => {
//     const favs = readFavs();
//     favs.has(id) ? favs.delete(id) : favs.add(id);
//     writeFavs(favs);
//     setIsFavorite(favs.has(id));
//     if (navigator.vibrate) navigator.vibrate(12);
//   };

//   // باز/بستن مودال
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       {/* کارت محصول */}
//       <div
//         className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer"
//         dir="rtl"
//       >
//         {/* تصویر */}
//         <img
//           src={`${image || "cat-default.jpg"}`}
//           alt={name}
//           className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
//           onError={(e) => (e.currentTarget.src = "/images/cat-default.jpg")}
//           onClick={() => setShowModal(true)} // 👈 باز کردن مودال
//         />

//         {/* ❤️ علاقه‌مندی */}
//         <button
//           onClick={toggleFavorite}
//           aria-label={
//             isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
//           }
//           className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/85 backdrop-blur shadow hover:bg-white transition"
//         >
//           <Heart
//             size={20}
//             className={`${
//               isFavorite
//                 ? "text-red-500 fill-red-500 scale-110"
//                 : "text-gray-400 scale-100"
//             } transition-transform duration-200`}
//           />
//         </button>

//         {/* گرادیان و اطلاعات */}
//         <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
//         <div
//           className="absolute bottom-0 left-0 right-0 z-10 p-3 text-white"
//           onClick={() => setShowModal(true)} // 👈 باز کردن مودال
//         >
//           <h3 className="font-title tracking-tight font-extrabold text-lg mb-1">
//             {name}
//           </h3>

//           {description && (
//             <p className="font-body text-sm opacity-90 mb-2 line-clamp-2">
//               {description}
//             </p>
//           )}

//           {/* 💲 قیمت */}
//           <div className="flex items-center gap-2 font-body mb-2">
//             {hasDiscount ? (
//               <>
//                 <span className="text-red-300 line-through text-sm">
//                   {formattedPrice} تومان
//                 </span>
//                 <span className="px-2 py-0.5 bg-green-600/90 rounded-lg text-sm font-bold">
//                   {formattedFinalPrice} تومان
//                 </span>
//               </>
//             ) : (
//               <span className="px-2 py-0.5 bg-yellow-500/90 rounded-lg text-sm font-bold">
//                 {formattedPrice} تومان
//               </span>
//             )}
//           </div>

//           {/* 🛒 افزودن به سبد */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation(); // جلوگیری از باز شدن مودال با کلیک روی دکمه
//               addToCart({ id, name, price: finalPrice, qty: 1 });
//               if (navigator.vibrate) navigator.vibrate(15);
//             }}
//             className="w-full bg-yellow-500 text-brown-900 font-bold py-1.5 rounded-lg
//              hover:bg-yellow-400 active:scale-95 transition-transform duration-150
//              shadow-md hover:shadow-lg"
//           >
//             افزودن به سبد خرید
//           </button>
//         </div>
//       </div>

//       {/* استفاده از ProductModal جدا */}
//       <ProductModal
//         product={product}
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         onAddToCart={(p) =>
//           addToCart({ id: p.id, name: p.name, price: finalPrice, qty: 1 })
//         }
//       />
//     </>
//   );
// };

// export default ProductCard;

import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Heart,
  Flame,
  Leaf,
  Star,
  BadgePercent,
  Coffee,
  ChefHat,
} from "lucide-react";
import { useCart } from "../../../../contexts/CartContext";
import { calculateFinalPrice } from "../../../../services/products/productService";
import ProductModal from "./ProductModal";

const FAV_KEY = "favorite_ids";
const readFavs = () =>
  new Set(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
const writeFavs = (set) =>
  localStorage.setItem(FAV_KEY, JSON.stringify([...set]));

export default function CafeProductCard({ product }) {
  const { addToCart } = useCart();
  if (!product) return null;

  const {
    id,
    name,
    description,
    price,
    discount = 0,
    image,
    rating = null,
    tags = [],
  } = product;

  const hasDiscount = discount > 0;
  const discountPercent = useMemo(() => {
    if (!hasDiscount) return 0;
    const final = calculateFinalPrice(price, discount);
    const pct = Math.round(((price - final) / price) * 100);
    return isFinite(pct) ? pct : 0;
  }, [price, discount, hasDiscount]);

  const finalPrice = useMemo(
    () => (hasDiscount ? calculateFinalPrice(price, discount) : price),
    [price, discount, hasDiscount]
  );

  const formattedPrice = useMemo(
    () => Number(price).toLocaleString("fa-IR"),
    [price]
  );
  const formattedFinalPrice = useMemo(
    () => Number(finalPrice).toLocaleString("fa-IR"),
    [finalPrice]
  );

  // علاقه‌مندی‌ها
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(readFavs().has(id));
  }, [id]);

  const toggleFavorite = useCallback(
    (e) => {
      e?.stopPropagation();
      const favs = readFavs();
      favs.has(id) ? favs.delete(id) : favs.add(id);
      writeFavs(favs);
      setIsFavorite(favs.has(id));
      if (navigator.vibrate) navigator.vibrate(12);
    },
    [id]
  );

  const [showModal, setShowModal] = useState(false);
  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  return (
    <>
      {/* استایل‌های ویژه کارت کافه */}
      <style>{`
        :root{
          --cafe-bg:#0f0a07; /* پس‌زمینه تیره موکا */
          --cafe-card:#120c08; /* کارت */
          --cafe-primary:#d4a373; /* قهوه‌ای-طلایی */
          --cafe-accent:#fbbf24; /* کهربایی/عسلی */
          --cafe-cream:#f8efe6; /* کرم */
        }
        .cafe-shine::after{
          content:"";
          position:absolute;inset:0;pointer-events:none;
          background: linear-gradient(120deg,transparent 40%,rgba(255,255,255,.22) 50%,transparent 60%);
          transform: translateX(-120%);
          transition: transform .9s ease;
        }
        .cafe-card:hover .cafe-shine::after{ transform: translateX(120%); }
        @keyframes cafe-steam {
          0%   { transform: translateY(0) scale(1); opacity:.25; }
          50%  { opacity:.45; }
          100% { transform: translateY(-24px) scale(1.1); opacity:0; }
        }
      `}</style>

      <article
        dir="rtl"
        role="button"
        tabIndex={0}
        onClick={openModal}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openModal()}
        className="cafe-card relative group rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,.6)] bg-[var(--cafe-card)] ring-1 ring-white/5 hover:ring-[var(--cafe-accent)]/40 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cafe-accent)]"
      >
        {/* تصویر + درخشش */}
        <div className="relative h-60 sm:h-64 md:h-72 overflow-hidden cafe-shine">
          <img
            src={`${image || "/images/cat-default.jpg"}`}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1"
            onError={(e) => (e.currentTarget.src = "/images/cat-default.jpg")}
          />

          {/* بخار قهوه (تزئینی) */}
          <div className="absolute left-3 top-3 flex gap-1 pointer-events-none">
            <span className="w-2 h-6 rounded-full bg-white/20 blur-[2px] animate-[cafe-steam_2.4s_linear_infinite]" />
            <span className="w-2 h-5 rounded-full bg-white/15 blur-[2px] animate-[cafe-steam_3s_.2s_linear_infinite]" />
            <span className="w-2 h-7 rounded-full bg-white/20 blur-[2px] animate-[cafe-steam_2.8s_.4s_linear_infinite]" />
          </div>

          {/* درصد تخفیف */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1 text-[var(--cafe-cream)] bg-black/60 backdrop-blur px-2 py-1 rounded-xl border border-white/10">
              <BadgePercent size={16} />
              <span className="text-sm">{discountPercent}%</span>
            </div>
          )}

          {/* دکمه علاقه‌مندی */}
          <button
            onClick={toggleFavorite}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
            }
            className="absolute top-3 left-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur shadow hover:bg-white transition"
          >
            <Heart
              size={20}
              className={`${
                isFavorite
                  ? "text-red-500 fill-red-500 scale-110"
                  : "text-gray-500"
              } transition-transform duration-200`}
            />
          </button>
        </div>

        {/* پنل اطلاعات (گلس) */}
        <div className="absolute inset-x-0 -bottom-3 translate-y-1/2 z-20">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-tr from-black/70 via-black/40 to-transparent backdrop-blur-md p-3 md:p-4 text-white shadow-[0_10px_25px_-15px_rgba(0,0,0,.9)]">
            <div className="flex items-start gap-2">
              <div className="shrink-0 rounded-xl bg-[var(--cafe-primary)]/15 p-2 border border-[var(--cafe-primary)]/20">
                <ChefHat size={20} className="text-[var(--cafe-primary)]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-title font-extrabold tracking-tight text-base md:text-lg leading-snug line-clamp-2">
                  {name}
                </h3>
                {description && (
                  <p className="font-body text-xs md:text-sm opacity-90 mt-1 line-clamp-2">
                    {description}
                  </p>
                )}

                {/* قیمت */}
                <div className="mt-2 flex items-center gap-2 font-body">
                  {hasDiscount ? (
                    <>
                      <span className="text-red-300 line-through text-xs md:text-sm whitespace-nowrap">
                        {formattedPrice} تومان
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-600/90 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap">
                        {formattedFinalPrice} تومان
                      </span>
                    </>
                  ) : (
                    <span className="px-2 py-0.5 bg-amber-500/90 rounded-lg text-xs md:text-sm font-bold whitespace-nowrap">
                      {formattedPrice} تومان
                    </span>
                  )}
                </div>

                {/* دکمه افزودن به سبد */}
                <div className="mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({ id, name, price: finalPrice, qty: 1 });
                      if (navigator.vibrate) navigator.vibrate(15);
                    }}
                    className="w-full md:w-auto md:min-w-[160px] bg-amber-400 text-amber-950 font-extrabold py-2 px-4 rounded-xl hover:bg-amber-300 active:scale-95 transition-transform duration-150 shadow-md hover:shadow-lg border border-amber-950/10"
                  >
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* مودال جزئیات */}
      <ProductModal
        product={product}
        isOpen={showModal}
        onClose={closeModal}
        onAddToCart={(p) =>
          addToCart({ id: p.id, name: p.name, price: finalPrice, qty: 1 })
        }
      />
    </>
  );
}
