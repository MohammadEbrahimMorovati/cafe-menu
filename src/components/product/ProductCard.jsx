import { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { calculateFinalPrice } from "../../services/products/productService";
import ProductModal from "./ProductModal";

const FAV_KEY = "favorite_ids";

// --- LS helpers ---
const readFavs = () =>
  new Set(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
const writeFavs = (set) =>
  localStorage.setItem(FAV_KEY, JSON.stringify([...set]));

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  if (!product) return null;

  const { id, name, description, price, discount = 0, image } = product;
  const hasDiscount = discount > 0;

  // قیمت‌ها
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

  const toggleFavorite = () => {
    const favs = readFavs();
    favs.has(id) ? favs.delete(id) : favs.add(id);
    writeFavs(favs);
    setIsFavorite(favs.has(id));
    if (navigator.vibrate) navigator.vibrate(12);
  };

  // باز/بستن مودال
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* کارت محصول */}
      <div
        className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer"
        dir="rtl"
      >
        {/* تصویر */}
        <img
          src={`/images/${image || "cat-default.jpg"}`}
          alt={name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => (e.currentTarget.src = "/images/cat-default.jpg")}
          onClick={() => setShowModal(true)} // 👈 باز کردن مودال
        />

        {/* ❤️ علاقه‌مندی */}
        <button
          onClick={toggleFavorite}
          aria-label={
            isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
          }
          className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/85 backdrop-blur shadow hover:bg-white transition"
        >
          <Heart
            size={20}
            className={`${
              isFavorite
                ? "text-red-500 fill-red-500 scale-110"
                : "text-gray-400 scale-100"
            } transition-transform duration-200`}
          />
        </button>

        {/* گرادیان و اطلاعات */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
        <div
          className="absolute bottom-0 left-0 right-0 z-10 p-3 text-white"
          onClick={() => setShowModal(true)} // 👈 باز کردن مودال
        >
          <h3 className="font-title tracking-tight font-extrabold text-lg mb-1">
            {name}
          </h3>

          {description && (
            <p className="font-body text-sm opacity-90 mb-2 line-clamp-2">
              {description}
            </p>
          )}

          {/* 💲 قیمت */}
          <div className="flex items-center gap-2 font-body mb-2">
            {hasDiscount ? (
              <>
                <span className="text-red-300 line-through text-sm">
                  {formattedPrice} تومان
                </span>
                <span className="px-2 py-0.5 bg-green-600/90 rounded-lg text-sm font-bold">
                  {formattedFinalPrice} تومان
                </span>
              </>
            ) : (
              <span className="px-2 py-0.5 bg-yellow-500/90 rounded-lg text-sm font-bold">
                {formattedPrice} تومان
              </span>
            )}
          </div>

          {/* 🛒 افزودن به سبد */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // جلوگیری از باز شدن مودال با کلیک روی دکمه
              addToCart({ id, name, price: finalPrice, qty: 1 });
              if (navigator.vibrate) navigator.vibrate(15);
            }}
            className="w-full bg-yellow-500 text-brown-900 font-bold py-1.5 rounded-lg 
             hover:bg-yellow-400 active:scale-95 transition-transform duration-150 
             shadow-md hover:shadow-lg"
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>

      {/* استفاده از ProductModal جدا */}
      <ProductModal
        product={product}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddToCart={(p) =>
          addToCart({ id: p.id, name: p.name, price: finalPrice, qty: 1 })
        }
      />
    </>
  );
};

export default ProductCard;
