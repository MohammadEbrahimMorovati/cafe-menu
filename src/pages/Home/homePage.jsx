// import { useEffect, useState, useMemo } from "react";
// import { getAllProducts } from "../../services/products/productService";
// import { getAllCategories } from "../../services/category/categoryService";
// import LoadingSpinner from "../../components/ui/LoadingSpinner";
// import StickyHeader from "../../components/header/StickyHeader";
// import FeaturedCategories from "../../components/category/FeaturedCategories";
// import FeaturedProducts from "../../components/product/FeaturedProducts";
// import CategorySection from "../../components/category/CategorySection";
// import { useTheme } from "../../contexts/useTheme";
// import CartDrawer from "../../components/cart/CartDrawer";
// import { borderStyles } from "../../theme/borderStyles";

// const HomePage = () => {
//   const { theme } = useTheme();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // کلاس حاشیه از سرور + مقدار پیش‌فرض اگر نبود
//   const borderClasses = useMemo(() => {
//     const defaultStyle =
//       "max-w-2xl mx-auto rounded-[57px] p-2 border-[7px] border-solid border-[#000000]";
//     if (!theme?.border_style?.id) return defaultStyle;

//     const selectedStyle = borderStyles.find(
//       (style) => style.id === theme.border_style.id
//     );
//     return selectedStyle?.cssStyle || defaultStyle;
//   }, [theme]);

//   console.log("====================================");
//   console.log("borderClasses :", borderClasses);
//   console.log("====================================");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productsRes, categoriesRes] = await Promise.all([
//           getAllProducts(),
//           getAllCategories(),
//         ]);
//         setProducts(productsRes?.data?.results ?? []);
//         setCategories(categoriesRes?.data?.results ?? []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []); // ⚠️ نیازی به theme اینجا نیست

//   const handleCategoryClick = (categoryId) => {
//     const targetProduct = products.find((p) => p.categoryId === categoryId);
//     const element = document.getElementById(`product-${targetProduct?.id}`);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   };

//   if (loading) return <LoadingSpinner />;

//   console.log("theme.secondary_color :", theme.secondary_color);

//   return (
//     <div
//       className="min-h-screen"
//       style={{ backgroundColor: theme.primary_color }}
//     >
//       <StickyHeader />

//       <main className="p-4 pt-0">
//         <section
//           className={borderClasses}
//           style={{ "--bcolor": theme.secondary_color }}
//         >
//           <div
//             className="p-6 rounded-[40px]"
//             style={{ backgroundColor: theme.secondary_color }}
//           >
//             <FeaturedCategories
//               categories={categories}
//               title="دسته‌بندی‌ها"
//               onCategoryClick={handleCategoryClick}
//             />

//             <FeaturedProducts products={products} title="محصولات ویژه" />
//             <div className="space-y-6">
//               {categories.map(({ id, name }) => {
//                 // فقط محصولاتی که دسته‌بندیشون برابر با id هست
//                 const categoryProducts = products.filter(
//                   (product) => product.category === id
//                 );

//                 return (
//                   <CategorySection
//                     key={id}
//                     products={categoryProducts} // 👈 فقط محصولات همون دسته
//                     categoryId={id}
//                     title={name}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       </main>

//       <CartDrawer />
//     </div>
//   );
// };

// export default HomePage;
"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllProducts } from "../../services/products/productService";
import { getAllCategories } from "../../services/category/categoryService";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import StickyHeader from "../../components/header/StickyHeader";
import FeaturedCategories from "../../components/category/FeaturedCategories";
import FeaturedProducts from "../../components/product/FeaturedProducts";
import CategorySection from "../../components/category/CategorySection";
import CartDrawer from "../../components/cart/CartDrawer";

import { useTheme } from "../../contexts/useTheme";
import { borderStyles } from "../../theme/borderStyles";

const HomePage = () => {
  const { theme } = useTheme();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // رنگ‌های fallback اگر از سرور نیاد
  const primaryBg = theme?.primary_color || "#fffaf4";
  const surfaceBg = theme?.secondary_color || "#ffffff";

  // قاب دور (از سرور یا پیش‌فرض)
  const borderClasses = useMemo(() => {
    const def =
      "max-w-6xl mx-auto rounded-[48px] p-2 border-[7px] border-solid border-[#000]";
    const id = theme?.border_style?.id;
    if (!id) return def;
    const selected = borderStyles.find((s) => s.id === id);
    return selected?.cssStyle || def;
  }, [theme?.border_style?.id]);

  // واکشی دیتـا
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(productsRes?.data?.results ?? []);
        setCategories(categoriesRes?.data?.results ?? []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // آماده‌سازی سکشن‌ها: ترتیب طبق categories، فیلتر محصولات هر دسته
  const sections = useMemo(() => {
    if (!categories?.length) return [];
    return categories
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        // توجه: اگر کلید دسته در محصول چیز دیگری‌ست، اینجا همسان کن
        products: products.filter((p) => p.category === cat.id),
      }))
      .filter((s) => s.products.length > 0);
  }, [categories, products]);

  if (loading) return <LoadingSpinner />;

  return (
    <div
      dir="rtl"
      className="min-h-screen"
      style={{
        // بک‌گراند لطیفِ لوکس برای حس برند پریمیوم
        background: `linear-gradient(180deg, ${primaryBg} 0%, ${primaryBg} 50%, ${surfaceBg} 100%)`,
      }}
    >
      <StickyHeader />

      <main className="p-4 pt-0">
        <section className={borderClasses} style={{ "--bcolor": surfaceBg }}>
          <div
            className="p-4 sm:p-6 rounded-[40px]"
            style={{ backgroundColor: surfaceBg }}
          >
            {/* دسته‌بندی‌ها (ویترین) */}
            <FeaturedCategories categories={categories} title="دسته‌بندی‌ها" />

            {/* محصولات ویژه */}
            <div className="mt-6 sm:mt-8">
              <FeaturedProducts products={products} title="محصولات ویژه" />
            </div>

            {/* سکشن‌های هر دسته با anchor برای اسکرول FeaturedCategories */}
            <div className="mt-8 sm:mt-10 space-y-8 sm:space-y-10">
              {sections.map((s) => (
                <section
                  key={s.id}
                  id={`category-section-${s.id}`}
                  className="scroll-mt-24 sm:scroll-mt-28"
                  aria-label={`سکشن ${s.name}`}
                >
                  <CategorySection
                    products={s.products}
                    categoryId={s.id}
                    title={s.name}
                  />
                </section>
              ))}

              {/* اگر هیچ سکشنی داده نداشت */}
              {sections.length === 0 && (
                <div className="text-center text-[#5c4330] bg-white/70 border border-amber-100 rounded-2xl p-8">
                  فعلاً محصولی برای نمایش اینجا نیست.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* سبد خرید شناور */}
      <CartDrawer />
    </div>
  );
};

export default HomePage;
