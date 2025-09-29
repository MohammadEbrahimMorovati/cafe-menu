import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllCategories } from "../../../services/categoryService";
import { getAllProducts } from "../../../services/productService";

export const useMoonCafe = () => {
  const { cafeSlug = "moon" } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories(cafeSlug); // ارسال اسلاگ
      setCategories(response.data);
    } catch (err) {
      setError("خطا در دریافت دسته‌بندی‌ها");
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts(cafeSlug); // ارسال اسلاگ
      setProducts(response.data);
    } catch (err) {
      setError("خطا در دریافت محصولات");
      console.error("Error fetching products:", err);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      await Promise.all([fetchCategories(), fetchProducts()]);
    } catch (err) {
      setError("خطا در دریافت داده‌ها از سرور");
      console.error("Error fetching all data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [cafeSlug]);

  return {
    cafeSlug,
    categories,
    products,
    loading,
    error,
    refetch: fetchAllData,
  };
};
