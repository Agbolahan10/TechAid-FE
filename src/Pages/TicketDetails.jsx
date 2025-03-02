import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './TicketDetails.module.css';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';

const TicketDetails = () => {
  const { id } = useParams(); // Get the ticket ID from the URL
  const navigate = useNavigate();
  const [status, setStatus] = useState('unresolved'); // Default status

  // Mock ticket data (replace with API call)
  const ticket = {
    id: 2345678,
    status: 'unresolved',
    dateCreated: '17/02/25',
    subject: 'Unable to Access Internet Banking Portal',
    description:
      'I have been unable to access the Internet Banking portal since this morning, as it continuously displays an "Invalid Credentials" error despite entering the correct login details. Additionally, my attempts to reset the password have been unsuccessful, as the reset link is not functioning. This issue is impacting customer transactions and requires urgent attention.',
    comment: '',
    name: 'Mena',
    department: 'Human Resources',
    priority: 'Medium',
    type: 'Network',
    email: 'Mena@optimusbank.com',
    contact: '08131685310',
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleCloseTicket = () => {
    // Logic to close the ticket 
    alert('Ticket closed successfully!');
    navigate('/track-tickets'); // Redirect back to the tickets page
  };

  return (
    <div className={styles.dashboard}>
      <Sidebar/>
      <div className={styles.mainContent}>
        <Header/>
        <div className={styles.ticketContainer}>
          {/* Header Section */}
          <div className={styles.ticketHeader}>
            <div className={styles.headerItemOne}>
              <span className={styles.headerLabel}>Assigned</span>
              <span className={styles.headerValue}>ticket</span>
            </div>
            <div className={styles.headerItem}>
              <span className={styles.headerAll}>Ticket ID:</span>
              <span className={styles.headerAll}>{ticket.id}</span>
            </div>
            <div className={styles.headerItem}>
              <span className={styles.headerAll}>Date Created:</span>
              <span className={styles.headerAll}>{ticket.dateCreated}</span>
            </div>
          </div>

          {/* Subject, Description, and Comment */}
          <div className={styles.ticketMain}>
          <div className={styles.textBox}>
            <span className={styles.label}>Subject:</span>
            <p>{ticket.subject}</p>
          </div>
          <div className={`${styles.textBox} ${styles.large}`}>
            <span className={styles.label}>Description:</span>
            <p>{ticket.description}</p>
          </div>
          <div className={styles.textBox}>
            <span className={styles.label}>Comment:</span>
            <p>{ticket.comment || 'No comments yet.'}</p>
          </div>

          {/* Metadata Grid */}
          <div className={styles.metadataGrid}>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Name:</span>
              <span className={styles.metadataValue}>{ticket.name}</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Department:</span>
              <span className={styles.metadataValue}>{ticket.department}</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Priority:</span>
              <span className={styles.metadataValue}>{ticket.priority}</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Type:</span>
              <span className={styles.metadataValue}>{ticket.type}</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Email:</span>
              <span className={styles.metadataValue}>{ticket.email}</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Contact:</span>
              <span className={styles.metadataValue}>{ticket.contact}</span>
            </div>
          </div>

          {/* Status Dropdown and Close Ticket Button */}
          <div className={styles.footer}>
            <select
              value={status}
              onChange={handleStatusChange}
              className={styles.statusDropdown}
            >
              <option value="unresolved">Unresolved</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          </div>
          <div className={styles.buttonBox}>
          {status === 'resolved' && (
              <button onClick={handleCloseTicket} className={styles.closeButton}>
                Close Ticket
              </button>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;