import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const calculateDiscount = (originalPrice, currentPrice) => {
    const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  return (
    <div className="border border-gray-300 bg-white p-4 shadow-md rounded-md flex flex-col relative">
      {/* Discount Label */}
      {product.originalPrice > product.price && (
        <span className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-sm rounded">
          {calculateDiscount(product.originalPrice, product.price)}% OFF
        </span>
      )}

      {/* Product Image */}
      <img
        src={`data:image/jpeg;base64,${product.image}`}
        alt={product.name}
        className="w-full h-64 object-cover rounded-t-md border-none" // Ensuring no border
      />

      {/* Product Name */}
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>

      {/* Star Rating */}
      <div className="flex items-center space-x-1 mt-1">
        {/* Assuming product.rating is an integer from 0 to 5 */}
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-yellow-400 ${index < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Price and Discount */}
      <div className="flex items-center space-x-2 mt-2">
        <p className="text-gray-800 font-bold text-lg">₹{product.price}</p>
        {product.originalPrice > product.price && (
          <p className="text-gray-500 line-through">₹{product.originalPrice}</p>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => onAddToCart(product.id)}
        className="mt-auto bg-blue-400 text-white font-semibold py-2 px-4 rounded hover:bg-blue-400 transition duration-300"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
