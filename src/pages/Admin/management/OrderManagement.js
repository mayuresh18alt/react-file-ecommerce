// src/components/Admin/OrderManagement.js

import React, { useEffect, useState } from 'react';
import OrderTable from '../tables/OrderTable';
import OrderForm from '../forms/OrderForm';
import { fetchOrders } from '../../../service/OrderService'; // Replace with your actual path to the OrderService

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchOrders();
      setOrders(data);
    };
    getOrders();
  }, [refresh]);

  const handleEdit = (order) => {
    setSelectedOrder(order);
  };

  const handleDelete = async (id) => {
    // Implement delete functionality here
    // e.g., await deleteOrder(id);
    setRefresh(!refresh);
  };

  const handleFormSubmit = () => {
    setSelectedOrder(null);
    setRefresh(!refresh);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <OrderForm order={selectedOrder} onSubmit={handleFormSubmit} />
      <OrderTable orders={orders} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default OrderManagement;
