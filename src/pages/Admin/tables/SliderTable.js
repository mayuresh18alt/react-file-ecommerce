import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SliderTable() {
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchSliders = async (pageNumber = 0) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8080/slider`, {
                params: {
                    page: pageNumber,
                    size: 10
                }
            });
            setSliders(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Error fetching sliders:', error);
            setError('Failed to fetch sliders. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSliders(page);
    }, [page]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this slider?')) return;

        try {
            await axios.delete(`http://localhost:8080/slider/${id}`);
            setSliders(sliders.filter(slider => slider.id !== id));
            alert('Slider deleted successfully');
        } catch (error) {
            console.error('Error deleting slider:', error);
            alert('Failed to delete slider. Please try again.');
            fetchSliders(page);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="slider-table mt-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Sliders</h2>
            {loading ? (
                <p className="text-center text-gray-600">Loading sliders...</p>
            ) : (
                <div className="overflow-x-auto">
                    {error && <p className="text-red-500">{error}</p>}
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">ID</th>
                                <th className="py-3 px-6 text-left">Slider Name</th>
                                <th className="py-3 px-6 text-left">Image</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {sliders.length > 0 ? (
                                sliders.map((slider) => (
                                    <tr key={slider.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6">{slider.id}</td>
                                        <td className="py-3 px-6">{slider.sname}</td>
                                        <td className="py-3 px-6">
                                            <img
                                                src={`data:image/jpeg;base64,${slider.image}`}
                                                alt={slider.sname}
                                                className="w-24 h-auto rounded-lg"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'fallback-image-url.jpg';
                                                }}
                                            />
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                onClick={() => handleDelete(slider.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-600">
                                        No sliders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* Pagination Controls */}
                    <div className="flex justify-between mt-4">
                        <button
                            disabled={page === 0}
                            onClick={() => handlePageChange(page - 1)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Previous
                        </button>
                        <span className="text-gray-700">
                            Page {page + 1} of {totalPages}
                        </span>
                        <button
                            disabled={page === totalPages - 1}
                            onClick={() => handlePageChange(page + 1)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SliderTable;
