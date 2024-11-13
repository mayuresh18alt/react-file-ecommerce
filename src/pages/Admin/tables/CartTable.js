// CartTable.js

import React from 'react';

const CartTable = ({ cartItems, onRemove }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Item Name</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center py-4">
                                Your cart is empty
                            </td>
                        </tr>
                    ) : (
                        cartItems.map(item => (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{item.name}</td>
                                <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                                <td className="py-2 px-4 border-b">
                                    <button 
                                        onClick={() => onRemove(item.id)} 
                                        className="text-red-500 hover:underline">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CartTable;
