import React, { useState, useEffect } from 'react';
import styles from './TrackAndViewTickets.module.css';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const TrackAndViewTickets = () => {
  // State to track selected ticket status
  const [selectedStatus, setSelectedStatus] = useState(null);
  
  // State for filtering tickets by date
  const [dateFilter, setDateFilter] = useState('all-time');
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // State to store tickets, categorized by status
  const [tickets, setTickets] = useState({
    unassigned: [
      { id: 2345678, description: 'Printer not working', status: 'unassigned', type: 'Hardware', date: '2025-02-12' },
      { id: 7994532, description: 'Process Maker not working', status: 'unassigned', type: 'Software', date: '2025-02-13' },
      { id: 5555610, description: 'Laptop screen is broken', status: 'unassigned', type: 'Hardware', date: '2025-02-14' },
    ],
    assigned: [
      { id: 1234567, description: 'Email not syncing', status: 'assigned', type: 'Software', date: '2025-02-15' },
    ],
    resolved: [
      { id: 9876543, description: 'Network connection issue', status: 'resolved', type: 'Network', date: '2025-02-10' },
    ],
  });

  // Function to filter tickets based on the selected date filter
  const filterTickets = (tickets, dateFilter, selectedDate) => {
    const now = new Date();
    return tickets.filter((ticket) => {
      const ticketDate = new Date(ticket.date);
      switch (dateFilter) {
        case 'today':
          return ticketDate.toDateString() === now.toDateString();
        case 'this-week':
          const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return ticketDate >= startOfWeek && ticketDate <= endOfWeek;
        case 'this-month':
          return ticketDate.getMonth() === now.getMonth() && ticketDate.getFullYear() === now.getFullYear();
        case 'set-up':
          return selectedDate ? ticketDate.toDateString() === selectedDate.toDateString() : true;
        default:
          return true; // Show all tickets
      }
    });
  };

  // Simulate real-time ticket updates every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setTickets((prevTickets) => {
        const newTickets = { ...prevTickets };

        // Randomly add a new unassigned ticket
        if (Math.random() > 0.5) {
          const newTicket = {
            id: Math.floor(Math.random() * 10000000),
            description: 'New issue reported',
            status: 'unassigned',
            type: Math.random() > 0.5 ? 'Hardware' : 'Software',
            date: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
          };
          newTickets.unassigned.push(newTicket);
        }

        // Randomly move tickets between statuses
        if (newTickets.unassigned.length > 0 && Math.random() > 0.5) {
          const movedTicket = newTickets.unassigned.shift();
          movedTicket.status = 'assigned';
          newTickets.assigned.push(movedTicket);
        }
        if (newTickets.assigned.length > 0 && Math.random() > 0.5) {
          const movedTicket = newTickets.assigned.shift();
          movedTicket.status = 'resolved';
          newTickets.resolved.push(movedTicket);
        }

        return newTickets;
      });
    }, 300000); // Runs every 5 minutes

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Navigate to Ticket Details page
  const handleTicketClick = (ticketId) => {
    navigate(`/ticket-details/${ticketId}`); // Redirect to Ticket Details page with ticket ID
  };

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />

        {/* Status Boxes */}
        <div className={styles.statusBoxes}>
          {Object.keys(tickets).map((status) => (
            <div
              key={status}
              className={`${styles.statusBox} ${selectedStatus === status ? styles.active : ''}`}
              onClick={() => setSelectedStatus(status)}
            >
              <span className={styles.statusCount}>{tickets[status].length}</span>
              <span className={styles.statusLabel}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </div>
          ))}
        </div>

        <div className={styles.timeframe}>
          <div className={styles.headings}>
            <span className={styles.headingsBold}>Unassigned</span>
            <span className={styles.headingsLight}>View all tickets raised</span>
          </div>
        {/* Filter Section */}
        <div className={styles.filterSection}>
          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setSelectedDate(null);
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
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              className={styles.calendar}
            />
          )}
        </div>
        </div>

        {/* Ticket Details */}
        <div className={styles.ticketDetails}>
          {selectedStatus ? (
            filterTickets(tickets[selectedStatus], dateFilter, selectedDate).map((ticket) => (
              <div key={ticket.id} 
                   className={styles.ticketBox}
                   onClick={() => handleTicketClick(ticket.id)} // Add click handler
                   >
                <p><strong>ID: {ticket.id}</strong></p>
                <p>Description: {ticket.description}</p>
                <div className={styles.styledBox}><p>Status: {ticket.status}</p></div>
                <div className={styles.styledBox}><p>Type: {ticket.type}</p></div>
                <div className={styles.styledBox}><p>Date: {ticket.date}</p></div>
              </div>
            ))
          ) : (
            <p className={styles.noTickets}>No tickets available yet, check back later.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackAndViewTickets;
