import { useState} from 'react';
import { getCurrentWeather, getWeatherByCity, getForecast, getForecastByCity } from '../services/WeatherApi';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const currentWeather = await getCurrentWeather(lat, lon);
      const forecastData = await getForecast(lat, lon);
      
      setWeather(currentWeather);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather by city name
  const fetchWeatherByCity = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const currentWeather = await getWeatherByCity(cityName);
      const forecastData = await getForecastByCity(cityName);
      
      setWeather(currentWeather);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message || 'City not found');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get user's location and fetch weather 
  const fetchWeatherForCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        // if location is not found 
        (error) => {
          setError('Could not get your location');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setError('Geolocation not supported');
    }
  };

  // Format forecast data for easier use
  const getDailyForecast = () => {
    if (!forecast || !forecast.list) return [];
    
    // Group by day and take first forecast per day
    const dailyData = {};
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = item;
      }
    });

    return Object.values(dailyData).slice(0, 7); // Return 7 days
  };

  // Format hourly forecast for rain chance
  const getHourlyForecast = () => {
    if (!forecast) return [];
    return forecast.list.slice(0, 6); // Next 6 hours
  };

  return {
    weather,
    forecast,
    loading,
    error,
    fetchWeatherByCoords,
    fetchWeatherByCity,
    fetchWeatherForCurrentLocation,
    getDailyForecast,
    getHourlyForecast
  };
};

export default useWeather;