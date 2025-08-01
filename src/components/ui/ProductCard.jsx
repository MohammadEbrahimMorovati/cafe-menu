import { calculateFinalPrice } from "../../services/products/productService";
import { getCategoryIcon } from "../../constants";

const ProductCard = ({ product, showImage = true }) => {
  const hasDiscount = product.discount && product.discount > 0;
  const finalPrice = calculateFinalPrice(product.price, product.discount);

  return (
    <div
      id={`product-${product.id}`}
      className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex-1">
        <h3 className="text-[#613A27] font-bold text-lg mb-1">
          {product.name}
        </h3>
        <p className="text-[#613A27] text-sm opacity-80 mb-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-red-500 line-through text-sm">
                {product.price.toLocaleString("fa-IR")} تومان
              </span>
              <span className="text-green-600 font-bold">
                {finalPrice.toLocaleString("fa-IR")} تومان
              </span>
            </>
          ) : (
            <span className="text-[#613A27] font-bold">
              {product.price.toLocaleString("fa-IR")} تومان
            </span>
          )}
        </div>
      </div>
      {showImage && (
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center ml-4">
          <span className="text-[#613A27] text-2xl">
            {getCategoryIcon(product.categoryId)}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
