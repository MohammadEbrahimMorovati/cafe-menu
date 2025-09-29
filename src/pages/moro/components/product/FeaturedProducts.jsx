// import { useTheme } from "../../contexts/useTheme";
// import { Star } from "lucide-react";

// const FeaturedProducts = ({ products, title = "محصولات ویژه" }) => {
//   const { theme } = useTheme();

//   if (!products?.length) return null;

//   const scrollToProduct = (categoryId, productId) => {
//     const element = document.getElementById(
//       `product-${categoryId}-${productId}`
//     );
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "center" });
//     } else {
//       console.warn("❌ Product not found:", categoryId, productId);
//     }
//   };

//   const featured = products.slice(0, 5);
//   const primaryColor = theme.primary;

//   return (
//     <div className="mb-16">
//       {/* 🏷 عنوان */}
//       <h2
//         className="text-2xl sm:text-3xl font-extrabold tracking-widest mb-6 text-center drop-shadow-xl"
//         style={{ color: primaryColor }}
//       >
//         {title}
//       </h2>

//       {/* 📜 لیست محصولات */}
//       <div className="overflow-x-auto scrollbar-hide">
//         <div className="flex gap-6 pb-6" style={{ width: "max-content" }}>
//           {featured.map((product) => (
//             <div
//               key={product.id}
//               onClick={() => scrollToProduct(product.category, product.id)}
//               className="flex-shrink-0 w-44 h-56 relative cursor-pointer group
//              rounded-2xl overflow-hidden shadow-lg transition-all duration-500
//              hover:ring-2 hover:ring-yellow-400/70"
//               style={{ scrollSnapAlign: "center" }}
//             >
//               {/* تصویر محصول + گرادیان + متن */}
//               <div className="relative w-full h-full rounded-2xl overflow-hidden">
//                 {product.image ? (
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover
//                    transition-transform duration-700 group-hover:scale-110"
//                   />
//                 ) : (
//                   <span className="flex items-center justify-center w-full h-full text-4xl font-bold text-yellow-600">
//                     {product.name?.[0] || "?"}
//                   </span>
//                 )}

//                 {/* لایه گرادیان پایین */}
//                 <div
//                   className="absolute inset-x-0 bottom-0 h-28 pointer-events-none
//                  bg-gradient-to-t from-black/80 to-transparent
//                  flex flex-col items-center justify-end
//                  px-3 pb-3 text-center transition-all duration-500
//                  group-hover:from-black/95"
//                 >
//                   <span className="block text-lg sm:text-xl font-bold text-white drop-shadow-lg line-clamp-1">
//                     {product.name}
//                   </span>
//                   <span className="block mt-1 text-xs sm:text-sm text-gray-200 drop-shadow-md line-clamp-1">
//                     {product.description || "توضیحات محصول"}
//                   </span>
//                 </div>
//               </div>

//               {/* بج ویژه */}
//               <div className="absolute top-3 left-3 bg-yellow/40 border border-yellow-400 text-yellow-200 text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md backdrop-blur-sm">
//                 <Star className="w-3 h-3 text-yellow-300" /> ویژه
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ℹ️ متن راهنما */}
//       <div className="flex justify-center mt-5">
//         <p
//           className="text-xs sm:text-sm italic opacity-80 animate-bounce"
//           style={{ color: primaryColor }}
//         >
//           ← برای دیدن محصولات بیشتر بکشید →
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProducts;
// import { useTheme } from "../../contexts/useTheme";
// import { Star } from "lucide-react";

// const FeaturedProducts = ({ products, title = "محصولات ویژه" }) => {
//   const { theme } = useTheme();
//   if (!products?.length) return null;

//   const scrollToProduct = (categoryId, productId) => {
//     const element = document.getElementById(
//       `product-${categoryId}-${productId}`
//     );
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "center" });
//     } else {
//       console.warn("❌ Product not found:", categoryId, productId);
//     }
//   };

//   // ✅ منطق دست‌نخورده
//   const featured = products.slice(0, 5);
//   const primaryColor = theme.primary;

//   return (
//     <div className="mb-12 sm:mb-16" dir="rtl">
//       {/* هدر */}
//       <div className="text-center mb-6 sm:mb-8">
//         <h2
//           className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest drop-shadow"
//           style={{ color: primaryColor }}
//         >
//           {title}
//         </h2>
//         <div className="mt-3 hidden sm:flex items-center justify-center gap-2">
//           <span className="h-px w-16 bg-amber-400/70" />
//           <span className="px-3 py-1 rounded-full text-xs bg-amber-50 text-amber-900 border border-amber-200">
//             پیشنهاد سرآشپز
//           </span>
//           <span className="h-px w-16 bg-amber-400/70" />
//         </div>
//       </div>

