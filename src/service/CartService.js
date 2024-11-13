// CartService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/cart';

const CartService = {
    // Fetch all cart items
    viewAllCarts: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/viewall`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching carts:', error);
            throw error; // Rethrow the error for further handling
        }
    },

    // Add item to cart
    addToCart: async (item, token) => {
        try {
            const response = await axios.post(`${BASE_URL}/add`, item, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw error;
        }
    },

    // Remove item from cart
    removeFromCart: async (itemId, token) => {
        try {
            const response = await axios.delete(`${BASE_URL}/remove/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error removing item from cart:', error);
            throw error;
        }
    },

    // Clear cart
    clearCart: async (token) => {
        try {
            const response = await axios.delete(`${BASE_URL}/clear`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    }
};

export default CartService;
