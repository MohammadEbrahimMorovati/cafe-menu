import { getProductsByCategory } from "../../services/products/productService";
import { CATEGORIES } from "../../constants";
import ProductCard from "./ProductCard";
import SectionDivider from "./SectionDivider";

const CategorySection = ({ products, categoryId, title }) => {
  const categoryProducts = products.filter(
    (product) => product.categoryId === categoryId
  );

  if (categoryProducts.length === 0) return null;

  return (
    <div className="mb-4">
      <SectionDivider title={title} />
      <div className="space-y-3">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
