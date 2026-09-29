import React from 'react';
import { motion } from 'framer-motion';

const ForecastCard = ({ day, temp, condition, isActive }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className={`${
        isActive 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
          : 'bg-gray-800/40'
      } rounded-2xl p-4 text-center cursor-pointer transition-all`}
    >
      <p className="text-sm mb-3 font-medium">{day}</p>
      <div className="flex justify-center mb-3">
        <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
      </div>
      <p className="text-2xl font-bold">{temp}°</p>
      <p className="text-xs text-gray-400 mt-1">{condition}</p>
    </motion.div>
  );
};

export default ForecastCard;