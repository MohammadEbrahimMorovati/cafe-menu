import api from "../../api/api";

// دریافت تمام محصولات
export const getAllProducts = () => api.get("/products");

// دریافت محصولات بر اساس دسته‌بندی
export const getProductsByCategory = (categoryId) =>
  api.get(`/products?categoryId=${categoryId}`);

// دریافت محصول بر اساس ID
export const getProductById = (id) => api.get(`/products/${id}`);

// فیلتر کردن محصولات برگر
export const getBurgerProducts = (products) =>
  products.filter(
    (product) => product.categoryId === 1 || product.name.includes("برگر")
  );

// محاسبه قیمت نهایی با تخفیف
export const calculateFinalPrice = (price, discount) => {
  if (discount && discount > 0) {
    return price - (price * discount) / 100;
  }
  return price;
};
