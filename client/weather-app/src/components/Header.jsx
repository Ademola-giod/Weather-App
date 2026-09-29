import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Settings, Moon, User, Search, X } from 'lucide-react';

const Header = ({ day, location, onLocationChange, onSearchClick }) => {
  const [searchInput, setSearchInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onLocationChange(searchInput);
      setSearchInput('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between mb-6"
    >
      {/* Left Section - Hamburger + Location */}
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-gray-800 rounded-lg transition"
        >
          <div className="w-6 h-0.5 bg-white mb-1.5">{day}</div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </motion.button>
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin size={18} />
          <span className="text-sm hidden sm:inline">{location}</span>
        </div>
      </div>
      
      {/* Right Section - Search (Large) + Icons */}
      <div className="flex items-center gap-3">
        {/* Search Input - Only visible on large screens */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <form onSubmit={handleSearchSubmit}>
            <input 
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search city..."
              className="bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-64 transition"
            />
          </form>
        </div>

        {/* Search Button - Only visible on mobile/tablet */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSearchClick}
          className="p-2 hover:bg-gray-800 rounded-lg transition lg:hidden"
          title="Search"
        >
          <Search size={20} />
        </motion.button>

        {/* Settings Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-gray-800 rounded-lg transition"
          title="Settings"
        >
          <Settings size={20} />
        </motion.button>

        {/* Dark Mode Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 hover:bg-gray-800 rounded-lg transition"
          title="Toggle Dark Mode"
        >
          <Moon size={20} />
        </motion.button>

        {/* User Profile Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition"
          title="Profile"
        >
          <User size={16} />
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;