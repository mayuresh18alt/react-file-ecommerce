// src/components/SliderManagement.js
import React, { useState, useEffect } from 'react';
import SliderTable from '../tables/SliderTable';
import SliderForm from '../forms/SliderForm';
import SliderService from '../../../service/SliderService'; // Ensure the correct path to your service
import { ToastContainer, toast } from 'react-toastify'; // Optional: for better notifications
import 'react-toastify/dist/ReactToastify.css';

function SliderManagement() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all sliders from the backend
  const fetchSliders = async (page = 0, size = 10) => {
    setLoading(true);
    setError('');
    try {
      const response = await SliderService.getSliders(page, size);
      setSliders(response.content || []); // Adjust based on actual response structure
    } catch (error) {
      setError('Failed to fetch sliders. Please try again.');
      toast.error('Failed to fetch sliders.'); // Show notification
    } finally {
      setLoading(false);
    }
  };

  // Refresh slider list when the component mounts
  useEffect(() => {
    fetchSliders();
  }, []);

  // Add new slider
  const handleSliderAdded = async (sname, imageFile) => {
    if (!sname || !imageFile) {
      toast.warning('Please provide both slider name and image.');
      return;
    }

    setFormLoading(true);
    try {
      const addedSlider = await SliderService.addProduct(sname, imageFile);
      setSliders((prevSliders) => [addedSlider, ...prevSliders]); // Adjust if necessary
      toast.success('Slider added successfully');
    } catch (error) {
      toast.error('Failed to add slider. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  // Update slider
  const handleSliderUpdated = async (id, sname, imageFile) => {
    setFormLoading(true);
    try {
      const updatedSlider = await SliderService.updateProduct(id, sname, imageFile);
      setSliders((prevSliders) =>
        prevSliders.map((slider) => (slider.id === id ? updatedSlider : slider))
      );
      toast.success('Slider updated successfully');
    } catch (error) {
      toast.error('Failed to update slider. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle slider deletion
  const handleDeleteSlider = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slider?')) return;

    try {
      await SliderService.deleteProduct(id);
      setSliders((prevSliders) => prevSliders.filter((slider) => slider.id !== id));
      toast.success('Slider deleted successfully');
    } catch (error) {
      toast.error('Failed to delete slider. Please try again.');
    }
  };

  return (
    <div className="slider-management p-6 bg-gray-100 min-h-screen">
      <ToastContainer /> {/* For notifications */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Slider Management</h1>
      
      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Slider Form */}
      <SliderForm onAdd={handleSliderAdded} loading={formLoading} />

      {/* Slider Table */}
      {loading ? (
        <p>Loading sliders...</p>
      ) : (
        <SliderTable sliders={sliders} onDelete={handleDeleteSlider} onUpdate={handleSliderUpdated} loading={loading} />
      )}
    </div>
  );
}

export default SliderManagement;
