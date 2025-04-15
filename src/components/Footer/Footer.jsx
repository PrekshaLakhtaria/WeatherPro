import { CloudRain } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.branding}>
            <div className={styles.logoContainer}>
              <CloudRain size={20} className={styles.logoIcon} />
              <span className={styles.logoText}>WeatherPro</span>
            </div>
            <p className={styles.tagline}>
              Accurate weather forecasts, when you need them.
            </p>
          </div>
          <div className={styles.links}>
            <a href="#" className={styles.link}>
              Terms
            </a>
            <a href="#" className={styles.link}>
              Privacy
            </a>
            <a href="#" className={styles.link}>
              Cookie Policy
            </a>
            <a href="#" className={styles.link}>
              Contact
            </a>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>
            © 2025 WeatherPro. All weather data is simulated for demonstration
            purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
