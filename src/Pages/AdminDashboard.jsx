import React, { useState, useContext } from 'react';
import styles from './AdminDashboard.module.css';
import { AuthContext } from '../Context/AuthContext';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [dateFilter, setDateFilter] = useState('all-time'); // Default date filter

  // Mock real-time stats
  const stats = [
    { label: 'Active Users for Staff', value: 0, size: 'small' },
    { label: 'Active Users for IT', value: 0, size: 'small' },
    { label: 'Total Tickets', value: 0, size: 'large' },
    { label: 'Resolved', value: 0, size: 'large' },
    { label: 'Unresolved', value: 0, size: 'large' },
    { label: 'Unassigned', value: 0, size: 'large' },
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
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="all-time">All Time</option>
            <option value="set-up">Set Up</option>
          </select>
        </div>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${styles.statBox} ${
                stat.size === 'small' ? styles.small : styles.large
              }`}
            >
              <span
        className={`${styles.statLabel} ${
          stat.size === 'small' ? styles.smallLabel : styles.largeLabel
        }`}
      >
        {stat.label}
      </span>  
      <span
        className={`${styles.statValue} ${
          stat.size === 'small' ? styles.smallValue : styles.largeValue
        }`}
      >
        {stat.value}
      </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;