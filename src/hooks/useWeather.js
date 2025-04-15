import { useState, useCallback } from "react";

export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Replace with your actual API key from OpenWeatherMap
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = useCallback(async (searchCity) => {
    setLoading(true);
    setError("");

    try {
      // Current weather data
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${API_KEY}`
      );

      if (!currentResponse.ok) {
        throw new Error("City not found. Please try another location.");
      }

      const currentData = await currentResponse.json();

      // Get coordinates for the city to use in the 5-day forecast
      const { lat, lon } = currentData.coord;

      // 5-day forecast data (free tier)
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      if (!forecastResponse.ok) {
        throw new Error("Failed to fetch forecast data.");
      }

      const forecastData = await forecastResponse.json();

      // NEW: Fetch nearby cities using the coordinates
      const nearbyLocations = await fetchNearbyLocations(lat, lon);

      // Format the data for your UI
      const formattedData = {
        city: currentData.name,
        region: "",
        country: currentData.sys.country,
        currentTemp: Math.round(currentData.main.temp),
        feelsLike: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed),
        windDirection: getWindDirection(currentData.wind.deg),
        pressure: currentData.main.pressure,
        visibility: currentData.visibility / 1000, // Convert from meters to km
        uvIndex: 0, // Not available in free tier, would need UV Index API
        condition: currentData.weather[0].main,
        icon: mapWeatherIconToLucide(currentData.weather[0].icon),
        sunrise: formatTime(currentData.sys.sunrise * 1000),
        sunset: formatTime(currentData.sys.sunset * 1000),
        lastUpdated: "Just now",

        // Extract hourly forecast from the 5-day/3-hour forecast data
        hourlyForecast: forecastData.list.slice(0, 12).map((item) => ({
          time: formatHour(item.dt * 1000),
          temp: Math.round(item.main.temp),
          icon: mapWeatherIconToLucide(item.weather[0].icon),
          precipitation: item.pop * 100, // Convert to percentage
        })),

        // Create daily forecast from the 5-day/3-hour forecast data
        // We need to aggregate 3-hour intervals into days
        dailyForecast: extractDailyForecast(forecastData.list),

        // Add the nearby locations
        nearbyLocations,
      };

      setWeather(formattedData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // New function to fetch nearby locations
  const fetchNearbyLocations = async (lat, lon, limit = 5, radius = 50) => {
    try {
      // Use the "Find cities within a circle" endpoint
      // cnt parameter limits the number of cities returned
      // OpenWeatherMap's free tier limits nearby cities to around this radius
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${limit}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        console.error("Failed to fetch nearby locations");
        return [];
      }

      const data = await response.json();

      // Filter out the original city and format the nearby locations
      return data.list
        .filter((location) => location.name !== weather?.city) // Don't include the current city
        .map((location) => ({
          name: location.name,
          country: location.sys.country,
          temp: Math.round(location.main.temp),
          condition: location.weather[0].main,
          icon: mapWeatherIconToLucide(location.weather[0].icon),
          // Calculate distance from main location (optional)
          distance: calculateDistance(
            lat,
            lon,
            location.coord.lat,
            location.coord.lon
          ),
        }))
        .slice(0, 4); // Limit to 4 nearby locations
    } catch (error) {
      console.error("Error fetching nearby locations:", error);
      return [];
    }
  };

  // Helper function to calculate distance between two geographical points using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return Math.round(distance);
  };

  // Helper function to extract daily forecast from 3-hour interval data
  const extractDailyForecast = (forecastList) => {
    const dailyData = {};

    // Group forecast by day
    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split("T")[0];

      if (!dailyData[day]) {
        dailyData[day] = {
          temps: [],
          icons: [],
          descriptions: [],
          precipitation: [],
        };
      }

      dailyData[day].temps.push(item.main.temp);
      dailyData[day].icons.push(item.weather[0].icon);
      dailyData[day].descriptions.push(item.weather[0].description);
      dailyData[day].precipitation.push(item.pop || 0);
    });

    // Convert grouped data to daily forecast format
    return Object.entries(dailyData)
      .slice(0, 7)
      .map(([dateStr, data], index) => {
        const date = new Date(dateStr);
        // Find most frequent weather condition for the day
        const mostFrequentIcon = getMostFrequent(data.icons);

        return {
          day: index === 0 ? "Today" : formatDay(date),
          date: formatDate(date),
          high: Math.round(Math.max(...data.temps)),
          low: Math.round(Math.min(...data.temps)),
          icon: mapWeatherIconToLucide(mostFrequentIcon),
          precipitation: Math.round(Math.max(...data.precipitation) * 100),
          description: getMostFrequent(data.descriptions),
        };
      });
  };

  // Helper function to get most frequent item in an array
  const getMostFrequent = (arr) => {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  };

  // Helper functions for formatting data
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatHour = (timestamp) => {
    const hour = new Date(timestamp).getHours();
    return hour === new Date().getHours()
      ? "Now"
      : `${hour % 12 || 12} ${hour < 12 ? "AM" : "PM"}`;
  };

  const formatDay = (timestamp) => {
    return new Date(timestamp).toLocaleDateString([], { weekday: "short" });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  };

  const getWindDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const mapWeatherIconToLucide = (iconCode) => {
    // Map OpenWeatherMap icon codes to Lucide icons
    const iconMap = {
      "01d": "sun", // clear sky day
      "01n": "moon", // clear sky night
      "02d": "cloud-sun", // few clouds day
      "02n": "cloud-moon", // few clouds night
      "03d": "cloud", // scattered clouds
      "03n": "cloud",
      "04d": "cloud", // broken clouds
      "04n": "cloud",
      "09d": "cloud-drizzle", // shower rain
      "09n": "cloud-drizzle",
      "10d": "cloud-rain", // rain day
      "10n": "cloud-rain", // rain night
      "11d": "cloud-lightning", // thunderstorm
      "11n": "cloud-lightning",
      "13d": "cloud-snow", // snow
      "13n": "cloud-snow",
      "50d": "cloud-fog", // mist
      "50n": "cloud-fog",
    };

    return iconMap[iconCode] || "cloud";
  };

  return { weather, loading, error, fetchWeather };
}
