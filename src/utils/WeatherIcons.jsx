import {
  Sun,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  Cloud,
} from "lucide-react";
import styles from "./weatherIcons.module.css";

export const getWeatherIcon = (icon, size = 24) => {
  switch (icon) {
    case "sun":
      return <Sun className={styles.sunIcon} size={size} />;
    case "cloud-rain":
      return <CloudRain className={styles.rainIcon} size={size} />;
    case "cloud-drizzle":
      return <CloudDrizzle className={styles.drizzleIcon} size={size} />;
    case "cloud-lightning":
      return <CloudLightning className={styles.lightnignIcon} size={size} />;
    case "cloud-snow":
      return <CloudSnow className={styles.snowIcon} size={size} />;
    case "cloud":
      return <Cloud className={styles.cloudIcon} size={size} />;
    default:
      return <Sun className={styles.sunIcon} size={size} />;
  }
};
