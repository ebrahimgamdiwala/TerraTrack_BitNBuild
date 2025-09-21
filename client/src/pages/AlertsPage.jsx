import { useState, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

export default function AlertsPage() {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const OpenWeatherAPIKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const categoryColors = {
    air: 'bg-yellow-500/20 border-yellow-500/30',
    water: 'bg-blue-500/20 border-blue-500/30',
    storm: 'bg-gray-500/20 border-gray-500/30',
    heat: 'bg-red-500/20 border-red-500/30',
    ecosystem: 'bg-green-500/20 border-green-500/30',
    system: 'bg-purple-500/20 border-purple-500/30',
    weather: 'bg-gray-400/20 border-gray-400/30'
  };

  const badgeColors = {
    air: 'bg-yellow-600/50 text-white',
    water: 'bg-blue-600/50 text-white',
    storm: 'bg-gray-600/50 text-white',
    heat: 'bg-red-600/50 text-white',
    ecosystem: 'bg-green-600/50 text-white',
    system: 'bg-purple-600/50 text-white',
    weather: 'bg-gray-600/50 text-white'
  };

  const getEnvironmentalAlerts = async (latitude, longitude) => {
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OpenWeatherAPIKey}&units=metric`
      );
      const weatherData = await weatherRes.json();
      const alerts = await geminiService.getLocationAlerts(latitude, longitude, weatherData);
      setAlerts(alerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      setAlerts([{
        message: 'Unable to fetch environmental alerts at this time.',
        severity: 'high',
        category: 'system'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationName = async (latitude, longitude) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
      );
      const data = await res.json();
      if (data && data.address) { const { house_number, road, pedestrian, footway, neighbourhood, suburb, city, town, village, hamlet, county, state, region, country } = data.address;     
        const detailedLocation = [ house_number, road || pedestrian || footway, neighbourhood, suburb, city || town || village || hamlet, county, state || region, country ].filter(Boolean).join(', ');
        setLocationName(detailedLocation);
      }
    } catch (err) {
      console.error("Error fetching location name:", err);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchLocationName(latitude, longitude);
          getEnvironmentalAlerts(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
        }
      );
    }
  }, []);

  return (
<div style={{marginTop: '50px'}} className="min-h-screen flex items-center justify-center px-4 py-20">      
      <div className="w-full max-w-4xl">
<div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 
                        hover:bg-white/15 transition-all duration-300 ease-out">          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-4xl font-bold text-white">Environmental Alerts</h1>
            {locationName && (
              <p className="text-white/70 text-lg md:text-right">
                📍 {locationName}
              </p>
            )}
          </div>
          <p className="text-white/60 mb-4">
            Real-time environmental monitoring for your current location
          </p>

          {/* Loading state */}
          {loading ? (
            <div className="text-white/70 flex items-center justify-center space-x-2 py-10">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span>Analyzing your environment...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.length === 0 && (
                <p className="text-white/50 text-center py-4">
                  No environmental alerts for your location at this time.
                </p>
              )}
              {alerts.map((alert, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between gap-4 p-4 rounded-xl border shadow-sm backdrop-blur-sm
                    ${categoryColors[alert.category] || 'bg-gray-500/20 border-gray-500/30'}`}
                >
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${badgeColors[alert.category] || 'bg-gray-600/50 text-white'}`}>
                        {alert.category.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-white font-semibold mt-1">{alert.message}</p>
                  </div>
                  {alert.image && (
                    <img src={alert.image} alt="alert" className="w-12 h-12 object-cover rounded-lg"/>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
