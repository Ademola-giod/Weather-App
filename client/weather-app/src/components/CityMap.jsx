import React from 'react';
import { motion } from 'framer-motion';

const CityCard = ({ city, temp, condition }) => {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition cursor-pointer"
    >
      <div>
        <p className="font-medium">{city}</p>
        <p className="text-xs text-gray-400">{condition}</p>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold">{temp}°</p>
        <div className="w-8 h-8 bg-blue-400 rounded-full mt-1"></div>
      </div>
    </motion.div>
  );
};

export default CityCard;