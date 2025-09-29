import ProductCard from "../product/ProductCard";
import SectionDivider from "../ui/SectionDivider";

const CategorySection = ({ categoryId, title, products }) => {
  // ⛔ اگر این دسته محصولی نداره، هیچی نشون نده
  if (!products?.length) return null;

  return (
    <div id={`category-section-${categoryId}`} className="mb-3">
      {/* 🏷 عنوان دسته‌بندی */}
      <SectionDivider title={title} />

      {/* 📜 لیست محصولات */}
      <div className="grid grid-cols-1 gap-4 items-stretch">
        {products.map((product) => (
          <div
            id={`product-${categoryId}-${product.id}`} // ✅ ترکیب دسته + محصول
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
