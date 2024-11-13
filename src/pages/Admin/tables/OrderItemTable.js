// src/components/OrderItemTable.js

import React from 'react';

const OrderItemTable = ({ orderItems, onEdit, onDelete }) => {
    return (
        <table className="min-w-full border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Quantity</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {orderItems.map((item) => (
                    <tr key={item.id}>
                        <td className="border px-4 py-2">{item.id}</td>
                        <td className="border px-4 py-2">{item.quantity}</td>
                        <td className="border px-4 py-2">{item.price}</td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => onEdit(item)}
                                className="bg-yellow-500 text-white p-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(item.id)}
                                className="bg-red-500 text-white p-1 rounded ml-2"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OrderItemTable;
