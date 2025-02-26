import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import styles from './ITDashboard.module.css';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const ITDashboard = () => {
  const { user } = useContext(AuthContext);
  const [dateFilter, setDateFilter] = useState('all-time'); // Default date filter
  const [selectedDate, setSelectedDate] = useState(null);

  // Mock ticket data
  const tickets = [
    { id: 1, description: 'Printer not working', status: 'unassigned', type: 'Hardware', date: '2025-02-12' },
    { id: 2, description: 'Process Maker not working', status: 'assigned', type: 'Software', date: '2025-02-13' },
    { id: 3, description: 'Laptop screen is broken', status: 'resolved', type: 'Hardware', date: '2025-02-14' },
  ];

  // Filter tickets based on the selected date or timeframe
  const filterTickets = (tickets, dateFilter, selectedDate) => {
    const now = new Date();
    return tickets.filter((ticket) => {
      const ticketDate = new Date(ticket.date);
      switch (dateFilter) {
        case 'today':
          return ticketDate.toDateString() === now.toDateString();
        case 'this-week':
          const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
          const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
          return ticketDate >= startOfWeek && ticketDate <= endOfWeek;
        case 'this-month':
          return ticketDate.getMonth() === now.getMonth() && ticketDate.getFullYear() === now.getFullYear();
        case 'set-up':
          return selectedDate ? ticketDate.toDateString() === selectedDate.toDateString() : true;
        default:
          return true; // All time
      }
    });
  };

  const filteredTickets = filterTickets(tickets, dateFilter, selectedDate);


  // Mock real-time ticket stats
  const ticketStats = [
    { label: 'All Tickets', value: filteredTickets.length},
    { label: 'Resolved', value: filteredTickets.filter((t) => t.status === 'resolved').length },
    { label: 'Unresolved', value: filteredTickets.filter((t) => t.status !== 'resolved').length },
    { label: 'Unassigned', value: filteredTickets.filter((t) => t.status === 'unassigned').length },
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
            onChange={(e) => {
              setDateFilter(e.target.value);
              setSelectedDate(null); // Reset selected date when changing the filter
            }}
            className={styles.dateFilter}
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="all-time">All Time</option>
            <option value="set-up">Set Up</option>
          </select>
          {dateFilter === 'set-up' && (
            <div className={styles.calendarContainer}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                className={styles.calendar}
              />
            </div>
          )}
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