
import React from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

const { BaseLayer, Overlay } = LayersControl;

const GlobalMap = () => {
  const API_KEY = import.meta.env.VITE_API_KEY; // your key in .env
  const center = [20, 0]; // world center

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Global Weather Map</h3>
      </div>

      <div className="h-80 rounded-2xl overflow-hidden border border-gray-700">
        <MapContainer
          center={center}
          zoom={2}
          className="h-full w-full"
          scrollWheelZoom={true}
        >
          <LayersControl position="topright">
            {/* 🌍 Base map */}
            <BaseLayer checked name="Street Map">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
            </BaseLayer>

            {/* ☁️ Cloud layer */}
            <Overlay checked name="Clouds">
              <TileLayer
                url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                attribution="&copy; OpenWeatherMap"
              />
            </Overlay>

            {/* 🌧️ Rain layer */}
            <Overlay name="Precipitation">
              <TileLayer
                url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                attribution="&copy; OpenWeatherMap"
              />
            </Overlay>

            {/* 🌡️ Temperature layer */}
            <Overlay name="Temperature">
              <TileLayer
                url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                attribution="&copy; OpenWeatherMap"
              />
            </Overlay>

            {/* 💨 Wind layer */}
            <Overlay name="Wind Speed">
              <TileLayer
                url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                attribution="&copy; OpenWeatherMap"
              />
            </Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default GlobalMap;







// import React from 'react';
// import { motion } from 'framer-motion';
// import "leaflet/dist/leaflet.css";
// import {MapContainer, TileLayer, LayersControl } from "react-leaflet"
// import L from "leaflet"

// // custom blue map marker icon 

// const markerIcon = new L.Icon({
//   iconUrl: ('../assets/marker-icon-2x-blue.png'),
//   iconSize: [32, 32],

// });

// const GlobalMap = () => {


//   return (
//     <motion.div
//       initial={{ y: 20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6"
//     >
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold">Global map</h3>
//         <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
//           View wide
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
      
//       <div className="bg-gray-900/60 rounded-2xl h-64 relative overflow-hidden">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-full h-full relative">
//             {[...Array(8)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ scale: 0 }}  
//                 animate={{ scale: 1 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="absolute w-3 h-3 bg-yellow-400 rounded-full"
//                 style={{
//                   left: `${Math.random() * 80 + 10}%`,
//                   top: `${Math.random() * 80 + 10}%`,
//                 }}
//               >
//                 <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping"></div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <p className="text-gray-500 text-sm">Map will load here</p>
//         </div>
//       </div>
      
//       <motion.button
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//         className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-500 hover:to-blue-600 transition text-sm font-medium"
//       >
//         Get started
//       </motion.button>
//     </motion.div>
//   );
// };

// export default GlobalMap;