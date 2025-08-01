import { getCategoryIcon } from "../../constants";

const FeaturedProducts = ({ products, title = "برگر" }) => {
  return (
    <div className="flex justify-center gap-4 mb-6">
      {products.slice(0, 3).map((product) => (
        <div key={product.id} className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
            <span className="text-[#613A27] text-2xl">
              {getCategoryIcon(product.categoryId)}
            </span>
          </div>
          <span className="text-[#613A27] text-sm font-medium">{title}</span>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
