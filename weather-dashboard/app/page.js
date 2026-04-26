"use client";
import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, Search, MapPin } from 'lucide-react';

const getWeatherIcon = (description) => {
  const desc = description.toLowerCase();
  if (desc.includes('rain')) return <CloudRain className="w-16 h-16 text-blue-400" />;
  if (desc.includes('cloud')) return <Cloud className="w-16 h-16 text-gray-400" />;
  if (desc.includes('clear') || desc.includes('sunny')) return <Sun className="w-16 h-16 text-yellow-400" />;
  return <Cloud className="w-16 h-16 text-gray-300" />;
};

export default function WeatherDashboard() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('Manila');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      
      const weatherRes = await fetch(
        `/api/weather?city=${cityName}&apiKey=${apiKey}`
      );
      const weatherData = await weatherRes.json();
      
      if (!weatherRes.ok) throw new Error(weatherData.message || 'City not found');
      
      setWeather(weatherData);
      setCity(cityName);
      
      const forecastRes = await fetch(
        `/api/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&apiKey=${apiKey}`
      );
      const forecastData = await forecastRes.json();
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput);
      setSearchInput('');
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
          const res = await fetch(
            `/api/weather?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`
          );
          const data = await res.json();
          setWeather(data);
          setCity(data.name);
        } catch (err) {
          setError('Failed to get location weather');
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-2xl font-bold">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 text-center">Weather Dashboard</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for a city..."
              className="flex-1 px-6 py-3 rounded-full bg-white/20 text-white placeholder-white/50 backdrop-blur-md border border-white/30 focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition"
            >
              <Search size={20} />
            </button>
            <button
              type="button"
              onClick={handleGeolocation}
              className="px-6 py-3 bg-white/20 text-white font-bold rounded-full backdrop-blur-md border border-white/30 hover:bg-white/30 transition"
            >
              <MapPin size={20} />
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-2xl mb-8 text-center">
            {error}
          </div>
        )}

        {weather && (
          <>
            {/* Current Weather */}
            <div className="weather-card bg-white/10 p-8 mb-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white">{weather.name}, {weather.sys.country}</h2>
                  <p className="text-white/70 capitalize">{weather.weather[0].description}</p>
                </div>
                {getWeatherIcon(weather.weather[0].description)}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                  <p className="text-white/70 text-sm mb-2">Temperature</p>
                  <p className="text-3xl font-bold text-white">{Math.round(weather.main.temp)}°C</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                  <p className="text-white/70 text-sm mb-2">Feels Like</p>
                  <p className="text-3xl font-bold text-white">{Math.round(weather.main.feels_like)}°C</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                  <p className="text-white/70 text-sm mb-2">Min / Max</p>
                  <p className="text-2xl font-bold text-white">{Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                  <p className="text-white/70 text-sm mb-2">Humidity</p>
                  <p className="text-3xl font-bold text-white flex items-center gap-2">
                    <Droplets size={20} /> {weather.main.humidity}%
                  </p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-white/50 text-xs flex items-center gap-2 mb-1">
                    <Wind size={14} /> Wind Speed
                  </p>
                  <p className="text-xl font-bold text-white">{weather.wind.speed} m/s</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-white/50 text-xs flex items-center gap-2 mb-1">
                    <Eye size={14} /> Visibility
                  </p>
                  <p className="text-xl font-bold text-white">{(weather.visibility / 1000).toFixed(1)} km</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-white/50 text-xs flex items-center gap-2 mb-1">
                    <Gauge size={14} /> Pressure
                  </p>
                  <p className="text-xl font-bold text-white">{weather.main.pressure} hPa</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-white/50 text-xs mb-1">Cloud Cover</p>
                  <p className="text-xl font-bold text-white">{weather.clouds.all}%</p>
                </div>
              </div>
            </div>

            {/* Forecast */}
            {forecast && (
              <div className="weather-card bg-white/10 p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {forecast.list.slice(0, 5).map((day, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/20 text-center">
                      <p className="text-white/70 text-sm mb-3">
                        {new Date(day.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <div className="flex justify-center mb-3">
                        {getWeatherIcon(day.weather[0].description)}
                      </div>
                      <p className="text-white text-xs capitalize mb-2">{day.weather[0].main}</p>
                      <p className="text-white font-bold text-lg">
                        {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
