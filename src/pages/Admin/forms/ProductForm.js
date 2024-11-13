import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, product, isEditing, setIsEditing, showForm, setShowForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    image: null,
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isEditing && product) {
      setFormData({
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        image: null,
      });
    } else {
      setFormData({
        name: '',
        brand: '',
        category: '',
        price: '',
        quantity: '',
        description: '',
        image: null,
      });
    }
  }, [isEditing, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData)
      .then(() => {
        setSuccessMessage(isEditing ? 'Product updated successfully!' : 'Product added successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          window.location.reload();
        }, 1000);
      })
      .catch(err => {
        console.error('Error:', err);
      });
  };

  return (
    <>
      {successMessage && (
        <div className="fixed top-0 right-0 m-4 z-50 bg-green-500 text-white p-3 rounded shadow-lg">
          {successMessage}
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-2 text-center">{isEditing ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:space-x-3">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full p-1.5 h-10"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="border border-gray-300 rounded w-full p-1.5 h-10"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-1.5 h-10"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-1.5 h-10"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-1.5 h-10"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-1.5 h-11"
                  required
                  rows="3"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded w-full p-1.5"
                />
              </div>
              <div className="flex justify-between mt-3">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  {isEditing ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductForm;
