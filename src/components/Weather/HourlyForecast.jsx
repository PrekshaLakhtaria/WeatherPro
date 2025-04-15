import { Clock, Wind } from "lucide-react";
import { getWeatherIcon } from "../../utils/WeatherIcons";
import { convertTemp } from "../../utils/unitConversion";
import CollapsibleSection from "../UI/CollapsibleSection";
import styles from "./HourlyForecast.module.css";

export default function HourlyForecast({
  hourlyData,
  unit,
  isExpanded,
  onToggle,
  detailed = false,
  windSpeed = 0,
}) {
  const hourlyContent = (
    <div
      className={
        detailed ? styles.contentContainerDetailed : styles.contentContainer
      }
    >
      <div
        className={`${styles.hourlyList} ${
          detailed ? styles.hourlyListDetailed : styles.hourlyListNormal
        }`}
      >
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className={`${styles.hourItem} ${
              detailed ? styles.hourItemDetailed : styles.hourItemNormal
            }`}
          >
            <div
              className={detailed ? styles.hourTimeDetailed : styles.hourTime}
            >
              {hour.time}
            </div>
            {getWeatherIcon(hour.icon, detailed ? 28 : 24)}
            <div
              className={detailed ? styles.hourTempDetailed : styles.hourTemp}
            >
              {convertTemp(hour.temp, unit)}°
            </div>
            <div className={styles.precipitationChance}>
              {hour.precipitation > 0
                ? `${hour.precipitation}%`
                : detailed
                ? "—"
                : ""}
            </div>
            {detailed && (
              <div className={styles.windInfo}>
                <Wind size={14} className={styles.windIcon} />
                <span className={styles.windSpeed}>
                  {Math.round(windSpeed * (0.8 + Math.random() * 0.4))} km/h
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (detailed) {
    return (
      <div className={styles.container}>
        <h3 className={`${styles.title} ${styles.header}`}>
          <Clock size={18} className={styles.headerIcon} />
          Hourly Forecast
        </h3>
        {hourlyContent}
      </div>
    );
  }

  return (
    <CollapsibleSection
      title="Hourly Forecast"
      icon={<Clock size={18} className={styles.headerIcon} />}
      isExpanded={isExpanded}
      onToggle={onToggle}
      className={styles.container}
    >
      {hourlyContent}
    </CollapsibleSection>
  );
}
