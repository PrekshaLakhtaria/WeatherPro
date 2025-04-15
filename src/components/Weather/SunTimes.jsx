import { Sun } from "lucide-react";
import styles from "./SunTimes.module.css";

export default function SunTimes({ sunrise, sunset }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Sunrise & Sunset</h3>
      <div className={styles.timesContainer}>
        <div className={styles.timeSection}>
          <div className={styles.labelContainer}>
            <Sun size={14} className={styles.sunriseIcon} /> Sunrise
          </div>
          <div className={styles.timeValue}>{sunrise}</div>
        </div>
        <div className={styles.timeSection}>
          <div className={styles.labelContainer}>
            <Sun size={14} className={styles.sunsetIcon} /> Sunset
          </div>
          <div className={styles.timeValue}>{sunset}</div>
        </div>
      </div>
    </div>
  );
}
