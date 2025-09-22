// import { useTheme } from "../../contexts/useTheme";

// const FeaturedCategories = ({ categories, title = "دسته‌بندی‌ها" }) => {
//   const { theme } = useTheme();
//   const primaryColor = theme.primary_color;

//   if (!categories?.length) return null;

//   // 📌 تابع اسکرول نرم به سکشن دسته محصول
//   const scrollToCategory = (categoryId) => {
//     const element = document.getElementById(`category-section-${categoryId}`);
//     if (element) {
//       element.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//       // ✨ افکت هایلایت کوتاه روی بخش مقصد
//       element.classList.add("ring-4", "ring-yellow-400/70");
//       setTimeout(() => {
//         element.classList.remove("ring-4", "ring-yellow-400/70");
//       }, 1200);
//     }
//   };

//   return (
//     <div className="mb-12">
//       {/* 🏷 عنوان */}
//       <h2
//         className="text-2xl sm:text-3xl font-extrabold tracking-widest mb-6 text-center drop-shadow-xl"
//         style={{ color: primaryColor }}
//       >
//         {title}
//       </h2>

//       {/* 📜 لیست دسته‌بندی‌ها (اسکرول نرم iOS) */}
//       <div
//         className="overflow-x-auto scrollbar-hide px-4"
//         style={{
//           scrollSnapType: "x mandatory",
//           WebkitOverflowScrolling: "touch", // اینرسی iOS
//         }}
//       >
//         <div className="flex gap-6 pb-6">
//           {categories.map((cat) => (
//             <div
//               key={cat.id}
//               onClick={() => scrollToCategory(cat.id)}
//               className="flex-shrink-0 w-44 h-56 relative cursor-pointer group
//              rounded-2xl overflow-hidden shadow-lg transition-all duration-500
//              hover:ring-2 hover:ring-yellow-400/70"
//               style={{ scrollSnapAlign: "center" }}
//             >
//               {/* تصویر دسته */}
//               <img
//                 src={`${cat.image}`}
//                 alt={cat.name}
//                 className="w-full h-full object-cover
//                transition-transform duration-700 group-hover:scale-110"
//               />

//               {/* لایه گرادیان پایین */}
//               <div
//                 className="absolute inset-x-0 bottom-0 h-24 pointer-events-none
//                bg-gradient-to-t from-black/80 to-transparent
//                rounded-b-2xl transition-all duration-500
//                group-hover:from-black/95"
//               ></div>

//               {/* نام دسته */}
//               <div className="absolute bottom-3 w-full text-center px-2">
//                 <span
//                   className="block text-lg sm:text-xl font-bold text-white drop-shadow-lg tracking-wide
//                      line-clamp-1 transition"
//                 >
//                   {cat.name}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ✨ متن راهنما */}
//       <p
//         className="text-xs sm:text-sm italic text-center mt-3 opacity-80"
//         style={{ color: primaryColor }}
//       >
//         ← برای دیدن دسته‌بندی‌ها بکشید →
//       </p>
//     </div>
//   );
// };

// export default FeaturedCategories;

// import { useTheme } from "../../contexts/useTheme";

// const FeaturedCategories = ({ categories, title = "دسته‌بندی‌ها" }) => {
//   const { theme } = useTheme();
//   const primaryColor = theme.primary_color;

//   if (!categories?.length) return null;

//   // ✅ منطق دست‌نخورده
//   const scrollToCategory = (categoryId) => {
//     const element = document.getElementById(`category-section-${categoryId}`);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "start" });
//       element.classList.add("ring-4", "ring-yellow-400/70");
//       setTimeout(() => {
//         element.classList.remove("ring-4", "ring-yellow-400/70");
//       }, 1200);
//     }
//   };

//   return (
//     <div className="mb-16 sm:mb-20" dir="rtl">
//       {/* هدر مینیمال-لوکس */}
//       <div className="text-center mb-8">
//         <h2
//           className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest"
//           style={{ color: primaryColor }}
//         >
//           {title}
//         </h2>
//         <div className="mt-3 flex items-center justify-center gap-2">
//           <span className="h-px w-24 bg-amber-400/60" />
//           <span className="text-xs sm:text-sm text-amber-900/80 bg-amber-100 border border-amber-200/70 rounded-full px-3 py-1">
//             انتخابی با کلاس جهانی
//           </span>
//           <span className="h-px w-24 bg-amber-400/60" />
//         </div>
//       </div>

