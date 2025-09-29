// src\services\products\productService.js
import api from "../../api/api";

// دریافت تمام محصولات
export const getAllProducts = (slug) => api.get(`${slug}/products`);

// دریافت محصولات بر اساس دسته‌بندی
export const getProductsByCategory = (categoryId) =>
  api.get(`/products?categoryId=${categoryId}`);

// دریافت محصول بر اساس ID
export const getProductById = (id) => api.get(`/products/${id}`);

// محاسبه قیمت نهایی با تخفیف
export const calculateFinalPrice = (price, discount) => {
  if (discount && discount > 0) {
    return price - (price * discount) / 100;
  }
  return price;
};
