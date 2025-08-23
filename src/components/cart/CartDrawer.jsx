"use client";
import { useState } from "react";
import { X, Trash2 } from "lucide-react"; // 🗑 آیکون حذف
import { useCart } from "../../contexts/CartContext";

export default function CartDrawer() {
  const { cartItems, removeFromCart } = useCart(); // 🛒 گرفتن removeFromCart
  const [isOpen, setIsOpen] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* دکمه شناور */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-yellow-500 text-brown-900 p-4 rounded-full shadow-xl hover:bg-yellow-400 transition z-50"
      >
        🛒
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* بک‌دراپ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* پنل کشویی */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#fdf5e6] shadow-2xl transform transition-transform duration-300 flex flex-col z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* هدر */}
        <div className="flex justify-between items-center p-4 border-b border-brown-300 shrink-0">
          <h2 className="text-lg font-bold text-brown-800">سبد خرید شما</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-brown-700" />
          </button>
        </div>

        {/* آیتم‌ها */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <p className="text-center text-brown-600">سبد خرید خالی است 🛒</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white rounded-xl shadow p-3"
              >
                <div>
                  <h3 className="font-semibold text-brown-800">{item.name}</h3>
                  <p className="text-sm text-brown-600">
                    {item.qty} × {item.price.toLocaleString("fa-IR")} تومان
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-brown-900 font-bold text-sm">
                    {(item.qty * item.price).toLocaleString("fa-IR")} تومان
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 rounded-full hover:bg-red-100"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* فوتر */}
        <div className="p-4 border-t border-brown-300 shrink-0 bg-[#fdf5e6]">
          <p className="flex justify-between font-bold text-brown-800">
            <span>جمع کل:</span>
            <span>{total.toLocaleString("fa-IR")} تومان</span>
          </p>
          <button className="w-full mt-3 bg-yellow-500 text-brown-900 font-bold py-2 rounded-xl hover:bg-yellow-400 transition">
            ادامه سفارش
          </button>
        </div>
      </div>
    </>
  );
}
