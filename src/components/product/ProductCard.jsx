import { calculateFinalPrice } from "../../services/products/productService";
import { useTheme } from "../../contexts/useTheme";

const getImagePath = (image) => {
  if (!image) return "/images/cat-default.jpg";
  return `/images/${image}`;
};

const ProductCard = ({ product, showImage = true }) => {
  const { theme } = useTheme();
  const { id, name, description, price, discount = 0, image } = product;

  const hasDiscount = discount > 0;
  const formattedPrice = price.toLocaleString("fa-IR");
  const formattedFinalPrice = calculateFinalPrice(
    price,
    discount
  ).toLocaleString("fa-IR");

  return (
    <div
      id={`product-section-${id}`}
      className="bg-[#fffaf0]/90 backdrop-blur-sm border border-yellow-400/30 
                 rounded-xl p-4 flex items-center justify-between 
                 shadow-[0_2px_8px_rgba(255,215,0,0.2)] transition-shadow"
    >
      {/* 📝 متن محصول */}
      <div className="flex-1">
        <h3
          className="font-bold text-base mb-1"
          style={{ color: theme.primary || "#b8860b" }} // طلایی پیشفرض
        >
          {name}
        </h3>
        <p className="text-xs text-gray-600 mb-2">{description}</p>

        {/* 💲 قیمت */}
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-red-500 line-through text-xs">
                {formattedPrice} تومان
              </span>
              <span className="px-2 py-0.5 bg-green-600/90 text-white rounded-full text-xs font-bold shadow-sm">
                {formattedFinalPrice} تومان
              </span>
            </>
          ) : (
            <span className="px-2 py-0.5 bg-yellow-500/90 text-white rounded-full text-xs font-bold shadow-sm">
              {formattedPrice} تومان
            </span>
          )}
        </div>
      </div>

      {/* 🖼 تصویر */}
      {showImage && (
        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center ml-4 overflow-hidden shadow-inner border border-yellow-400/20">
          <img
            src={getImagePath(image)}
            alt={name}
            className="w-full h-full object-contain"
            onError={(e) => (e.currentTarget.src = "/images/cat-default.jpg")}
          />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
