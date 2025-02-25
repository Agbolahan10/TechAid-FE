import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import styles from './ITDashboard.module.css';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';


const ITDashboard = () => {
  const { user } = useContext(AuthContext);
  const [dateFilter, setDateFilter] = useState('all-time'); // Default date filter

  // Mock real-time ticket stats
  const ticketStats = [
    { label: 'All Tickets', value: 0 },
    { label: 'Resolved Tickets', value: 0 },
    { label: 'Unresolved Tickets', value: 0 },
    { label: 'Unassigned Tickets', value: 0 },
  ];

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    // Add logic to filter tickets based on the selected date range
  };

  return (
    <div className={styles.dashboard}>
      <Sidebar/>
      <div className={styles.mainContent}>
        <Header user={user} />
        <div className={styles.filterSection}>
          <select
            value={dateFilter}
            onChange={handleDateFilterChange}
            className={styles.dateFilter}
          >
            <option className={styles.filteroption} value="today">Today</option>
            <option className={styles.filteroption} value="this-week">This Week</option>
            <option className={styles.filteroption} value="this-month">This Month</option>
            <option className={styles.filteroption} value="all-time">All Time</option>
            <option className={styles.filteroption} value="set-up">Set Up</option>
          </select>
        </div>
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

export default ITDashboard;