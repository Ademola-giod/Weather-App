# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



1. User opens app (0s)
   → Browser gets location
   → Shows local weather with animations
   
2. User explores (5-10s)
   → Scrolls down
   → Sees 7-day forecast
   → Checks rain chances
   → Checks other cities
   
3. User searches (15s)
   → Types "London"
   → Presses Enter
   → Weather updates for London
   
4. User switches tabs (20s)
   → Clicks "Forecast"
   → Sees detailed forecast info
   
5. User adjusts settings (25s)
   → Clicks Settings icon
   → Changes units to °F
   → Toggles dark mode
   
6. User leaves (30s)
   → Has all weather info they need
   → App bookmarked for later



# a docummentation on the Weather app 

Weather App

A sleek, animated, and responsive weather dashboard built with React, Framer Motion, and Tailwind CSS.
It fetches real-time weather data using a public API (like OpenWeatherMap) and displays current, forecast, and additional insights such as chance of rain, global map, and city information.

🚀 Features

🌍 Search by City Name

📍 Auto Location (Geolocation API)

🌡️ Current Weather Details

🧭 Forecast for Upcoming Hours/Days

☔ Chance of Rain Visualization

🗺️ Global Weather Map

🌆 City Overview Card

🎞️ Smooth Framer Motion Animations

📱 Responsive UI (Mobile + Desktop)

###   Components Overview

1. Header.jsx

Displays app title and search input.

Attributes / Props

onSearch(city: string) → triggers weather fetch by city name

locationName: string → current displayed city

Features

Input field with search icon

Detects “Enter” key to search

Optional geolocation button

2. WeatherCard.jsx

Shows the current weather info for a selected city.

Attributes / Props

data: weather data object (includes temp, humidity, wind, description, icon)

Features

City name

Current temperature

Weather description

Wind speed, humidity, pressure

Icon representation (from API)

Animated entry with Framer Motion

3. ForecastCard.jsx

Displays weather forecast for the next few hours or days.

Attributes / Props

forecastData: array of forecast info (time, temperature, icon, etc.)

Features

Scrollable row of forecast cards

Each card shows:

Time (e.g. “2PM”)

Temp (°C)

Icon

4. ChanceOfRain.jsx

Visualizes the likelihood of rain using bar or line chart.

Attributes / Props

rainData: array of { hour: string, chance: number }

Features

Animated chart (Framer Motion)

Percentage labels

Tooltip hover (optional)

5. GlobalMap.jsx

Interactive global weather visualization (e.g. using Leaflet or OpenLayers).

Attributes / Props

mapData: geo-coordinates + temperature

Features

World map showing weather intensity

Zoom and drag interactions

Animated markers or heatmap

6. CityMap.jsx (CityCard.jsx)

Mini map showing the location of the searched city.

Attributes / Props

coordinates: { lat, lon }

city: string

Features

Small embedded map

City pin marker

Optional "View on Map" link

7. Dashboard.jsx

Main container that ties all components together.

Features

Fetches weather + forecast data

Manages loading, error, and data states

Conditionally renders:

##<WeatherCard />

##<ForecastCard />

##<ChanceOfRain />

##<GlobalMap />

##<CityMap />

8. Loader.jsx

Simple loading spinner (e.g. using lucide-react’s Loader).

Attributes / Props

isLoading: boolean

9. ErrorPopup.jsx

Animated alert for invalid city or API errors.

Attributes / Props

message: string

onClose: function