//       {/* رِیل افقی با ماسک لبه‌ها و اسنپ */}
//       <div
//         className="overflow-x-auto scrollbar-hide px-3 sm:px-4 snap-x snap-mandatory"
//         style={{
//           WebkitOverflowScrolling: "touch",
//           WebkitMaskImage:
//             "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
//           maskImage:
//             "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
//         }}
//       >
//         <div
//           className="flex items-stretch gap-5 sm:gap-7 pb-2 sm:pb-3 pr-1"
//           style={{ width: "max-content" }}
//         >
//           {categories.map((cat) => (
//             <button
//               type="button"
//               key={cat.id}
//               aria-label={cat.name}
//               onClick={() => scrollToCategory(cat.id)}
//               onKeyDown={(e) =>
//                 (e.key === "Enter" || e.key === " ") && scrollToCategory(cat.id)
//               }
//               className="
//                 group relative flex-shrink-0 snap-center
//                 w-40 sm:w-48 md:w-56
//                 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
//               "
//               style={{ scrollSnapAlign: "center" }}
//             >
//               {/* بشقاب پرسلن با رینگ طلایی */}
//               <div className="relative aspect-square rounded-full plate shadow-[0_25px_70px_-30px_rgba(0,0,0,.45)]">
//                 {/* تصویر داخل بشقاب */}
//                 <div className="absolute inset-[12%] sm:inset-[10%] rounded-full overflow-hidden ring-1 ring-black/5">
//                   <img
//                     src={`${cat.image}`}
//                     alt={cat.name}
//                     loading="lazy"
//                     className="
//                       w-full h-full object-cover
//                       transition-transform duration-500 ease-out
//                       group-hover:scale-[1.06]
//                     "
//                   />
//                   {/* هاله ملایم برای عمق */}
//                   <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
//                 </div>

//                 {/* رینگ طلایی براق */}
//                 <div className="absolute inset-0 rounded-full gold-ring pointer-events-none" />

//                 {/* سایه زیر بشقاب */}
//                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-3 rounded-full bg-black/15 blur-md opacity-70" />
//               </div>

//               {/* عنوان خارج از کارت (متفاوت با محصولات ویژه) */}
//               <div className="mt-3 text-center select-none">
//                 <span className="block text-sm sm:text-base font-extrabold tracking-wide text-[#2b211b] line-clamp-1">
//                   {cat.name}
//                 </span>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* راهنمای اسکرول */}
//       <div className="flex justify-center mt-4">
//         <p
//           className="text-[11px] sm:text-xs italic opacity-80 animate-pulse"
//           style={{ color: primaryColor }}
//         >
//           ← برای دیدن دسته‌بندی‌ها بکشید →
//         </p>
//       </div>

//       {/* استایل‌های اختصاصی بشقاب/رینگ */}
//       <style>{`
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//         .scrollbar-hide::-webkit-scrollbar { display: none; }

//         .plate {
//           background:
//             radial-gradient(120% 120% at 30% 20%, #ffffff 0%, #f7f2ea 38%, #efe5d8 60%, #e7dccb 100%);
//           border: 1px solid rgba(0,0,0,0.06);
//         }
//         .gold-ring {
//           background:
//             conic-gradient(from 0deg,
//               rgba(212,163,115,0.2), rgba(212,163,115,0.55) 12%,
//               rgba(255,225,170,0.7) 25%, rgba(212,163,115,0.55) 40%,
//               rgba(212,163,115,0.2) 55%, rgba(212,163,115,0.55) 72%,
//               rgba(255,225,170,0.75) 84%, rgba(212,163,115,0.5) 100%);
//           filter: saturate(1.2);
//           -webkit-mask: radial-gradient(circle at center, transparent 60%, black 61%);
//                   mask: radial-gradient(circle at center, transparent 60%, black 61%);
//           opacity: .9;
//         }

//         /* هاور لطیف: کمی چرخش بشقاب */
//         .plate:hover { transform: rotate(-.8deg); transition: transform .35s ease; }
//       `}</style>
//     </div>
//   );
// };

// export default FeaturedCategories;
import { useTheme } from "../../contexts/useTheme";

