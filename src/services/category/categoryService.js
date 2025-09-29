import api from "../../api/api";

// دریافت تمام دسته‌بندی‌ها
export const getAllCategories = () => api.get(`/categories`);

// دریافت دسته‌بندی بر اساس ID
export const getCategoryById = (id) => api.get(`/categories/${id}`);

// ایجاد دسته‌بندی جدید
export const createCategory = (data) => api.post("/categories", data);

// به‌روزرسانی دسته‌بندی
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);

// حذف دسته‌بندی
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
