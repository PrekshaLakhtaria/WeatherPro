import { getWeatherIcon } from "../../utils/WeatherIcons";
import { convertTemp } from "../../utils/unitConversion";
import styles from "./NearbyLocations.module.css";

export default function NearbyLocations({ locations, unit, onSelectLocation }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Nearby Locations</h3>
      <div className={styles.locationsList}>
        {locations.map((location, index) => (
          <button
            key={index}
            onClick={() => onSelectLocation(location.name)}
            className={styles.locationButton}
          >
            <span>{location.name}</span>
            <div className={styles.weatherInfo}>
              {getWeatherIcon(location.icon, 16)}
              <span className={styles.temperature}>
                {convertTemp(location.temp, unit)}°
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
