import { useEffect, useState } from "react";
import {
  getAllProducts,
  getBurgerProducts,
} from "../../services/products/productService";
import { CATEGORIES } from "../../constants";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import CoffeeLogo from "../../components/ui/CoffeeLogo";
import FeaturedProducts from "../../components/ui/FeaturedProducts";
import SectionDivider from "../../components/ui/SectionDivider";
import ProductCard from "../../components/ui/ProductCard";
import CategorySection from "../../components/ui/CategorySection";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // فیلتر کردن محصولات برگر
  const burgerProducts = getBurgerProducts(products);

  // دسته‌بندی‌های موجود (بدون برگر چون جداگانه نمایش داده می‌شود)
  const categories = [
    { id: CATEGORIES.PIZZA, title: "پیتزا" },
    { id: CATEGORIES.SANDWICH, title: "ساندویچ" },
    { id: CATEGORIES.SALAD, title: "سالاد" },
    { id: CATEGORIES.SOUP, title: "سوپ" },
    { id: CATEGORIES.KEBAB, title: "کباب" },
    { id: CATEGORIES.IRANIAN, title: "غذاهای ایرانی" },
    { id: CATEGORIES.PASTA, title: "پاستا" },
    { id: CATEGORIES.CAKE, title: "دسر" },
    { id: CATEGORIES.JUICE, title: "آبمیوه" },
    { id: CATEGORIES.COFFEE, title: "قهوه" },
    { id: CATEGORIES.TEA, title: "چای" },
    { id: CATEGORIES.HERBAL, title: "دمنوش" },
    { id: CATEGORIES.SHAKE, title: "شیک" },
    { id: CATEGORIES.SMOOTHIE, title: "اسموتی" },
  ];

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
            {categories.map((category) => (
              <CategorySection
                key={category.id}
                products={products}
                categoryId={category.id}
                title={category.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
