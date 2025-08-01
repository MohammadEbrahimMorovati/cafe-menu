// import { getCategoryIcon } from "../../constants";
// import { calculateFinalPrice } from "../../services/products/productService";

// const FeaturedProducts = ({ products, title = "محصولات ویژه" }) => {
//   // تابع برای اسکرول به بخش مربوط به محصول
//   const scrollToProduct = (productId) => {
//     const element = document.getElementById(`product-${productId}`);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   };

//   if (!products || products.length === 0) {
//     return null;
//   }
//   return (
//     <div className="mb-6">
//       <h2 className="text-[#613A27] text-lg font-bold mb-4 text-center">
//         {title}
//       </h2>

//       {/* کانتینر اسکرول افقی */}
//       <div className="overflow-x-auto scrollbar-hide">
//         <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
//           {products.map((product) => {
//             const hasDiscount = product.discount && product.discount > 0;
//             const finalPrice = calculateFinalPrice(
//               product.price,
//               product.discount
//             );

//             return (
//               <div
//                 key={product.id}
//                 className="flex-shrink-0 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-[#613A27] min-w-[160px]"
//                 onClick={() => scrollToProduct(product.id)}
//               >
//                 {/* آیکون محصول */}
//                 <div className="w-16 h-16 bg-gray-100 rounded-lg mb-3 flex items-center justify-center mx-auto">
//                   <span className="text-[#613A27] text-2xl">
//                     {getCategoryIcon(product.categoryId)}
//                   </span>
//                 </div>

//                 {/* نام محصول */}
//                 <h3 className="text-[#613A27] text-sm font-medium text-center mb-2 line-clamp-2">
//                   {product.name}
//                 </h3>
//                 {/* قیمت */}
//                 <div className="text-center">
//                   {hasDiscount ? (
//                     <div className="space-y-1">
//                       <span className="text-red-500 line-through text-xs block">
//                         {product.price.toLocaleString("fa-IR")}
//                       </span>
//                       <span className="text-green-600 font-bold text-sm">
//                         {finalPrice.toLocaleString("fa-IR")} تومان
//                       </span>
//                     </div>
//                   ) : (
//                     <span className="text-[#613A27] font-bold text-sm">
//                       {product.price.toLocaleString("fa-IR")} تومان
//                     </span>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* نشانگر اسکرول */}
//       <div className="flex justify-center mt-2">
//         <div className="text-[#613A27] text-xs opacity-60">
//           ← برای دیدن محصولات بیشتر بکشید😊→
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProducts;

// import { getCategoryIcon } from "../../constants";

// const FeaturedCategories = ({ categories, title = "دسته‌بندی‌ها" }) => {
//   const scrollToCategory = (categoryId) => {
//     const element = document.getElementById(`category-${categoryId}`);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   };

//   if (!categories || categories.length === 0) {
//     return null;
//   }

//   return (
//     <div className="mb-6">
//       <h2 className="text-[#613A27] text-lg font-bold mb-4 text-center">
//         {title}
//       </h2>

//       <div className="overflow-x-auto scrollbar-hide">
//         <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
//           {categories.map((cat) => (
//             <div
//               key={cat.id}
//               id={`category-${cat.id}`}
//               className="flex-shrink-0 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-[#613A27] min-w-[120px]"
//               onClick={() => scrollToCategory(cat.id)}
//             >
//               {/* عکس یا آیکون دسته‌بندی */}
//               <div className="w-16 h-16 bg-gray-100 rounded-lg mb-3 flex items-center justify-center mx-auto overflow-hidden">
//                 {cat.image ? (
//                   <img
//                     src={`URL_TO_IMAGES/${cat.image}`}
//                     alt={cat.name}
//                     className="w-full h-full object-contain"
//                   />
//                 ) : (
//                   <span className="text-[#613A27] text-2xl">
//                     {getCategoryIcon(cat.id)}
//                   </span>
//                 )}
//               </div>
//               {/* نام دسته‌بندی */}
//               <h3 className="text-[#613A27] text-sm font-medium text-center mb-2 line-clamp-2">
//                 {cat.name}
//               </h3>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-center mt-2">
//         <div className="text-[#613A27] text-xs opacity-60">
//           ← برای دیدن دسته‌بندی‌های بیشتر بکشید 😊 →
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedCategories;

import { getCategoryIcon } from "../../constants";

const FeaturedCategories = ({ categories, title = "دسته‌بندی‌ها" }) => {
  // تابع اسکرول به سکشن دسته‌بندی مربوطه
  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(`category-section-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h2 className="text-[#613A27] text-lg font-bold mb-4 text-center">
        {title}
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex-shrink-0 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-[#613A27] min-w-[120px]"
              onClick={() => scrollToCategory(cat.id)}
            >
              {/* عکس یا آیکون دسته‌بندی */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg mb-3 flex items-center justify-center mx-auto overflow-hidden">
                {cat.image ? (
                  <img
                    src={`URL_TO_IMAGES/${cat.image}`}
                    alt={cat.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-[#613A27] text-2xl">
                    {getCategoryIcon(cat.id)}
                  </span>
                )}
              </div>
              {/* نام دسته‌بندی */}
              <h3 className="text-[#613A27] text-sm font-medium text-center mb-2 line-clamp-2">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <div className="text-[#613A27] text-xs opacity-60">
          ← برای دیدن دسته‌بندی‌های بیشتر بکشید 😊 →
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
