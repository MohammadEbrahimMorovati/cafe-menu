# ساختار پروژه Café Menu

## 📁 ساختار فولدرها

```
src/
├── api/                    # تنظیمات API و Axios
│   └── api.js             # اینستنس اصلی Axios
├── components/            # کامپوننت‌های React
│   ├── ui/               # کامپوننت‌های UI عمومی
│   │   ├── LoadingSpinner.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CoffeeLogo.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── SectionDivider.jsx
│   │   └── index.js
│   ├── card/             # کامپوننت‌های کارت (قدیمی)
│   ├── category/         # کامپوننت‌های دسته‌بندی
│   ├── header/           # کامپوننت‌های هدر
│   ├── menu/             # کامپوننت‌های منو
│   └── product/          # کامپوننت‌های محصول
├── constants/            # ثابت‌ها و تنظیمات
│   └── index.js         # رنگ‌ها، API، دسته‌بندی‌ها
├── hooks/               # Custom Hooks
├── pages/               # صفحات اصلی
│   ├── Home/           # صفحه اصلی
│   │   └── homePage.jsx
│   └── Menu/           # صفحه منو
│       └── menuPage.jsx
├── services/           # سرویس‌های API
│   ├── products/       # سرویس محصولات
│   │   └── productService.js
│   ├── category/       # سرویس دسته‌بندی‌ها
│   │   └── categoryService.js
│   └── company/        # سرویس‌های شرکت
├── theme/              # تنظیمات تم
├── assets/             # فایل‌های استاتیک
├── App.jsx            # کامپوننت اصلی
├── main.jsx           # نقطه ورود
└── index.css          # استایل‌های اصلی
```

## 🎨 کامپوننت‌های UI

### LoadingSpinner

نمایش وضعیت بارگذاری با انیمیشن

### ProductCard

کارت نمایش محصول با قیمت و تخفیف

### CoffeeLogo

لوگوی قهوه با طراحی دایره‌ای

### FeaturedProducts

نمایش محصولات ویژه در بالای صفحه

### SectionDivider

جداکننده بخش‌ها با خط نقطه‌چین

## 🔧 سرویس‌ها

### productService.js

- `getAllProducts()`: دریافت تمام محصولات
- `getProductsByCategory(categoryId)`: دریافت محصولات بر اساس دسته‌بندی
- `getProductById(id)`: دریافت محصول بر اساس ID
- `getBurgerProducts(products)`: فیلتر محصولات برگر
- `calculateFinalPrice(price, discount)`: محاسبه قیمت نهایی

### categoryService.js

- `getAllCategories()`: دریافت تمام دسته‌بندی‌ها
- `getCategoryById(id)`: دریافت دسته‌بندی بر اساس ID
- `createCategory(data)`: ایجاد دسته‌بندی جدید
- `updateCategory(id, data)`: به‌روزرسانی دسته‌بندی
- `deleteCategory(id)`: حذف دسته‌بندی

## 🎯 ثابت‌ها

### COLORS

رنگ‌های اصلی پروژه

### API_CONFIG

تنظیمات API و آدرس‌ها

### CATEGORIES

شناسه‌های دسته‌بندی‌ها

### UI_CONFIG

تنظیمات UI مانند اندازه‌ها و border-radius

## 🚀 نحوه استفاده

```jsx
import { getAllProducts } from '../services/products/productService';
import { LoadingSpinner, ProductCard } from '../components/ui';

// استفاده از سرویس
const products = await getAllProducts();

// استفاده از کامپوننت‌ها
<LoadingSpinner message="در حال بارگذاری..." />
<ProductCard product={product} />
```
