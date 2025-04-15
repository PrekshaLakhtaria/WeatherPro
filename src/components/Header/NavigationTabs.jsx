import styles from "./NavigationTabs.module.css";

export default function NavigationTabs({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "today", label: "Today" },
    { id: "hourly", label: "Hourly" },
    { id: "daily", label: "5-Day" },
    { id: "radar", label: "Radar" },
  ];

  return (
    <nav className={styles.nav}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`${styles.navButton} ${
            activeTab === item.id
              ? styles.activeNavButton
              : styles.inactiveNavButton
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
