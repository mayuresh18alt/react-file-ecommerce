// src/components/OrderItemForm.js

import React, { useEffect, useState } from 'react';
import { createOrderItem, updateOrderItem } from '../../../service/OrderItemService';

const OrderItemForm = ({ orderItem, onSubmit }) => {
    const [formData, setFormData] = useState({
        quantity: '',
        price: '',
    });

    useEffect(() => {
        if (orderItem) {
            setFormData({
                quantity: orderItem.quantity,
                price: orderItem.price,
            });
        } else {
            setFormData({
                quantity: '',
                price: '',
            });
        }
    }, [orderItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (orderItem) {
                await updateOrderItem(orderItem.id, formData);
            } else {
                await createOrderItem(formData);
            }
            onSubmit();
        } catch (error) {
            console.error('Error saving order item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-5">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
                {orderItem ? 'Update Order Item' : 'Create Order Item'}
            </button>
        </form>
    );
};

export default OrderItemForm;
