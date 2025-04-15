import styles from "./MobileMenu.module.css";

export default function MobileMenu({ unit, setUnit, onClose }) {
  return (
    <div className={styles.mobileMenu}>
      <div className={styles.menuContainer}>
        <h3 className={styles.menuHeading}>Units</h3>
        <div className={styles.unitButtonGroup}>
          <button
            onClick={() => setUnit("celsius")}
            className={`${styles.unitButton} ${
              unit === "celsius"
                ? styles.unitButtonActive
                : styles.unitButtonInactive
            }`}
          >
            Celsius (°C)
          </button>
          <button
            onClick={() => setUnit("fahrenheit")}
            className={`${styles.unitButton} ${
              unit === "fahrenheit"
                ? styles.unitButtonActive
                : styles.unitButtonInactive
            }`}
          >
            Fahrenheit (°F)
          </button>
        </div>

        <div className={styles.divider}>
          <p className={styles.copyright}>© 2025 WeatherPro</p>
        </div>
      </div>
    </div>
  );
}
