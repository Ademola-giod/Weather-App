// import { motion } from 'framer-motion';

// const ChanceOfRain = ({ data = [] }) => {
//   return (
//     <div className="p-4 bg-gradient-to-b from-blue-900 to-blue-700 rounded-2xl shadow-lg">
//       <h3 className="text-white text-lg font-semibold mb-3">Chance of Rain</h3>
//       <div className="flex items-end justify-between h-40 gap-2">
//         {data.length > 0 ? (
//           data.map((hour, index) => (
//             <motion.div
//               key={index}
//               initial={{ height: 0 }}
//               animate={{ height: `${hour.rainChance}%` }}
//               transition={{ duration: 0.6 }}
//               className="w-8 bg-blue-400 rounded-lg relative"
//             >
//               <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white">
//                 {hour.rainChance}%
//               </span>
//               <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-200">
//                 {hour.time}
//               </span>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-gray-300 text-sm mx-auto">No data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChanceOfRain;





import { motion } from 'framer-motion';

const ChanceOfRain = () => {
  const hours = ['10AM', '11AM', '12AM', '01PM', '02PM', '03PM'];
  const rainChance = [40, 60, 80, 65, 90, 75];

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6"
    >
      <h3 className="text-lg font-semibold mb-6">Chance of rain</h3>
      <div className="flex items-end justify-between h-40 gap-2 mb-3">
        {rainChance.map((chance, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${chance}%` }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg flex-1 relative group"
          >
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
              {chance}%
            </span>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        {hours.map((hour, i) => (
          <span key={i}>{hour}</span>
        ))}
      </div>
    </motion.div>
  );
};

export default ChanceOfRain;