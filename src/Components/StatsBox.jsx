import React from 'react';
import styles from './StatsBox.module.css';

const StatsBox = () => {
  return (
    <div className={styles.statsBox}>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>150</span>
        <span className={styles.statLabel}>All Tickets</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>120</span>
        <span className={styles.statLabel}>Resolved</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>30</span>
        <span className={styles.statLabel}>Unresolved</span>
      </div>
    </div>
  );
};

export default StatsBox;