// CartManagement.js

import React, { useEffect, useState } from 'react';
import CartService from '../../../service/CartService';
import CartForm from '../../Admin/forms/CartForm';
import CartTable from '../../Admin/tables/CartTable';

const CartManagement = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token'); // Ensure you have the token stored correctly

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const data = await CartService.viewAllCarts(token);
                setCartItems(data);
            } catch (err) {
                setError('Failed to fetch cart items');
            } finally {
                setLoading(false);
            }
        };
        fetchCarts();
    }, [token]);

    const handleRemoveFromCart = async (itemId) => {
        try {
            await CartService.removeFromCart(itemId, token);
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (err) {
            setError('Failed to remove item from cart');
        }
    };

    const handleItemAdded = (newItem) => {
        setCartItems([...cartItems, newItem]);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Manage Your Cart</h2>
            <CartForm onItemAdded={handleItemAdded} />
            <CartTable cartItems={cartItems} onRemove={handleRemoveFromCart} />
        </div>
    );
};


export default CartManagement;
