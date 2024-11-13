// src/components/Admin/OrderTable.js

import React from 'react';

const OrderTable = ({ orders, onEdit, onDelete }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">ID</th>
          <th className="border border-gray-300 p-2">Delivery Date</th>
          <th className="border border-gray-300 p-2">Total Amount</th>
          <th className="border border-gray-300 p-2">Status</th>
          <th className="border border-gray-300 p-2">Address</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="border border-gray-300 p-2">{order.id}</td>
            <td className="border border-gray-300 p-2">{order.orderdeliveyDate}</td>
            <td className="border border-gray-300 p-2">{order.totalAmount}</td>
            <td className="border border-gray-300 p-2">{order.orderStatus}</td>
            <td className="border border-gray-300 p-2">{order.deliveryAdress}</td>
            <td className="border border-gray-300 p-2">
              <button onClick={() => onEdit(order)} className="bg-yellow-500 text-white px-2 py-1">Edit</button>
              <button onClick={() => onDelete(order.id)} className="bg-red-500 text-white px-2 py-1 ml-2">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
