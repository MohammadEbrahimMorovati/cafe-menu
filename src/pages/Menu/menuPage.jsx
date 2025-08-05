
import ProductCart from "../../components/card/Product/productNormalCart";
import { useEffect, useState } from "react";
import api from "../../api/api";

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  console.log("menu");

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <ProductCart products={products || []} />
    </div>
  );
};

export default MenuPage;
