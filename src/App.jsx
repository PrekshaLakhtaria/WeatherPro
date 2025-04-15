import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import CurrentWeather from "./components/Weather/CurrentWeather";
import HourlyForecast from "./components/Weather/HourlyForecast";
import DailyForecast from "./components/Weather/DailyForecast";
import RadarMap from "./components/Weather/RadarMap";
import SunTimes from "./components/Weather/SunTimes";
import NearbyLocations from "./components/Weather/NearbyLocations";
import LoadingIndicator from "./components/UI/LoadingIndicator";
import ErrorMessage from "./components/UI/ErrorMessage";
import Footer from "./components/Footer/Footer";
import useWeather from "./hooks/useWeather";
import { MapPin } from "lucide-react";
import styles from "./App.module.css";

export default function App() {
  const [city, setCity] = useState("New York");
  const [activeTab, setActiveTab] = useState("today");
  const [unit, setUnit] = useState("celsius");
  const [expandedSection, setExpandedSection] = useState("hourly");

  const { weather, loading, error, fetchWeather } = useWeather();

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeather(searchCity);
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Initialize with default city
  useEffect(() => {
    fetchWeather("New York");
  }, [fetchWeather]);

  return (
    <div className={styles.container}>
      <Header
        city={city}
        onSearch={handleSearch}
        unit={unit}
        setUnit={setUnit}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className={styles.main}>
        {error && <ErrorMessage message={error} />}
        {loading && <LoadingIndicator />}

        {!loading && weather && (
          <>
            <div className={styles.locationContainer}>
              <div className={styles.locationHeader}>
                <MapPin size={18} className={styles.locationIcon} />
                <h2 className={styles.cityName}>
                  {weather.city}, {weather.region}
                </h2>
              </div>
              <p className={styles.lastUpdated}>
                Last updated: {weather.lastUpdated}
              </p>
            </div>

            {activeTab === "today" && (
              <div className={styles.contentGrid}>
                <div>
                  <CurrentWeather weather={weather} unit={unit} />
                  <HourlyForecast
                    hourlyData={weather.hourlyForecast}
                    unit={unit}
                    isExpanded={expandedSection === "hourly"}
                    onToggle={() => toggleSection("hourly")}
                  />
                  <DailyForecast
                    dailyData={weather.dailyForecast.slice(0, 3)}
                    unit={unit}
                    onViewMore={() => setActiveTab("daily")}
                    preview={true}
                  />
                </div>

                <div>
                  <SunTimes sunrise={weather.sunrise} sunset={weather.sunset} />
                  <NearbyLocations
                    locations={weather.nearbyLocations}
                    unit={unit}
                    onSelectLocation={handleSearch}
                  />
                </div>
              </div>
            )}

            {activeTab === "hourly" && (
              <HourlyForecast
                hourlyData={weather.hourlyForecast}
                unit={unit}
                isExpanded={true}
                detailed={true}
                windSpeed={weather.windSpeed}
              />
            )}

            {activeTab === "daily" && (
              <DailyForecast
                dailyData={weather.dailyForecast}
                unit={unit}
                preview={false}
              />
            )}

            {activeTab === "radar" && <RadarMap />}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
