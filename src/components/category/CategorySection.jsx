import { useEffect, useState } from "react";
// 📦 ایمپورت هوک‌های React برای مدیریت state و lifecycle

import { getProductsByCategory } from "../../services/products/productService";
// 📌 تابعی برای گرفتن لیست محصولات یک دسته‌بندی مشخص از سرویس محصولات

import ProductCard from "../product/ProductCard";
// 🛒 کامپوننت نمایش کارت محصول

import SectionDivider from "../ui/SectionDivider";
// 📏 کامپوننت جداکننده سکشن‌ها (عنوان و خط جداکننده)

// 📌 کامپوننتی برای نمایش لیست محصولات یک دسته‌بندی مشخص
const CategorySection = ({ categoryId, title }) => {
  // 🎯 state برای نگهداری لیست محصولات دسته‌بندی
  const [categoryProducts, setCategoryProducts] = useState([]);
  // ⏳ state برای مدیریت وضعیت لودینگ
  const [loading, setLoading] = useState(true);

  // 📌 وقتی categoryId تغییر کند، محصولات جدید آن دسته‌بندی لود می‌شوند
  useEffect(() => {
    setLoading(true); // شروع لودینگ
    getProductsByCategory(categoryId) // درخواست گرفتن محصولات دسته
      .then((res) => {
        setCategoryProducts(res.data); // ذخیره محصولات دریافتی
        setLoading(false); // پایان لودینگ
      })
      .catch(() => setLoading(false)); // در صورت خطا، لودینگ متوقف می‌شود
  }, [categoryId]);

  // ⛔ اگر هنوز در حال لود هستیم یا دسته‌بندی محصولی ندارد، هیچ چیزی نمایش نده
  if (loading || categoryProducts.length === 0) return null;

  return (
    <div id={`category-section-${categoryId}`} className="mb-3">
      {/* 🏷 عنوان دسته‌بندی با خط جداکننده */}
      <SectionDivider title={title} />
      {/* 📜 لیست محصولات دسته‌بندی */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-1 items-stretch">
        {categoryProducts.map((product) => (
          <div id={`product-section-${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection; // 📤 خروجی گرفتن کامپوننت برای استفاده در سایر بخش‌ها
