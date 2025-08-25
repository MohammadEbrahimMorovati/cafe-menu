"use client";
import { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

export default function CartDrawer() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* دکمه شناور */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-gradient-to-br from-yellow-400 to-yellow-600 text-brown-900 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* بک‌دراپ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* پنل کشویی */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white/30 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-l border-white/20 transform transition-transform duration-300 flex flex-col z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* هدر */}
        <div className="flex justify-between items-center p-4 border-b border-white/20 shrink-0">
          <h2 className="text-lg font-extrabold text-brown-900 tracking-wide">
            🛍️ سبد خرید
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-full"
          >
            <X className="w-6 h-6 text-brown-800" />
          </button>
        </div>

        {/* آیتم‌ها */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <p className="text-center text-brown-700 italic">
              سبد خرید خالی است 🛒
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg p-3 transition hover:scale-[1.02]"
              >
                <div>
                  <h3 className="font-semibold text-brown-900">{item.name}</h3>
                  <p className="text-sm text-brown-600">
                    {item.price.toLocaleString("fa-IR")} تومان
                  </p>

                  {/* کنترل تعداد */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <Minus className="w-4 h-4 text-brown-800" />
                    </button>
                    <span className="px-2 font-bold text-brown-900">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <Plus className="w-4 h-4 text-brown-800" />
                    </button>
                  </div>
                </div>

                {/* قیمت کل + حذف */}
                <div className="flex flex-col items-end gap-2">
                  <span className="text-brown-900 font-bold text-sm">
                    {(item.qty * item.price).toLocaleString("fa-IR")} تومان
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 rounded-full hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* فوتر */}
        <div className="p-4 border-t border-white/20 shrink-0 bg-white/30 backdrop-blur-xl">
          <p className="flex justify-between font-bold text-brown-900 text-lg">
            <span>جمع کل:</span>
            <span>{total.toLocaleString("fa-IR")} تومان</span>
          </p>
          <button className="w-full mt-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-brown-900 font-extrabold py-3 rounded-xl shadow-lg hover:scale-[1.02] transition">
            ادامه سفارش →
          </button>
        </div>
      </div>
    </>
  );
}
