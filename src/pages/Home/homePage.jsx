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

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // دریافت همزمان محصولات و دسته‌بندی‌ها از بک‌اند
    Promise.all([getAllProducts(), getAllCategories()])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // تابع اسکرول به اولین محصول هر دسته
  const handleCategoryClick = (categoryId) => {
    const targetProduct = products.find((p) => p.categoryId === categoryId);
    if (targetProduct) {
      const el = document.getElementById(`product-${targetProduct.id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  // فیلتر کردن محصولات برگر
  const burgerProducts = getBurgerProducts(products);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-[#613A27]">
      <StickyHeader />
      <div className="p-4 pt-0">
        <div className="max-w-2xl mx-auto">
          {/* لایه بیرونی با بردر نقطه‌چین */}
          <div className="border-5 border-dashed border-[#FBE6D3] rounded-[57px] p-2">
            {/* لایه داخلی با پس‌زمینه کرمی */}
            <div className="bg-[#FBE6D3] p-6 rounded-[40px]">
              {/* محصولات ویژه */}
              {/* <FeaturedProducts products={products} title="محصولات ویژه" /> */}
              <FeaturedCategories
                categories={categories}
                title="دسته‌بندی‌ها"
                onCategoryClick={handleCategoryClick}
              />

              {/* محصولات ویژه */}
              <FeaturedProducts products={products} title="محصولات ویژه" />

              {/* جداکننده */}
              <SectionDivider title="برگر" />

              {/* محصولات برگر */}
              <div className="space-y-4 mb-8">
                {burgerProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* سایر دسته‌بندی‌ها */}
              <div className="space-y-6">
                {categories
                  .filter((category) => category.id !== CATEGORIES.BURGER)
                  .map((category) => (
                    <CategorySection
                      key={category.id}
                      products={products}
                      categoryId={category.id}
                      title={category.name}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
