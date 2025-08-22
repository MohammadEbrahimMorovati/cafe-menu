"use client";

import { useTheme } from "../../contexts/useTheme";
import { motion } from "framer-motion";

const getImagePath = (image) => {
  if (!image) return "/images/cat-default.jpg";
  return `/images/${image}`;
};

const FeaturedCategories = ({ categories, title = "دسته‌بندی‌ها" }) => {
  const { theme } = useTheme();
  const primaryColor = theme.primary;

  if (!categories?.length) return null;

  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(`category-section-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="mb-12">
      {/* 🏷 عنوان */}
      <h2
        className="text-2xl font-extrabold mb-6 text-center"
        style={{ color: primaryColor }}
      >
        {title}
      </h2>

      {/* 📜 دسته‌بندی‌ها */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 pb-4 px-2" style={{ width: "max-content" }}>
          {categories.map(({ id, name, image }, index) => (
            <motion.div
              key={id}
              onClick={() => scrollToCategory(id)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-shrink-0 cursor-pointer"
              style={{ minWidth: "140px" }}
            >
              <div className="bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-lg 
                              border border-white/30 rounded-2xl shadow-lg hover:shadow-2xl 
                              hover:scale-105 transition-all duration-300 p-4">
                {/* 🖼 تصویر */}
                <div className="w-20 h-20 rounded-full bg-white/40 border-2 flex items-center justify-center mx-auto mb-3 overflow-hidden">
                  <img
                    src={getImagePath(image)}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.currentTarget.src = "/images/cat-default.jpg")
                    }
                  />
                </div>

                {/* 🏷 نام دسته‌بندی */}
                <h3
                  className="text-sm font-semibold text-center line-clamp-2"
                  style={{ color: primaryColor }}
                >
                  {name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ℹ️ راهنما */}
      <div className="flex justify-center mt-3">
        <div className="text-xs opacity-70 px-3 py-1 rounded-full bg-gray-100/60 backdrop-blur-sm shadow-sm">
          ← برای دیدن دسته‌بندی‌های بیشتر بکشید →
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
