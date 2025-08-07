import { useEffect, useState } from "react";
import {
  getAllProducts,
  getBurgerProducts,
} from "../../services/products/productService";
import { getAllCategories } from "../../services/category/categoryService";
import { CATEGORIES } from "../../constants";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import StickyHeader from "../../components/ui/StickyHeader";
import FeaturedCategories from "../../components/ui/FeaturedCategories";
import FeaturedProducts from "../../components/ui/FeaturedProducts";
import SectionDivider from "../../components/ui/SectionDivider";
import ProductCard from "../../components/ui/ProductCard";
import CategorySection from "../../components/ui/CategorySection";
import { useTheme } from "../../contexts/useTheme";

const HomePage = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    const targetProduct = products.find((p) => p.categoryId === categoryId);
    const element = document.getElementById(`product-${targetProduct?.id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.primary }}>
      <StickyHeader />

      <main className="p-4 pt-0">
        <section
          className="max-w-2xl mx-auto border-5 border-dashed rounded-[57px] p-2"
          style={{ borderColor: theme.secondary }}
        >
          <div
            className="p-6 rounded-[40px]"
            style={{ backgroundColor: theme.secondary }}
          >
            <FeaturedCategories
              categories={categories}
              title="دسته‌بندی‌ها"
              onCategoryClick={handleCategoryClick}
            />

            <FeaturedProducts products={products} title="محصولات ویژه" />

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
    </div>
  );
};

export default HomePage;
