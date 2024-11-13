// src/components/Slider.js
import React, { useEffect, useState } from 'react';
import SliderService from '../service/SliderService'; // Adjust the import based on your folder structure

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSliders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await SliderService.getSliders(); // Ensure your service method is correct
      setSliders(response.content || []); // Adjust based on your response structure
    } catch (error) {
      console.error('Error fetching sliders:', error);
      setError('Failed to fetch sliders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // Automatically change slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliders.length);
    }, 8000); // 6000 milliseconds = 6 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [sliders.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sliders.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + sliders.length) % sliders.length);
  };

  return (
    <div className="slider-container relative w-full">
      {loading && <p>Loading sliders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {sliders.length > 0 && (
        <div className="relative w-full">
          <div className="flex overflow-hidden justify-center">
            <div className="mx-4"> {/* Added margin on both sides */}
              <img
                src={`data:image/jpeg;base64,${sliders[currentSlide].image}`}
                alt={`Slider Image ${currentSlide + 1}`} // Using a generic alt text
                className="w-full h-auto object-cover"
                style={{ width: '1680px', height: '500px' }} // Image size changed to 1680x400px
              />
            </div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer" onClick={handlePrevSlide}>
              <button className="bg-gray-500 text-white px-2 py-1 rounded">‹</button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer" onClick={handleNextSlide}>
              <button className="bg-gray-500 text-white px-2 py-1 rounded">›</button>
            </div>
          </div>
          {/* Removed the name display */}
          {/* <h3 className="absolute bottom-5 left-5 text-white bg-black bg-opacity-50 px-4 py-2 rounded">
            {sliders[currentSlide].sname}
          </h3> */}
        </div>
      )}
      {sliders.length === 0 && <p>No sliders available.</p>}
    </div>
  );
};

export default Slider;
