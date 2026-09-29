// import React from 'react';

import { motion } from 'framer-motion';
const WeatherCard = ({ temp, feelsLike, condition, details }) => {
  const getWeatherIcon = () => {
    return (
      <svg className="w-24 h-24" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="20" fill="#FDB813"/>
        <circle cx="35" cy="35" r="8" fill="#FDB813" opacity="0.6"/>
        <circle cx="65" cy="35" r="8" fill="#FDB813" opacity="0.6"/>
        <circle cx="35" cy="65" r="8" fill="#FDB813" opacity="0.6"/>
        <circle cx="65" cy="65" r="8" fill="#FDB813" opacity="0.6"/>
      </svg>
    );
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl p-8 shadow-2xl"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-blue-100 text-sm mb-1">Monday</p>
          <p className="text-white/80 text-xs">11:42 PM</p>
        </div>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-blue-100 text-sm mb-2">{condition}</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-8xl font-bold text-white">{temp}°</h2>
          </div>
          <p className="text-blue-100 text-sm mt-2">Feels like {feelsLike}°</p>
        </div>
        <div className="mt-4">
          {getWeatherIcon()}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 pt-6 border-t border-white/20">
        <div>
          <p className="text-blue-100 text-xs mb-1">Sunrise</p>
          <p className="text-white font-semibold">{details.sunrise}</p>
        </div>
        <div>
          <p className="text-blue-100 text-xs mb-1">Sunset</p>
          <p className="text-white font-semibold">{details.sunset}</p>
        </div>
        <div>
          <p className="text-blue-100 text-xs mb-1">Humidity</p>
          <p className="text-white font-semibold">{details.humidity}</p>
        </div>
        <div>
          <p className="text-blue-100 text-xs mb-1">Wind</p>
          <p className="text-white font-semibold">{details.wind}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;