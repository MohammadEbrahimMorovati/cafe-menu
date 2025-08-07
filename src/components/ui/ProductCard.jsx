import { calculateFinalPrice } from "../../services/products/productService";
import { getCategoryIcon } from "../../constants";
import { useTheme } from "../../contexts/useTheme";

const ProductCard = ({ product, showImage = true }) => {
  const { theme } = useTheme();

  const { id, name, description, price, discount = 0, categoryId } = product;

  const hasDiscount = discount > 0;
  const formattedPrice = price.toLocaleString("fa-IR");
  const formattedFinalPrice = calculateFinalPrice(
    price,
    discount
  ).toLocaleString("fa-IR");

  const priceSection = hasDiscount ? (
    <>
      <span className="text-red-500 line-through text-sm">
        {formattedPrice} تومان
      </span>
      <span className="text-green-600 font-bold">
        {formattedFinalPrice} تومان
      </span>
    </>
  ) : (
    <span className="font-bold" style={{ color: theme.primary }}>
      {formattedPrice} تومان
    </span>
  );

  return (
    <div
      id={`product-section-${id}`}
      className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
    >
      {/* متن و اطلاعات محصول */}
      <div className="flex-1">
        <h3 className="font-bold text-lg mb-1" style={{ color: theme.primary }}>
          {name}
        </h3>
        <p className="text-sm opacity-80 mb-2" style={{ color: theme.primary }}>
          {description}
        </p>
        <div className="flex items-center gap-2">{priceSection}</div>
      </div>

      {/* آیکون یا عکس */}
      {showImage && (
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center ml-4">
          <span className="text-2xl" style={{ color: theme.primary }}>
            {getCategoryIcon(categoryId)}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