//       {/* لیست افقی (کوچک‌تر + ریسپانسیو) */}
//       <div
//         className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
//         style={{
//           WebkitMaskImage:
//             "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
//           maskImage:
//             "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
//         }}
//       >
//         <div
//           className="flex gap-4 sm:gap-6 pb-4 sm:pb-6 pr-2"
//           style={{ width: "max-content" }}
//         >
//           {featured.map((product) => (
//             <button
//               type="button"
//               key={product.id}
//               onClick={() => scrollToProduct(product.category, product.id)}
//               className="
//                 group relative flex-shrink-0 snap-center
//                 w-48 sm:w-56 md:w-64
//                 h-64 sm:h-72 md:h-80
//                 rounded-2xl p-[1.5px]
//                 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600
//                 hover:from-amber-400 hover:via-amber-600 hover:to-amber-700
//                 transition-all duration-400 ease-out
//                 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.45)]
//                 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
//               "
//               style={{ scrollSnapAlign: "center" }}
//             >
//               {/* کارت داخلی شیشه‌ای */}
//               <div
//                 className="
//                   relative w-full h-full rounded-[15px] overflow-hidden
//                   bg-[#0f0a07]/80 backdrop-blur-xl
//                   border border-white/10
//                 "
//               >
//                 {/* تصویر */}
//                 <div className="absolute inset-0">
//                   {product.image ? (
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="
//                         w-full h-full object-cover
//                         transition-transform duration-500 ease-out
//                         group-hover:scale-[1.06]
//                       "
//                       loading="lazy"
//                     />
//                   ) : (
//                     <div className="w-full h-full grid place-items-center bg-amber-50">
//                       <span className="text-5xl font-black text-amber-600">
//                         {product.name?.[0] || "?"}
//                       </span>
//                     </div>
//                   )}
//                   {/* گرادیان نرم بالا/پایین */}
//                   <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60" />
//                 </div>

//                 {/* ✅ بج «ویژه» با آیکون ستاره (در بخش پایین کارت) */}
//                 <div
//                   className="
//                     absolute inset-x-2 bottom-2 z-10
//                     rounded-xl p-2 sm:p-3
//                     bg-gradient-to-tr from-black/70 via-black/45 to-white/5
//                     border border-white/10 backdrop-blur-md
//                     shadow-[0_10px_30px_-12px_rgba(0,0,0,.6)]
//                     transition-all duration-300 group-hover:translate-y-[-2px]
//                   "
//                 >
//                   <div className="flex items-start gap-2">
//                     {/* بج ویژه کوچک و مرتب */}
//                     <div
//                       className="
//                         shrink-0 px-2 py-1 rounded-full
//                         bg-white/10 border border-white/20
//                         text-amber-200 flex items-center gap-1
//                       "
//                     >
//                       <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
//                       <span className="text-[11px] font-bold">ویژه</span>
//                     </div>

//                     <div className="min-w-0 text-white">
//                       <h3 className="text-base sm:text-lg font-extrabold tracking-tight leading-snug line-clamp-1">
//                         {product.name}
//                       </h3>
//                       <p className="mt-0.5 text-[11px] sm:text-xs text-gray-200/90 line-clamp-2">
//                         {product.description || "توضیحات محصول"}
//                       </p>
//                       {/* نوار تزئینی ظریف */}
//                       <div className="mt-2 h-[2px] w-20 sm:w-24 bg-gradient-to-r from-amber-400 via-amber-500 to-transparent rounded-full" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* راهنمای اسکرول (برای موبایل) */}
//       <div className="flex justify-center mt-4 sm:mt-5">
//         <p
//           className="text-[11px] sm:text-xs italic opacity-80 animate-pulse"
//           style={{ color: primaryColor }}
//         >
//           ← برای دیدن محصولات بیشتر بکشید →
//         </p>
//       </div>

//       {/* مخفی‌کردن اسکرول‌بار روی مرورگرهای متفرقه */}
//       <style>{`
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//       `}</style>
//     </div>
//   );
// };

// export default FeaturedProducts;
import { useTheme } from "../../../../contexts/useTheme";
import { Star } from "lucide-react";

