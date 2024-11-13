import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaCartPlus, FaBox, FaUser, FaClipboardList } from 'react-icons/fa';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar} className="focus:outline-none text-black">
          {isOpen ? <FaTimes size={30} color="black" /> : <FaBars size={30} color="black" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-gray-800 text-white h-full z-10 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        {/* Admin Panel Title */}
        <div className="p-4 bg-gray-900">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>

        {/* Close button for mobile view */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={toggleSidebar} className="focus:outline-none text-black">
            <FaTimes size={24} color="black" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-2">
          <ul>
            <li className="p-4 hover:bg-gray-600 flex items-center">
              <FaCartPlus className="mr-2" />
              <Link to="/admin/management/cartmanagement" onClick={toggleSidebar}>
                Cart
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-600 flex items-center">
              <FaClipboardList className="mr-2" />
              <Link to="/admin/management/ordermanagement" onClick={toggleSidebar}>
                Order
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-600 flex items-center">
              <FaBox className="mr-2" />
              <Link to="/admin/management/orderitemmanagement" onClick={toggleSidebar}>
                Order-Item
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-600 flex items-center">
              <FaBox className="mr-2" />
              <Link to="/admin/management/productmanagement" onClick={toggleSidebar}>
                Product
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-600 flex items-center">
              <FaUser className="mr-2" />
              <Link to="/admin/management/usermanagement" onClick={toggleSidebar}>
                User
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-600 flex items-center">
              <FaUser className="mr-2" />
              <Link to="/admin/management/slidermanagement" onClick={toggleSidebar}>
                Slider
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      
    </div>
  );
};

export default AdminSidebar;
