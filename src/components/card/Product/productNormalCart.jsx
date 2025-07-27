const ProductCart = ({ products = [] }) => {
  if (!products.length) return null;

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#613A27" }}>
      <div className="flex justify-center px-4 py-8">
        <div
          className="border-4 border-dashed rounded-lg max-w-screen-lg w-full p-6 sm:p-8 bg-white"
          style={{ borderColor: "#613A27" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-5 rounded-lg shadow-md text-center bg-[#FBE6D3] flex flex-col justify-between min-h-[220px] transition-transform duration-200 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <h1 className="text-xl font-semibold text-[#613A27] truncate">
                  {product.name}
                </h1>
                <p className="text-[#613A27] mt-3 flex-grow line-clamp-3">
                  {product.description}
                </p>
                {product.discount && product.discount > 0 ? (
                  <div className="mt-6 flex flex-col items-center">
                    <span className="text-red-500 line-through text-base">
                      {product.price.toLocaleString()} تومان
                    </span>
                    <span className="text-green-600 font-bold text-lg">
                      {(product.price - product.discount).toLocaleString()}{" "}
                      تومان
                    </span>
                    <span className="text-xs text-red-600 mt-1">
                      تخفیف: {product.discount.toLocaleString()} تومان
                    </span>
                  </div>
                ) : (
                  <p className="text-green-600 font-bold mt-6 text-lg">
                    {product.price.toLocaleString()} تومان
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
