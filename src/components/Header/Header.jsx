import { useState } from "react";
import { CloudRain } from "lucide-react";
import SearchBar from "./SearchBar";
import NavigationTabs from "./NavigationTabs";
import MobileMenu from "./MobileMenu";
import { X, Menu } from "lucide-react";
import styles from "./Header.module.css";

export default function Header({
  city,
  onSearch,
  unit,
  setUnit,
  activeTab,
  setActiveTab,
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.logo}>
            <CloudRain size={26} className={styles.logoIcon} />
            <h1 className={styles.logoText}>WeatherPro</h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className={styles.searchBarDesktop}>
            <SearchBar city={city} onSearch={onSearch} />
          </div>

          {/* Unit Toggle */}
          <div className={styles.unitToggle}>
            <button
              onClick={() => setUnit("celsius")}
              className={`${styles.unitButton} ${
                unit === "celsius"
                  ? styles.unitButtonActive
                  : styles.unitButtonInactive
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit("fahrenheit")}
              className={`${styles.unitButton} ${
                unit === "fahrenheit"
                  ? styles.unitButtonActive
                  : styles.unitButtonInactive
              }`}
            >
              °F
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileNav} className={styles.mobileMenuButton}>
            {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Search Bar - Mobile */}
        <div className={styles.searchBarMobile}>
          <SearchBar city={city} onSearch={onSearch} />
        </div>

        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Mobile Navigation Menu */}
      {mobileNavOpen && (
        <MobileMenu unit={unit} setUnit={setUnit} onClose={toggleMobileNav} />
      )}
    </header>
  );
}
