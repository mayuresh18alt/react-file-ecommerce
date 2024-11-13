// src/services/OrderService.js

const API_URL = 'http://localhost:8080/order'; // Replace with your actual API URL

// Fetch all orders
export const fetchOrders = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return await response.json();
};

// Fetch order by ID
export const fetchOrderById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch order');
    }
    return await response.json();
};

// Create a new order
export const createOrder = async (orderData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    return await response.json();
};

// Update an existing order
export const updateOrder = async (id, orderData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        throw new Error('Failed to update order');
    }
    return await response.json();
};

// Delete an order
export const deleteOrder = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete order');
    }
    return await response.json();
};
