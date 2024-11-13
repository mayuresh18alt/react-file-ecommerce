// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductService from '../../service/ProductService';
import SliderComponent from '../../components/slider'; // Use this for displaying the slider
import CardsContainer from '../../components/CardsContainer';
import ProductCard from '../../components/ProductCard'; // Import the ProductCard component

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch products from the service
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductService.getAllProducts();
        // Assuming response.data contains the products
        setProducts(response.data.content || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle "Add to Cart" click
  const handleAddToCart = (id) => {
    console.log(`Add to cart: Product ID ${id}`);
    // Implement add-to-cart functionality here
  };

  return (
    <div className="container mx-auto p-4">
      {/* Add blank space above the slider */}
      <div className="h-6"></div> 

      <SliderComponent />
      <CardsContainer />
                
      <div className="text-center p-4">
    <h2 className="text-4xl font-bold text-gray-800 mb-4">
      Featured Products
    </h2>
    <p className="text-xl text-gray-600">
      Our Collection - New Modern Design
    </p>
  </div>


      <h1 className="text-2xl font-bold mb-4 mt-6"></h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
