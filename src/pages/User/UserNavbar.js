import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaSearch, FaMoon, FaSun, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import logo from '../../components/image/logo.png';

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in
  const [username, setUsername] = useState(''); // Store the username

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);

    // Check if user is logged in and retrieve username from localStorage or session storage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem('darkMode', newTheme); // Save to localStorage
      return newTheme;
    });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('darkMode');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <nav
      className={`p-4 shadow-md fixed top-0 left-0 right-0 z-10 transition duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-auto mr-4" />
          <span className={`text-2xl font-bold ${darkMode ? 'text-[#E3E6F3]' : 'text-[#5871dd]'}`}>
        
          </span>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2 flex-grow max-w-xl mx-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`p-2 rounded-md border ${darkMode ? 'border-gray-500 bg-gray-800 text-white' : 'border-[#E3E6F3] text-black'} focus:outline-none focus:border-[#E3E6F3] flex-grow`}
          />
          <button
            type="submit"
            className={`p-2 rounded-md hover:bg-[#5871dd] transition focus:outline-none flex items-center justify-center ${darkMode ? 'bg-gray-700 text-white' : 'bg-[#5871dd] text-white'}`}
          >
            <FaSearch />
          </button>
        </form>

        {/* Dark Mode Toggle Button */}
        <button onClick={toggleDarkMode} className="mx-4">
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="/"
            className={`flex items-center ${darkMode ? 'text-[#E3E6F3]]' : 'text-[#5871dd]'} hover:underline transition`}
          >
            <FaHome className="mr-2" />
            <span className="font-bold">Home</span>
          </Link>
          <Link
            to="/products"
            className={`flex items-center ${darkMode ? 'text[#E3E6F3]' : 'text-[#5871dd]'} hover:underline transition`}
          >
            <FaBox className="mr-2" />
            <span className="font-bold">Products</span>
          </Link>
          <Link
            to="/cart"
            className={`flex items-center ${darkMode ? 'text[#E3E6F3]' : 'text-[#5871dd]'} hover:underline transition`}
          >
            <FaShoppingCart className="mr-2" />
            <span className="font-bold">Cart</span>
          </Link>

          {/* Conditionally render Account/Profile or Logout */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <FaUserAlt className="mr-2" />
              <span className="font-bold">{username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-[#5871dd] hover:underline transition"
              >
                <FaSignOutAlt className="mr-2" />
                <span className="font-bold">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`flex items-center ${darkMode ? 'text[#E3E6F3]' : 'text-[#5871dd]'} hover:underline transition`}
            >
              <FaUserCircle className="mr-2" />
              <span className="font-bold">Account</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isMenuOpen && (
        <div className={`lg:hidden p-4 ${darkMode ? 'bg-gray-800' : 'bg-blue-500'}`}>
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className={`block font-bold rounded px-3 py-2 ${darkMode ? 'text-[#5871dd]' : 'text-[#E3E6F3]'} hover:underline transition`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`block font-bold rounded px-3 py-2 ${darkMode ? 'text-[#E3E6F3]' : 'text-[#E3E6F3]'} hover:underline transition`}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className={`block font-bold rounded px-3 py-2 ${darkMode ? 'text-[#E3E6F3]' : 'text-[#E3E6F3]'} hover:underline transition`}
            >
              Cart
            </Link>

            {/* Show Login/Logout or User Profile in mobile menu */}
            {isLoggedIn ? (
              <div className="block font-bold rounded px-3 py-2 text-[#E3E6F3] hover:underline transition">
                <FaUserAlt className="mr-2" />
                {username}
              </div>
            ) : (
              <Link
                to="/login"
                className={`block font-bold rounded px-3 py-2 ${darkMode ? 'text-[#E3E6F3]' : 'text-[#E3E6F3]'} hover:underline transition`}
              >
                Login
              </Link>
            )}

            {!isLoggedIn && (
              <Link
                to="/register"
                className={`block font-bold rounded px-3 py-2 ${darkMode ? 'text-[#E3E6F3]' : 'text-[#E3E6F3]'} hover:underline transition`}
              >
                Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
