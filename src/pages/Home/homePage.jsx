import { useEffect, useState } from "react";
// 📦 هوک‌های React برای مدیریت state و lifecycle

import { getAllProducts } from "../../services/products/productService";
// 🛒 تابع گرفتن همه محصولات از سرویس محصولات

import { getAllCategories } from "../../services/category/categoryService";
// 🏷 تابع گرفتن همه دسته‌بندی‌ها از سرویس دسته‌ها

import LoadingSpinner from "../../components/ui/LoadingSpinner";
// ⏳ کامپوننت لودینگ

import StickyHeader from "../../components/header/StickyHeader";
// 📌 هدر چسبان

import FeaturedCategories from "../../components/category/FeaturedCategories";
// 🏷 دسته‌بندی‌های ویژه

import FeaturedProducts from "../../components/product/FeaturedProducts";
// 🛒 محصولات ویژه

import CategorySection from "../../components/category/CategorySection";
// 🏷 سکشن محصولات مربوط به هر دسته

import { useTheme } from "../../contexts/useTheme";
// 🎨 استفاده از تم داینامیک
import CartDrawer from "../../components/cart/CartDrawer";

// 📌 صفحه اصلی
const HomePage = () => {
  const { theme } = useTheme(); // 🎨 رنگ‌ها و استایل‌ها از تم
  const [products, setProducts] = useState([]); // لیست محصولات
  const [categories, setCategories] = useState([]); // لیست دسته‌بندی‌ها
  const [loading, setLoading] = useState(true); // وضعیت لودینگ

  // 📌 گرفتن محصولات و دسته‌ها همزمان
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔄 ارسال دو درخواست به صورت همزمان
        const [productsRes, categoriesRes] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(productsRes.data.results); // ذخیره محصولات
        setCategories(categoriesRes.data.results); // ذخیره دسته‌بندی‌ها
      } catch (error) {
        console.error("Error fetching data:", error); // ثبت خطا
      } finally {
        setLoading(false); // توقف حالت لودینگ
      }
    };

    fetchData();
  }, []);

  // 📌 اسکرول به اولین محصول دسته‌بندی
  const handleCategoryClick = (categoryId) => {
    const targetProduct = products.find((p) => p.categoryId === categoryId);
    const element = document.getElementById(`product-${targetProduct?.id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // ⏳ نمایش لودینگ اگر داده‌ها هنوز نیامده‌اند
  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.primary_color }}>
      {/* 📌 هدر چسبان */}
      <StickyHeader />

      <main className="p-4 pt-0">
        <section
          className="max-w-2xl mx-auto border-7 border-dashed rounded-[57px] p-2"
          style={{ borderColor: theme.secondary_color }}
        >
          <div
            className="p-6 rounded-[40px]"
            style={{ backgroundColor: theme.secondary_color }}
          >
            {/* 🏷 دسته‌بندی‌ها */}
            <FeaturedCategories
              categories={categories}
              title="دسته‌بندی‌ها"
              onCategoryClick={handleCategoryClick}
            />

            {/* 🛒 محصولات ویژه */}
            <FeaturedProducts products={products} title="محصولات ویژه" />

            {/* 📜 لیست سکشن‌های دسته‌ها */}
            <div className="space-y-6">
              {categories.map(({ id, name }) => (
                <CategorySection
                  key={id}
                  products={products}
                  categoryId={id}
                  title={name}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <CartDrawer />
    </div>
  );
};

export default HomePage; // 📤 خروجی گرفتن صفحه اصلی