const FeaturedProducts = ({ products, title = "محصولات ویژه" }) => {
  const { theme } = useTheme();
  if (!products?.length) return null;

  const scrollToProduct = (categoryId, productId) => {
    const el = document.getElementById(`product-${categoryId}-${productId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    else console.warn("❌ Product not found:", categoryId, productId);
  };

  // ✅ منطق دست‌نخورده
  const featured = products.slice(0, 5);
  const primaryColor = theme.primary;

  return (
    <div className="mb-12 sm:mb-16" dir="rtl">
      {/* هدر */}
      <div className="text-center mb-6 sm:mb-8">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest drop-shadow"
          style={{ color: primaryColor }}
        >
          {title}
        </h2>
        <div className="mt-3 hidden sm:flex items-center justify-center gap-2">
          <span className="h-px w-16 bg-amber-400/70" />
          <span className="px-3 py-1 rounded-full text-xs bg-amber-50 text-amber-900 border border-amber-200">
            پیشنهاد سرآشپز
          </span>
          <span className="h-px w-16 bg-amber-400/70" />
        </div>
      </div>

      {/* لیست افقی (کوچک‌تر + ریسپانسیو) */}
      <div
        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
        }}
      >
        <div
          className="flex gap-4 sm:gap-6 pb-4 sm:pb-6 pr-2"
          style={{ width: "max-content" }}
        >
          {featured.map((product) => (
            <button
              type="button"
              key={product.id}
              onClick={() => scrollToProduct(product.category, product.id)}
              className="
                group relative flex-shrink-0 snap-center
                w-48 sm:w-56 md:w-64
                h-64 sm:h-72 md:h-80
                rounded-2xl p-[1.5px]
                bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600
                hover:from-amber-400 hover:via-amber-600 hover:to-amber-700
                transition-all duration-400 ease-out
                shadow-[0_18px_60px_-20px_rgba(0,0,0,0.45)]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
              "
              style={{ scrollSnapAlign: "center" }}
            >
              {/* کارت داخلی شیشه‌ای */}
              <div
                className="
                  relative w-full h-full rounded-[15px] overflow-hidden
                  bg-[#0f0a07]/80 backdrop-blur-xl
                  border border-white/10
                "
              >
                {/* تصویر */}
                <div className="absolute inset-0">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        w-full h-full object-cover
                        transition-transform duration-500 ease-out
                        group-hover:scale-[1.06]
                      "
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center bg-amber-50">
                      <span className="text-5xl font-black text-amber-600">
                        {product.name?.[0] || "?"}
                      </span>
                    </div>
                  )}
                  {/* گرادیان نرم بالا/پایین */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60" />
                </div>

                {/* ✅ ستاره قبلی به‌جای بج «ویژه» */}
                <div
                  className="
                    absolute inset-x-2 bottom-2 z-10
                    rounded-xl p-2 sm:p-3
                    bg-gradient-to-tr from-black/70 via-black/45 to-white/5
                    border border-white/10 backdrop-blur-md
                    shadow-[0_10px_30px_-12px_rgba(0,0,0,.6)]
                    transition-all duration-300 group-hover:translate-y-[-2px]
                  "
                >
                  <div className="flex items-start gap-2">
                    {/* آیکون ستاره (بج مینیمال) */}
                    <div
                      className="
                        shrink-0 w-9 h-9 sm:w-10 sm:h-10
                        grid place-items-center
                        rounded-xl bg-amber-100/15
                        border border-amber-200/20 ring-1 ring-amber-200/10
                      "
                      aria-hidden="true"
                    >
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 fill-amber-300" />
                    </div>

                    <div className="min-w-0 text-white">
                      <h3 className="text-base sm:text-lg font-extrabold tracking-tight leading-snug line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="mt-0.5 text-[11px] sm:text-xs text-gray-200/90 line-clamp-2">
                        {product.description || "توضیحات محصول"}
                      </p>
                      {/* نوار تزئینی ظریف */}
                      <div className="mt-2 h-[2px] w-20 sm:w-24 bg-gradient-to-r from-amber-400 via-amber-500 to-transparent rounded-full" />
                      {/* فقط برای صفحه‌خوان‌ها برچسب دسترس‌پذیری */}
                      <span className="sr-only">ویژه</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* راهنمای اسکرول (برای موبایل) */}
      <div className="flex justify-center mt-4 sm:mt-5">
        <p
          className="text-[11px] sm:text-xs italic opacity-80 animate-pulse"
          style={{ color: primaryColor }}
        >
          ← برای دیدن محصولات بیشتر بکشید →
        </p>
      </div>

      {/* مخفی‌کردن اسکرول‌بار روی مرورگرهای متفرقه */}
      <style>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default FeaturedProducts;
