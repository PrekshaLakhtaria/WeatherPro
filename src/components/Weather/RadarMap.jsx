import { BarChart2, MapPin } from "lucide-react";
import styles from "./RadarMap.module.css";

export default function RadarMap() {
  return (
    <div className={styles.container}>
      <div className={styles.mapCard}>
        <h3 className={styles.header}>
          <BarChart2 size={18} className={styles.headerIcon} />
          <span className={styles.title}>Radar Map</span>
        </h3>

        <div className={styles.mapContainer}>
          <div className={styles.mapPlaceholder}>
            <MapPin size={28} className={styles.pinIcon} />
            <p>Radar map would appear here</p>
            <p className={styles.placeholderText}>
              This is a demonstration interface
            </p>
          </div>
        </div>

        <div className={styles.controlsContainer}>
          <div className={styles.controlGroup}>
            <button className={styles.buttonPrimary}>Radar</button>
            <button className={styles.buttonSecondary}>Satellite</button>
          </div>
          <div className={styles.controlGroup}>
            <button className={styles.buttonSecondary}>Play</button>
            <button className={styles.buttonSecondary}>Options</button>
          </div>
        </div>
      </div>

      <div className={styles.precipitationCard}>
        <h3 className={styles.precipitationTitle}>Precipitation Forecast</h3>
        <div className={styles.precipitationChart}>
          <div className={styles.gradientBar}></div>
          <div className={styles.precipitationPeak}></div>
        </div>
        <div className={styles.timeLabels}>
          <span>Now</span>
          <span>6h</span>
          <span>12h</span>
          <span>18h</span>
          <span>24h</span>
        </div>
      </div>
    </div>
  );
}
