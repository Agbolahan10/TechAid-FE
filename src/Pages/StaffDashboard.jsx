import React, { useContext } from 'react';
import styles from './StaffDashboard.module.css';
import Sidebar from '../Components/Sidebar';
import { AuthContext } from '../Context/AuthContext';
import Header from '../Components/Header';

const StaffDashboard = () => {
  const { user } = useContext(AuthContext);

  // Mock real-time ticket stats
  const ticketStats = [
    { label: 'Submitted Tickets', value: 0 },
    { label: 'Resolved', value: 0 },
    { label: 'Unresolved', value: 0 },
    { label: 'Unassigned', value: 0 },
  ];

  return (
    <div className={styles.dashboard}>
      <Sidebar/>
      <div className={styles.mainContent}>
        <Header user={user} />
        <div className={styles.statsGrid}>
          {ticketStats.map((stat, index) => (
            <div key={index} className={styles.statBox}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;