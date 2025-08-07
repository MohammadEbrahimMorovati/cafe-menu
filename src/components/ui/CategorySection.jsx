import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../services/products/productService";
import ProductCard from "./ProductCard";
import SectionDivider from "./SectionDivider";

const CategorySection = ({ categoryId, title }) => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductsByCategory(categoryId)
      .then((res) => {
        setCategoryProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryId]);

  if (loading || categoryProducts.length === 0) return null;

  return (
    <div id={`category-section-${categoryId}`} className="mb-3">
      <SectionDivider title={title} />
      <div className="space-y-2">
        {categoryProducts.map((product) => (
          <div id={`product-${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
