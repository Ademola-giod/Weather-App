import axios from 'axios';

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Instance of axios with default config
const weatherAPI = axios.create({
  baseURL: API_BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric' // Temperature in Celsius
  }
});

// Get current weather by coordinates
export const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await weatherAPI.get('/weather', {
      params: {
        lat,
        lon
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Get current weather by city name
export const getWeatherByCity = async (cityName) => {
  try {
    const response = await weatherAPI.get('/weather', {
      params: {
        q: cityName
      }
    });

    
    return response.data;
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    throw error;
  }
};

// Get 5-day forecast by coordinates
export const getForecast = async (lat, lon) => {
  try {
    const response = await weatherAPI.get('/forecast', {
      params: {
        lat,
        lon
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Get 5-day forecast by city name
export const getForecastByCity = async (cityName) => {
  try {
    const response = await weatherAPI.get('/forecast', {
      params: {
        q: cityName
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast by city:', error);
    throw error;
  }
};

// Get multiple cities weather
export const getMultipleCitiesWeather = async (cities) => {
  try {
    const promises = cities.map(city => getWeatherByCity(city));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching multiple cities:', error);
    throw error;
  }
};

// Change temperature units
export const setTemperatureUnit = (unit) => {
  // unit: 'metric' for Celsius, 'imperial' for Fahrenheit
  weatherAPI.defaults.params.units = unit;
};

export default weatherAPI;