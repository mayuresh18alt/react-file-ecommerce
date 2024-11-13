// src/components/Admin/OrderForm.js

import React, { useEffect, useState } from 'react';

const OrderForm = ({ order, onSubmit }) => {
  const [formData, setFormData] = useState({
    orderdeliveyDate: '',
    totalAmount: '',
    orderStatus: '',
    deliveryAdress: '',
    user: { id: '' }, // Assuming user is an object with an ID
  });

  useEffect(() => {
    if (order) {
      setFormData({
        orderdeliveyDate: order.orderdeliveyDate,
        totalAmount: order.totalAmount,
        orderStatus: order.orderStatus,
        deliveryAdress: order.deliveryAdress,
        user: order.user,
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to API here
    // e.g., order ? updateOrder(order.id, formData) : createOrder(formData);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="datetime-local"
        name="orderdeliveyDate"
        value={formData.orderdeliveyDate}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="totalAmount"
        value={formData.totalAmount}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="orderStatus"
        value={formData.orderStatus}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="deliveryAdress"
        value={formData.deliveryAdress}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {order ? 'Update Order' : 'Create Order'}
      </button>
    </form>
  );
};

export default OrderForm;
