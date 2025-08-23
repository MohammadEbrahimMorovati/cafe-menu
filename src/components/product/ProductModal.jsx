import { X } from "lucide-react"; // برای دکمه بستن

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  const { name, description, image, price, discount = 0 } = product;
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price - (price * discount) / 100 : price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden relative animate-fadeIn">
        {/* دکمه بستن */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* عکس */}
        <img
          src={`/images/${image || "cat-default.jpg"}`}
          alt={name}
          className="w-full h-60 object-cover"
        />

        {/* اطلاعات */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          {description && <p className="text-gray-600 mb-4">{description}</p>}

          {/* قیمت */}
          <div className="mb-4">
            {hasDiscount ? (
              <div className="flex items-center gap-2">
                <span className="line-through text-gray-400 text-sm">
                  {price.toLocaleString("fa-IR")} تومان
                </span>
                <span className="bg-green-600 text-white px-2 py-0.5 rounded">
                  {finalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            ) : (
              <span className="bg-yellow-500 text-brown-900 px-2 py-0.5 rounded">
                {price.toLocaleString("fa-IR")} تومان
              </span>
            )}
          </div>

          {/* دکمه افزودن به سبد */}
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="w-full bg-yellow-500 text-brown-900 font-bold py-2 rounded-lg hover:bg-yellow-400 transition"
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
