import { ChevronDown, ChevronRight } from "lucide-react";
import styles from "./CollapsibleSection.module.css";

export default function CollapsibleSection({
  title,
  icon,
  children,
  isExpanded,
  onToggle,
  className = "",
}) {
  return (
    <div className={`${styles.container} ${className}`}>
      <button onClick={onToggle} className={styles.button}>
        <div className={styles.titleContainer}>
          {icon}
          <span className={styles.title}>{title}</span>
        </div>
        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      {isExpanded && children}
    </div>
  );
}
