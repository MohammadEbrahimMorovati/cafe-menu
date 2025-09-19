import { X } from "lucide-react";

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  const { name, description, image, price, discount = 0 } = product;
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price - (price * discount) / 100 : price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#fffaf4] w-full max-w-md rounded-3xl shadow-xl overflow-hidden relative animate-fadeIn border border-white/30">
        {/* دکمه بستن */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-brown-800/70 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        {/* عکس محصول */}
        <div className="w-full h-60 bg-[#f3ebe2]">
          <img
            src={image || "cat-default.jpg"}
            alt={name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* اطلاعات محصول */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-extrabold text-[#3e2c22] mb-2">
            {name}
          </h2>

          {description && (
            <p className="text-sm text-[#5c4330] mb-4 leading-relaxed">
              {description}
            </p>
          )}

          {/* قیمت */}
          <div className="mb-6">
            {hasDiscount ? (
              <div className="flex justify-center items-center gap-3">
                <span className="line-through text-gray-400 text-sm">
                  {price.toLocaleString("fa-IR")} تومان
                </span>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  {finalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            ) : (
              <span className="bg-yellow-400 text-[#3e2c22] px-3 py-1 rounded-full text-sm">
                {price.toLocaleString("fa-IR")} تومان
              </span>
            )}
          </div>

          {/* دکمه افزودن به سبد خرید */}
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="w-full bg-[#3e2c22] text-white font-semibold py-2.5 rounded-xl hover:bg-[#5a3f2e] transition-all duration-200 shadow-sm"
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
