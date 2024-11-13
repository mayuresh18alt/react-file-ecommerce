// src/components/OrderItemManagement.js

import React, { useEffect, useState } from 'react';
import { fetchOrderItems, deleteOrderItem } from '../../../service/OrderItemService';
import OrderItemForm from '../forms/OrderItemForm';
import OrderItemTable from '../tables/OrderItemTable';

const OrderItemManagement = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [selectedOrderItem, setSelectedOrderItem] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getOrderItems = async () => {
            try {
                const data = await fetchOrderItems();
                setOrderItems(data);
            } catch (error) {
                console.error('Error fetching order items:', error);
            }
        };

        getOrderItems();
    }, [refresh]);

    const handleEdit = (orderItem) => {
        setSelectedOrderItem(orderItem);
    };

    const handleDelete = async (id) => {
        try {
            await deleteOrderItem(id);
            setRefresh(!refresh);
        } catch (error) {
            console.error('Error deleting order item:', error);
        }
    };

    const handleFormSubmit = () => {
        setSelectedOrderItem(null);
        setRefresh(!refresh);
    };

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-2xl font-bold">Order Item Management</h1>
            <OrderItemForm orderItem={selectedOrderItem} onSubmit={handleFormSubmit} />
            <OrderItemTable orderItems={orderItems} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default OrderItemManagement;