const FeaturedCategories = ({ categories, title = "دسته‌بندی‌ها" }) => {
  const { theme } = useTheme();
  const primaryColor = theme.primary_color;

  if (!categories?.length) return null;

  // ✅ منطق دست‌نخورده
  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(`category-section-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      element.classList.add("ring-4", "ring-yellow-400/70");
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-yellow-400/70");
      }, 1200);
    }
  };

  return (
    <div
      className="mb-16 sm:mb-20"
      dir="rtl"
      data-section="featured-categories"
    >
      {/* هدر ویترین‌طور */}
      <header className="text-center mb-8">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest drop-shadow-[0_2px_0_rgba(0,0,0,.04)]"
          style={{ color: primaryColor }}
        >
          {title}
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-[#3e2c22]/80">
          کلکسیونی از دسته‌ها برای انتخاب سریع – الهام‌گرفته از تجربه‌ی
          رستوران‌های برتر
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="h-px w-20 bg-amber-400/60" />
          <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs bg-amber-100 text-amber-900 border border-amber-200/60 shadow-sm">
            طراحی لوکس، آماده‌ی دمو
          </span>
          <span className="h-px w-20 bg-amber-400/60" />
        </div>
      </header>

      {/* رِیل افقی با ماسک لبه‌ها و اسنپ */}
      <div
        className="overflow-x-auto scrollbar-hide px-3 sm:px-4 snap-x snap-mandatory select-none"
        style={{
          WebkitOverflowScrolling: "touch",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
        }}
        aria-label="لیست دسته‌بندی‌ها (اسکرول افقی)"
      >
        <div
          className="flex items-stretch gap-5 sm:gap-7 pb-2 sm:pb-3 pr-1"
          style={{ width: "max-content" }}
        >
          {categories.map((cat, idx) => (
            <button
              type="button"
              key={cat.id}
              aria-label={`مشاهده دسته ${cat.name}`}
              title={cat.name}
              data-category-id={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && scrollToCategory(cat.id)
              }
              className="
                group relative flex-shrink-0 snap-center
                w-36 sm:w-44 md:w-52
                focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
              "
              style={{ scrollSnapAlign: "center" }}
            >
              {/* بشقاب پرسلن با رینگ طلایی */}
              <div
                className="
                  relative aspect-square rounded-full plate
                  shadow-[0_22px_60px_-28px_rgba(0,0,0,.45)]
                  transition-transform duration-300
                  will-change-transform
                  hover:scale-[1.02]
                  motion-reduce:transition-none motion-reduce:hover:scale-100
                "
              >
                {/* تصویر داخل بشقاب */}
                <div className="absolute inset-[12%] sm:inset-[10%] rounded-full overflow-hidden ring-1 ring-black/5">
                  {/* اگر تصویر نبود، حرف اول نام را بگذار */}
                  {cat?.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="
                        w-full h-full object-cover
                        transition-transform duration-500 ease-out
                        group-hover:scale-[1.06]
                        motion-reduce:transition-none motion-reduce:group-hover:scale-100
                      "
                      onError={(e) =>
                        (e.currentTarget.style.visibility = "hidden")
                      }
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center bg-[#f3ebe2]">
                      <span className="text-2xl sm:text-3xl font-black text-amber-700">
                        {cat.name?.[0] ?? "?"}
                      </span>
                    </div>
                  )}
                  {/* هاله عمق */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
                  {/* CTA روی هاور/تاچ */}
                  <div
                    className="
                      absolute inset-0 opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      bg-black/25
                      grid place-items-center
                      motion-reduce:transition-none
                    "
                  >
                    <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-amber-400 text-amber-950 border border-amber-500/50 shadow">
                      مشاهده
                    </span>
                  </div>
                </div>

                {/* رینگ طلایی براق */}
                <div className="absolute inset-0 rounded-full gold-ring pointer-events-none" />

                {/* چیپ «پرفروش» برای سه مورد اول (صرفاً نمایشی) */}
                {idx < 3 && (
                  <span
                    className="
                      absolute top-1.5 -left-1.5 z-10
                      px-2 py-0.5 rounded-full text-[10px] sm:text-xs
                      bg-amber-500 text-amber-950 border border-amber-600/50 shadow
                    "
                    aria-hidden="true"
                  >
                    پرفروش
                  </span>
                )}

                {/* سایه زیر بشقاب */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-3 rounded-full bg-black/15 blur-md opacity-70" />
              </div>

              {/* عنوان خارج از کارت */}
              <div className="mt-3 text-center">
                <span className="block text-sm sm:text-base font-extrabold tracking-wide text-[#2b211b] line-clamp-1">
                  {cat.name}
                </span>
                {/* توضیح کوتاه اختیاری اگر داشتید: cat.subtitle */}
                {cat.subtitle && (
                  <span className="block text-[11px] sm:text-xs text-[#5c4330]/80 line-clamp-1">
                    {cat.subtitle}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* راهنمای اسکرول */}
      <div className="flex justify-center mt-4">
        <p
          className="text-[11px] sm:text-xs italic opacity-80 animate-pulse"
          style={{ color: primaryColor }}
        >
          ← برای دیدن دسته‌بندی‌ها بکشید →
        </p>
      </div>

      {/* استایل‌های اختصاصی */}
      <style>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }

        .plate {
          background:
            radial-gradient(120% 120% at 30% 20%, #ffffff 0%, #f7f2ea 38%, #efe5d8 60%, #e7dccb 100%);
          border: 1px solid rgba(0,0,0,0.06);
        }
        .gold-ring {
          background:
            conic-gradient(from 0deg,
              rgba(212,163,115,0.2), rgba(212,163,115,0.55) 12%,
              rgba(255,225,170,0.7) 25%, rgba(212,163,115,0.55) 40%,
              rgba(212,163,115,0.2) 55%, rgba(212,163,115,0.55) 72%,
              rgba(255,225,170,0.75) 84%, rgba(212,163,115,0.5) 100%);
          filter: saturate(1.2);
          -webkit-mask: radial-gradient(circle at center, transparent 60%, black 61%);
                  mask: radial-gradient(circle at center, transparent 60%, black 61%);
          opacity: .9;
        }

        /* احترام به کاربرانی که انیمیشن نمی‌خواهند */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default FeaturedCategories;
