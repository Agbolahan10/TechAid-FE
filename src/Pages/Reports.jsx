import React, { useState, useMemo } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Reports.module.css';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

// Register Chart.js elements and scales
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip);

const Reports = () => {
  const [dateFilter, setDateFilter] = useState('all-time');
  const [selectedDate, setSelectedDate] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Mock ticket data
  const tickets = [
    { id: 1, status: 'resolved', department: 'sales', priority: 'high', type: 'hardware', date: '2025-02-24', assigned: true },
    { id: 2, status: 'unresolved', department: 'operation', priority: 'medium', type: 'software', date: '2025-02-25', assigned: false },
    { id: 3, status: 'resolved', department: 'treasury', priority: 'low', type: 'network', date: '2025-02-26', assigned: true },
    { id: 4, status: 'unresolved', department: 'human-resources', priority: 'high', type: 'transaction', date: '2025-02-27', assigned: false },
    { id: 5, status: 'resolved', department: 'customer-services', priority: 'medium', type: 'hardware', date: '2025-02-28', assigned: true },
  ];

  // Filter tickets based on selected filters
  const filterTickets = () => {
    const now = new Date();
    return tickets.filter((ticket) => {
      const ticketDate = new Date(ticket.date);

      // Date filter
      let dateMatch = true;
      switch (dateFilter) {
        case 'this-week':
          const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
          const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
          dateMatch = ticketDate >= startOfWeek && ticketDate <= endOfWeek;
          break;
        case 'this-month':
          dateMatch = ticketDate.getMonth() === now.getMonth() && ticketDate.getFullYear() === now.getFullYear();
          break;
        case 'set-date':
          dateMatch = selectedDate ? ticketDate.toDateString() === selectedDate.toDateString() : true;
          break;
        default:
          dateMatch = true; // All time
      }

      // Department filter
      const departmentMatch = departmentFilter === 'all' || ticket.department === departmentFilter;

      // Priority filter
      const priorityMatch = priorityFilter === 'all' || ticket.priority === priorityFilter;

      return dateMatch && departmentMatch && priorityMatch;
    });
  };

  const filteredTickets = useMemo(() => filterTickets(), [dateFilter, selectedDate, departmentFilter, priorityFilter]);

  // Data for doughnut chart (resolved vs unresolved)
  const resolvedCount = filteredTickets.filter((t) => t.status === 'resolved').length;
  const unresolvedCount = filteredTickets.filter((t) => t.status === 'unresolved').length;

  const doughnutDataResolved = {
    labels: ['Resolved', 'Unresolved'],
    datasets: [
      {
        data: [resolvedCount, unresolvedCount],
        backgroundColor: ['#0B1D69', '#E1E4E8'],
        hoverBackgroundColor: ['#0638B8', '#B1ABAC'],
      },
    ],
  };

  // Data for doughnut chart (assigned vs unassigned)
  const assignedCount = filteredTickets.filter((t) => t.assigned).length;
  const unassignedCount = filteredTickets.filter((t) => !t.assigned).length;

  const doughnutDataAssigned = {
    labels: ['Assigned', 'Unassigned'],
    datasets: [
      {
        data: [assignedCount, unassignedCount],
        backgroundColor: ['#0B1D69', '#E1E4E8'],
        hoverBackgroundColor: ['#0638B8', '#B1ABAC'],
      },
    ],
  };

  // Data for bar chart (tickets by day)
  const ticketsByDay = useMemo(() => filteredTickets.reduce((acc, ticket) => {
    const day = new Date(ticket.date).toLocaleDateString('en-GB', { weekday: 'short' });
    acc[day] = (acc[day] || 0) + 10;
    return acc;
  }, {}), [filteredTickets]);

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Tickets',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => ticketsByDay[day] || 0),
        backgroundColor: '#0B1D69',
        borderColor: '#0B1D69',
        borderRadius: { topLeft: 20, topRight: 20 },
        barThickness: 30,
      },
    ],
  };

  // Custom tooltip for the bar chart
  const barOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => {
            const date = new Date('2025-02-24'); // Replace with actual start date
            date.setDate(date.getDate() + context[0].dataIndex);
            return date.toLocaleDateString('en-GB');
          },
        },
      },
    },
  };

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.filters}>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className={styles.filter}
            aria-label="Filter by date"
          >
            <option value="all-time">All Time</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="set-date">Set Date</option>
          </select>
          {dateFilter === 'set-date' && (
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
              className={styles.calendar}
              isClearable
            />
          )}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className={styles.filter}
            aria-label="Filter by department"
          >
            <option value="all">All Departments</option>
            <option value="sales">Sales</option>
            <option value="operation">Operation</option>
            <option value="treasury">Treasury</option>
            <option value="human-resources">Human Resources</option>
            <option value="customer-services">Customer Services</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className={styles.filter}
            aria-label="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className={styles.charts}>
          <div className={styles.chartContainer}>

          <div className={styles.chartBox}>
            <Doughnut data={doughnutDataResolved} />
          </div>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.colorBox} style={{ backgroundColor: '#0B1D69' }}></span>
                <span>Resolved: {resolvedCount}</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.colorBox} style={{ backgroundColor: '#E1E4E8' }}></span>
                <span>Unresolved: {unresolvedCount}</span>
              </div>
            </div>
          </div>
          <div className={styles.chartContainer}>

          <div className={styles.chartBox}>
            <Doughnut data={doughnutDataAssigned} />
          </div>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={styles.colorBox} style={{ backgroundColor: '#0b1d69' }}></span>
                <span>Assigned: {assignedCount}</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.colorBox} style={{ backgroundColor: '#e1e4e8' }}></span>
                <span>Unassigned: {unassignedCount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.chartAndInfoRow}>
          <div className={styles.chartContainerTwo}>
            <h3>Total Tickets</h3>
            <Bar
            // style={
            //     {padding:'20px',
            //     width: '70%'}
            // } 
            data={barData} 
            options={barOptions} />
          </div>
          <div className={styles.infoColumn}>
            <div className={styles.infoBox}>
              <h3>All Tickets</h3>
              <p>{filteredTickets.length}</p>
            </div>
            <div className={styles.infoBox}>
              <h3>Tickets by Type</h3>
              <p>Hardware: {filteredTickets.filter((t) => t.type === 'hardware').length}</p>
              <p>Software: {filteredTickets.filter((t) => t.type === 'software').length}</p>
              <p>Network: {filteredTickets.filter((t) => t.type === 'network').length}</p>
              <p>Transaction: {filteredTickets.filter((t) => t.type === 'transaction').length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;