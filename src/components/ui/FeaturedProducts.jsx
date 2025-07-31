import { CATEGORIES } from "../../constants";

const FeaturedProducts = ({ products, title = "برگر" }) => {
  // تابع برای تعیین آیکون بر اساس دسته‌بندی
  const getCategoryIcon = (categoryId) => {
    switch (categoryId) {
      case CATEGORIES.BURGER:
        return "🍔";
      case CATEGORIES.PIZZA:
        return "🍕";
      case CATEGORIES.SANDWICH:
        return "🥪";
      case CATEGORIES.SALAD:
        return "🥗";
      case CATEGORIES.SOUP:
        return "🍲";
      case CATEGORIES.KEBAB:
        return "🍖";
      case CATEGORIES.IRANIAN:
        return "🍚";
      case CATEGORIES.PASTA:
        return "🍝";
      case CATEGORIES.CAKE:
        return "🍰";
      case CATEGORIES.JUICE:
        return "🧃";
      case CATEGORIES.COFFEE:
        return "☕";
      case CATEGORIES.TEA:
        return "🫖";
      case CATEGORIES.HERBAL:
        return "🌿";
      case CATEGORIES.SHAKE:
        return "🥤";
      case CATEGORIES.SMOOTHIE:
        return "🥤";
      default:
        return "🍽️";
    }
  };

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
