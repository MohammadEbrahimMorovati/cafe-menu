import { useEffect, useState, useMemo } from "react";
import { getAllProducts } from "../../services/products/productService";
import { getAllCategories } from "../../services/category/categoryService";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import StickyHeader from "../../components/header/StickyHeader";
import FeaturedCategories from "../../components/category/FeaturedCategories";
import FeaturedProducts from "../../components/product/FeaturedProducts";
import CategorySection from "../../components/category/CategorySection";
import { useTheme } from "../../contexts/useTheme";
import CartDrawer from "../../components/cart/CartDrawer";
import { borderStyles } from "../../theme/borderStyles";

const HomePage = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // کلاس حاشیه از سرور + مقدار پیش‌فرض اگر نبود
  const borderClasses = useMemo(() => {
    const defaultStyle =
      "max-w-2xl mx-auto rounded-[57px] p-2 border-[7px] border-solid border-[#000000]";
    if (!theme?.border_style?.id) return defaultStyle;

    const selectedStyle = borderStyles.find(
      (style) => style.id === theme.border_style.id
    );
    return selectedStyle?.cssStyle || defaultStyle;
  }, [theme]);

  console.log("====================================");
  console.log("borderClasses :", borderClasses);
  console.log("====================================");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(productsRes?.data?.results ?? []);
        setCategories(categoriesRes?.data?.results ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // ⚠️ نیازی به theme اینجا نیست

  const handleCategoryClick = (categoryId) => {
    const targetProduct = products.find((p) => p.categoryId === categoryId);
    const element = document.getElementById(`product-${targetProduct?.id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (loading) return <LoadingSpinner />;

  console.log("theme.secondary_color :", theme.secondary_color);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.primary_color }}
    >
      <StickyHeader />

      <main className="p-4 pt-0">
        <section
          className={borderClasses}
          style={{ "--bcolor": theme.secondary_color }}
        >
          <div
            className="p-6 rounded-[40px]"
            style={{ backgroundColor: theme.secondary_color }}
          >
            <FeaturedCategories
              categories={categories}
              title="دسته‌بندی‌ها"
              onCategoryClick={handleCategoryClick}
            />

            <FeaturedProducts products={products} title="محصولات ویژه" />
            <div className="space-y-6">
              {[
                ...new Map(
                  products.map((p) => [p.category, p.category_name])
                ).entries(),
              ].map(([categoryId, categoryName]) => {
                const categoryProducts = products.filter(
                  (p) => p.category === categoryId
                );

                return (
                  <CategorySection
                    key={categoryId} // 👈 دسته
                    products={categoryProducts} // 👈 محصولات اون دسته
                    categoryId={categoryId}
                    title={categoryName}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <CartDrawer />
    </div>
  );
};

export default HomePage;
