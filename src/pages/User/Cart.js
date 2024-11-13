// Cart.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartResponse = await fetch('http://localhost:8080/api/cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authorization token if required
            // 'Authorization': `Bearer ${yourToken}`,
          },
        });

        if (!cartResponse.ok) {
          throw new Error('Failed to fetch cart data.');
        }

        const cartData = await cartResponse.json();
        setCartItems(cartData.cartItems); // Assuming your API returns a list of cart items

        const orderResponse = await fetch('http://localhost:8080/order', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authorization token if required
          },
        });

        if (!orderResponse.ok) {
          throw new Error('Failed to fetch order data.');
        }

        const orderData = await orderResponse.json();
        setOrderItems(orderData.orderItems); // Assuming your API returns a list of order items

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const handleCheckout = () => {
    // Implement checkout logic here
    navigate('/checkout');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>

        {/* Cart Items */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Cart Items</h3>
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="border rounded p-4 shadow-sm">
                  <p className="font-bold">{item.productName}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Order History</h3>
          {orderItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orderItems.map((order) => (
                <div key={order.id} className="border rounded p-4 shadow-sm">
                  <p className="font-bold">Order #{order.id}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p>Total: ${order.totalPrice}</p>
                  <div>
                    <h4 className="font-semibold">Items:</h4>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.productName} - {item.quantity} x ${item.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">You have no previous orders.</p>
          )}
        </div>

        {/* Checkout Button */}
        {cartItems.length > 0 && (
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
