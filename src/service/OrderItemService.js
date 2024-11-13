// src/services/OrderItemService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/orderitem'; // Update with your backend URL

// Fetch all order items
export const fetchOrderItems = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

// Create a new order item
export const createOrderItem = async (orderItemData) => {
    const response = await axios.post(BASE_URL, orderItemData);
    return response.data;
};

// Update an existing order item
export const updateOrderItem = async (id, orderItemData) => {
    const response = await axios.put(`${BASE_URL}/${id}`, orderItemData);
    return response.data;
};

// Delete an order item
export const deleteOrderItem = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
};
