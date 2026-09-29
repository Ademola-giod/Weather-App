import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader } from 'lucide-react';
import Header from '../components/header';
import WeatherCard from '../components/weatherCard';
import ForecastCard from '../components/ForecastCard';
import ChanceOfRain from '../components/ChanceOfRain';
import GlobalMap from '../components/GlobalMap';
import CityCard from '../components/CityMap';
import useWeather from '../hooks/useWeather';

const Dashboard = () => {
  const [location, setLocation] = useState('Your Location');
  const [activeTab, setActiveTab] = useState('next7days');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // Use the weather hook
  const {
    weather,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherForCurrentLocation,
    getDailyForecast,
    
  } = useWeather();

  // Fetch weather on component mount (get user location)
  useEffect(() => {
    fetchWeatherForCurrentLocation();
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  // Update location name when weather data loads
  useEffect(() => {
    if (weather) {
      setLocation(`${weather.name}, ${weather.sys?.country}`);
    }
  }, [weather]);

  // Handle location search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {

      
      fetchWeatherByCity(searchInput);
      setSearchInput('');
      setShowSearchModal(false);
    }
  };

  // Handle location change from city cards
  const handleLocationChange = (cityName) => {
    fetchWeatherByCity(cityName);
  };

  // Get formatted weather data
  const weatherData = weather ? {
    
    
    temp: Math.round(weather.main?.temp),
    feelsLike: Math.round(weather.main?.feels_like),
    condition: weather.weather?.[0]?.main || "unknown",
    
    details: {
      sunrise: weather.sys?.sunrise
      ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) 
      : '--:--',

      sunset: weather.sys?.sunset
      ?
       new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '--:--',
      humidity: `${weather.main?.humidity || 0 }%`,
      wind: `${Math.round(weather.wind?.speed || 0)} m/s`
    }
  } : {

     // fallback data when no weather is available or is not being fetched
    temp: 16,
    feelsLike: 14 ,
    condition: 'Loading...',
    details: {
      sunrise: '--:--',
      sunset: '--:--',
      humidity: '--%',
      wind: '-- m/s'
    }
  };

  // Get forecast data
  const dailyForecast = getDailyForecast().map((item) => ({
    day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
    temp: Math.round(item.main?.temp || 0 ),
    condition: item.weather[0]?.main || "N/A",
  }));

  // Other cities (mock data - can be updated)
  const cities = [
    { city: 'London', country: 'UK', temp: 12, condition: 'Cloudy' },
    { city: 'New York', country: 'US', temp: 18, condition: 'Sunny' },
    { city: 'Tokyo', country: 'JP', temp: 22, condition: 'Clear' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Component */}
        <Header 
          location={location} 
          onLocationChange={handleLocationChange}
          onSearchClick={() => setShowSearchModal(true)} 
        />

        {/* Search Modal */}
        <AnimatePresence>
          {showSearchModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
              onClick={() => setShowSearchModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-2xl p-8 w-96 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Search City</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSearchModal(false)}
                    className="p-2 hover:bg-gray-700 rounded-lg"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                {error && (
                  <p className="text-red-400 text-sm mb-4">{error}</p>
                )}

                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Enter city name..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-lg py-2 font-medium transition disabled:opacity-50"
                    >
                      {loading ? 'Searching...' : 'Search'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setShowSearchModal(false)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-lg py-2 font-medium transition"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Loading Indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-8"
          >
            <Loader className="animate-spin mr-2" size={24} />
            <span>Loading weather data...</span>
          </motion.div>
        )}

        {!loading && (
          <>
            {/* Tab Navigation */}
            <div className="flex gap-6 mb-6 border-b border-gray-800 overflow-x-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveTab('today')}
                className={`pb-3 text-sm transition whitespace-nowrap ${
                  activeTab === 'today' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveTab('tomorrow')}
                className={`pb-3 text-sm transition whitespace-nowrap ${
                  activeTab === 'tomorrow' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                Tomorrow
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveTab('next7days')}
                className={`pb-3 text-sm transition whitespace-nowrap ${
                  activeTab === 'next7days' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                Next 7 days
              </motion.button>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column - Main Weather */}
              <div className="lg:col-span-8 space-y-6">
                {weather ? (
                  <>
                    <WeatherCard {...weatherData} />
                    
                    {/* 7 Day Forecast */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
                    >
                      {dailyForecast.map((day, i) => (
                        <ForecastCard key={i} {...day} isActive={i === 0} />
                      ))}
                    </motion.div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Loading weather data...</p>
                  </div>
                )}

                <GlobalMap />
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <ChanceOfRain />
                
                {/* Other Cities */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Other large cities</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="text-xs text-blue-400 hover:text-blue-300 transition"
                    >
                      Show All
                    </motion.button>
                  </div>
                  <div className="space-y-3">
                    {cities.map((city, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ cursor: 'pointer' }}
                        onClick={() => handleLocationChange(city.city)}
                      >
                        <CityCard {...city} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;