import React, { useState } from 'react';

const ProductTable = ({ products = [], onEdit, onDelete, onSort, sortBy, sortDir }) => {
    const [notification, setNotification] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    // Calculate the total number of pages
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Determine the products to show on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    // Function to determine the sort direction arrow
    const getSortArrow = (field) => {
        if (sortBy === field) {
            return sortDir === 'asc' ? '↑' : '↓';
        }
        return '';
    };

    // Show a notification for a few seconds
    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 3000); // Display the message for 3 seconds
    };

    const handleEdit = (product) => {
        onEdit(product);
        showNotification(`Editing product: ${product.name}`);
    };

    const handleDelete = (productId) => {
        onDelete(productId);
        showNotification(`Product deleted successfully.`);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="relative">
            {notification && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    {notification}
                </div>
            )}
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => onSort('name')}
                        >
                            Name {getSortArrow('name')}
                        </th>
                        <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => onSort('brand')}
                        >
                            Brand {getSortArrow('brand')}
                        </th>
                        <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => onSort('category')}
                        >
                            Category {getSortArrow('category')}
                        </th>
                        <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => onSort('quantity')}
                        >
                            Quantity {getSortArrow('quantity')}
                        </th>
                        <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={() => onSort('price')}
                        >
                            Price {getSortArrow('price')}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentProducts.map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">₹{product.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button 
                                    onClick={() => handleEdit(product)} 
                                    className="text-blue-600 hover:text-blue-900"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(product.id)} 
                                    className="text-red-600 hover:text-red-900 ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 space-x-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    style={{ outline: 'none' }}
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    style={{ outline: 'none' }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductTable;
