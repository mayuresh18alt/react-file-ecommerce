import React, { useEffect, useState } from 'react';
import ProductForm from '../forms/ProductForm';
import ProductTable from '../tables/ProductTable';
import ProductService from '../../../service/ProductService';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState('id');
    const [sortDir, setSortDir] = useState('asc');
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    const fetchProducts = async () => {
        setLoading(true); // Start loading
        setError(null); // Reset error state
        try {
            const response = await ProductService.getAllProducts(currentPage, pageSize, sortBy, sortDir);
            setProducts(response.data.content || []); // Ensure it's an array
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products. Please try again later.'); // Set error message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, pageSize, sortBy, sortDir]);

    const handleProductSubmit = async (formData) => {
        setLoading(true); // Start loading
        setError(null); // Reset error state
        try {
            if (isEditing) {
                await ProductService.updateProduct(selectedProduct.id, formData, formData.image);
            } else {
                await ProductService.addProduct(formData, formData.image);
            }
            fetchProducts(); // Fetch updated products
            setShowForm(false); // Hide the form
            setSelectedProduct(null); // Reset selected product
            setIsEditing(false); // Reset editing state
        } catch (error) {
            console.error('Error submitting product:', error);
            setError('Failed to submit product. Please try again.'); // Set error message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        // Confirm deletion with user
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) {
            return; // If user cancels, do nothing
        }

        setLoading(true); // Start loading
        setError(null); // Reset error state
        try {
            await ProductService.deleteProduct(id); // Attempt to delete product
            fetchProducts(); // Refresh products after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Failed to delete product. Please try again.'); // Set error message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSortChange = (field) => {
        const newSortDir = sortBy === field && sortDir === 'asc' ? 'desc' : 'asc';
        setSortBy(field);
        setSortDir(newSortDir);
    };

    return (
        <div className="container mx-auto mt-4">
            <h2 className="mb-4 text-2xl font-bold">Product Management</h2>
            <button 
                onClick={() => { 
                    setShowForm(true); 
                    setIsEditing(false); 
                    setSelectedProduct(null); 
                }} 
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Add Product
            </button>

            <ProductForm 
                onSubmit={handleProductSubmit}
                product={selectedProduct} 
                isEditing={isEditing} 
                setIsEditing={setIsEditing} 
                showForm={showForm} 
                setShowForm={setShowForm} 
            />

            {loading ? (
                <p>Loading products...</p> // Loading indicator
            ) : (
                <>
                    {error && <p className="text-red-600">{error}</p>} {/* Error message */}
                    <ProductTable 
                        products={products} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                        onSort={handleSortChange} 
                        sortBy={sortBy} 
                        sortDir={sortDir} 
                    />
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button 
                                key={index} 
                                onClick={() => handlePageChange(index)}
                                className={`px-2 py-1 mx-1 ${index === currentPage ? 'bg-white-100 text-white' : 'bg-gray-300'}`}
                                disabled={loading} // Disable buttons while loading
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductManagement;
