import { Calendar, ChevronRight } from "lucide-react";
import { getWeatherIcon } from "../../utils/WeatherIcons";
import { convertTemp } from "../../utils/unitConversion";
import styles from "./DailyForecast.module.css";

export default function DailyForecast({
  dailyData,
  unit,
  onViewMore,
  preview = false,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Calendar size={18} className={styles.headerIcon} />
        <h3 className={styles.title}>
          {preview ? "Daily Forecast" : "5-Day Forecast"}
        </h3>
      </div>

      <div className={styles.forecastList}>
        {dailyData.map((day, index) => (
          <div
            key={index}
            className={preview ? styles.dayPreview : styles.forecastItem}
          >
            {preview ? (
              <>
                <div className={styles.dayName}>
                  {day.day}, {day.date}
                </div>
                <div className={styles.iconContainer}>
                  {getWeatherIcon(day.icon, 20)}
                  <span className={styles.precipitation}>
                    {day.precipitation > 0 ? `${day.precipitation}%` : ""}
                  </span>
                </div>
                <div className={styles.temperatures}>
                  <span className={styles.highTemp}>
                    {convertTemp(day.high, unit)}°
                  </span>
                  <span className={styles.lowTemp}>
                    {convertTemp(day.low, unit)}°
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className={styles.dayName}>{day.day}</div>
                <div className={styles.dayDate}>{day.date}</div>
                <div className={styles.iconContainer}>
                  {getWeatherIcon(day.icon, 24)}
                </div>
                <div className={styles.description}>{day.description}</div>
                <div className={styles.precipitation}>
                  {day.precipitation > 0 ? `${day.precipitation}%` : ""}
                </div>
                <div className={styles.temperatures}>
                  <span className={styles.highTemp}>
                    {convertTemp(day.high, unit)}°
                  </span>
                  <span className={styles.lowTemp}>
                    {convertTemp(day.low, unit)}°
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {preview && onViewMore && (
        <button onClick={onViewMore} className={styles.viewMoreButton}>
          5-day forecast{" "}
          <ChevronRight size={14} className={styles.viewMoreIcon} />
        </button>
      )}
    </div>
  );
}
