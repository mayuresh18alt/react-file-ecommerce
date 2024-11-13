// CartForm.js

import React, { useState } from 'react';
import CartService from '../../../service/CartService';

const CartForm = ({ onItemAdded }) => {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newItem = { name: itemName, price: parseFloat(itemPrice) };
            await CartService.addToCart(newItem, token);
            onItemAdded(newItem); // Call the parent method to update the cart
            setItemName('');
            setItemPrice('');
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col md:flex-row md:space-x-4">
            <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="p-2 border rounded-md mb-2 md:mb-0 md:flex-1"
                required
            />
            <input
                type="number"
                placeholder="Item Price"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                className="p-2 border rounded-md mb-2 md:mb-0 md:flex-1"
                required
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Add to Cart
            </button>
        </form>
    );
};

export default CartForm;
