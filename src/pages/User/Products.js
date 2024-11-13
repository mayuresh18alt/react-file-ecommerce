import React, { useEffect, useState } from 'react';
import ProductService from '../../service/ProductService';
import bannerImage from '../../components/image/banner.jpg'; // Import the banner image

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAllProducts();
        setProducts(response.data.content || response.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!Array.isArray(products) || products.length === 0) {
    return <div className="text-red-500">No products available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner Image with Overlay Text */}
      <div className="relative mb-8">
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full h-auto"
          style={{ maxHeight: '300px', width: '100%' }}
        />
        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <h2 className="text-4xl font-bold text-gray-300 bg-black bg-opacity-10 p-4 rounded-lg">
          <span>#Stay Home</span><br />
          <span>Save more with coupons & up to 70% off</span>
          </h2>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6"></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full h-48 cursor-pointer" onClick={() => handleImageClick(product)}>
              <img
                src={product.image ? `data:image/jpeg;base64,${product.image}` : '/placeholder.jpg'}
                alt={product.name || 'Product Image'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col items-start">
              <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
              <p className="text-gray-500 text-sm">{product.brand}</p>
              <div className="flex items-center justify-between w-full mt-4">
                <span className="text-lg font-bold text-gray-800">₹{product.price?.toFixed(2)}</span>
                <button className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-400 transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying full product details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative shadow-lg">
            {/* Close button */}
            <button className="absolute top-4 right-4 text-gray-600 text-3xl" onClick={closeModal}>
              &times;
            </button>
            <div className="flex flex-col md:flex-row items-start space-x-0 md:space-x-6">
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <img
                  src={selectedProduct.image ? `data:image/jpeg;base64,${selectedProduct.image}` : '/placeholder.jpg'}
                  alt={selectedProduct.name || 'Product Image'}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col">
                <h2 className="text-2xl font-semibold">{selectedProduct.name}</h2>
                <p className="text-gray-500 mb-2">{selectedProduct.brand}</p>
                <div className="flex items-center justify-between w-full mt-4">
                  <span className="text-lg font-bold text-gray-900">₹{selectedProduct.price?.toFixed(2)}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                    Add to Cart
                  </button>
                </div>
                
                <div className="flex items-center mb-4 mt-4">
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mr-2">
                    Size:
                  </label>
                  <select
                    id="size"
                    className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
