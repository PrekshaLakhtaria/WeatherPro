import { Thermometer, Wind, Droplets, Compass } from "lucide-react";
import { getWeatherIcon } from "../../utils/WeatherIcons";
import { convertTemp } from "../../utils/unitConversion";
import styles from "./CurrentWeather.module.css";

export default function CurrentWeather({ weather, unit }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <div className={styles.iconContainer}>
            {getWeatherIcon(weather.icon, 64)}
          </div>
          <div>
            <div className={styles.temperature}>
              {convertTemp(weather.currentTemp, unit)}°
              {unit === "celsius" ? "C" : "F"}
            </div>
            <div className={styles.condition}>{weather.condition}</div>
          </div>
        </div>
        <div>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <Thermometer size={14} className={styles.detailIcon} />
              <span>Feels like: {convertTemp(weather.feelsLike, unit)}°</span>
            </div>
            <div className={styles.detailItem}>
              <Wind size={14} className={styles.detailIcon} />
              <span>
                Wind: {weather.windSpeed} km/h {weather.windDirection}
              </span>
            </div>
            <div className={styles.detailItem}>
              <Droplets size={14} className={styles.detailIcon} />
              <span>Humidity: {weather.humidity}%</span>
            </div>
            <div className={styles.detailItem}>
              <Compass size={14} className={styles.detailIcon} />
              <span>Pressure: {weather.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
