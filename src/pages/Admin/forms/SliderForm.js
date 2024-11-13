// SliderForm.js
import React, { useState } from 'react';
import axios from 'axios';

function SliderForm({ onSliderAdded }) {
    const [sname, setSname] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to toggle the form visibility
    const openForm = () => {
        setIsOpen(true);
        setErrorMessage(''); // Reset error message when opening the form
    };

    const closeForm = () => {
        setIsOpen(false);
        setSname('');
        setImage(null);
        setErrorMessage(''); // Reset error message when closing the form
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sname || !image) {
            alert('Please provide both slider name and image.');
            return;
        }

        const formData = new FormData();
        formData.append('sname', sname);
        formData.append('image', image);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8080/slider/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Slider added successfully');
            setSname('');
            setImage(null);
            closeForm(); // Close the form after successful submission
            
            // Refresh the page to reflect changes
            window.location.reload(); // Refresh the page to see the new slider

            if (onSliderAdded) {
                onSliderAdded(response.data);
            }
        } catch (error) {
            console.error('Error adding slider:', error);
            setErrorMessage('Failed to add slider. Please try again.'); // Set error message
        } finally {
            setLoading(false); // Ensure loading is set to false after request completes
        }
    };

    return (
        <div className="slider-form-container">
            <button
                onClick={openForm}
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
            >
                Add New Slider
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add Slider</h2>
                        {errorMessage && (
                            <p className="text-red-500 mb-4">{errorMessage}</p> // Display error message
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="sname" className="block text-sm font-medium">
                                    Slider Name:
                                </label>
                                <input
                                    type="text"
                                    id="sname"
                                    value={sname}
                                    onChange={(e) => setSname(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium">
                                    Slider Image:
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                    className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600 transition"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition"
                                    disabled={loading}
                                >
                                    {loading ? 'Uploading...' : 'Add Slider'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SliderForm;
