import { useEffect, useState } from "react";
import {
  getAllProducts,
  getBurgerProducts,
} from "../../services/products/productService";
import { getAllCategories } from "../../services/category/categoryService";
import { CATEGORIES } from "../../constants";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import CoffeeLogo from "../../components/ui/CoffeeLogo";
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

  // فیلتر کردن محصولات برگر
  const burgerProducts = getBurgerProducts(products);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-[#613A27] p-4">
      <div className="max-w-2xl mx-auto">
        <div className="border-4 border-dashed border-white rounded-[46px] p-6 bg-[#FBE6D3]">
          {/* لوگوی قهوه */}
          <CoffeeLogo />

          {/* بخش برگرهای ویژه */}
          <FeaturedProducts products={burgerProducts} title="برگر" />

          {/* خط جداکننده */}
          <SectionDivider title="برگر" />

          {/* منوی تفصیلی برگرها */}
          <div className="space-y-4 mb-8">
            {burgerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* تمام محصولات بر اساس دسته‌بندی */}
          <div className="space-y-6">
            {categories
              .filter(category => category.id !== CATEGORIES.BURGER) // حذف برگر چون جداگانه نمایش داده می‌شود
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
  );
};

export default HomePage;
