// const ProductCart = ({ products = [] }) => {
//   if (!products.length) return null;
//   console.log("cart");

//   return (
//     <div className="min-h-screen bg-[#613A27] flex items-center justify-center p-4">
//       <div className="border-4 border-dotted border-white rounded-2xl p-8 w-full max-w-7xl">
//         <div className="bg-[#FBE6D3] rounded-xl p-6 w-full">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {products.map((product) => {
//               const hasDiscount = product.discount && product.discount > 0;
//               const finalPrice = hasDiscount
//                 ? product.price - (product.price * product.discount) / 100
//                 : product.price;

//               return (
//                 <div
//                   key={product.id}
//                   className="bg-white border rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200"
//                 >
//                   <h2 className="text-lg font-bold mb-2 text-[#613A27]">
//                     {product.name}
//                   </h2>
//                   <p className="text-sm text-gray-700 mb-3">
//                     {product.description}
//                   </p>

//                   {hasDiscount ? (
//                     <div>
//                       <p className="line-through text-red-400 text-sm">
//                         {product.price.toLocaleString("fa-IR")} تومان
//                       </p>
//                       <p className="text-green-600 font-bold text-md">
//                         {finalPrice.toLocaleString("fa-IR")} تومان
//                       </p>
//                       <p className="text-sm text-orange-500">
//                         {product.discount}% تخفیف
//                       </p>
//                     </div>
//                   ) : (
//                     <p className="text-gray-800 font-semibold">
//                       {product.price.toLocaleString("fa-IR")} تومان
//                     </p>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCart;