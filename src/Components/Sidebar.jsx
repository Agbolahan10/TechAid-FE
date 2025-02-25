import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  FaUser, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';
import styles from './Sidebar.module.css';
import { AuthContext } from '../Context/AuthContext';
import { RxDashboard } from "react-icons/rx";
import { RiFocus2Line } from "react-icons/ri";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    // Redirect to the correct dashboard based on the user's role
    switch (user?.role) {
      case 'it':
        navigate('/it-dashboard');
        break;
      case 'staff':
        navigate('/staff-dashboard');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Optimus TechAid Logo" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        <button onClick={handleDashboardClick} className={styles.navItem}>
          <RxDashboard className={styles.icon} />
          <span>Dashboard</span>
        </button>
        <Link to="/profile" className={styles.navItem}>
          <FaUser className={styles.icon} />
          <span>Profile</span>
        </Link>
        <Link to="/track-tickets" className={styles.navItem}>
        <RiFocus2Line className={styles.icon} />
          <span>Track and View Tickets</span>
        </Link>
        <Link to="/reports" className={styles.navItem}>
          <FaChartLine className={styles.icon} />
          <span>Reporting & Analytics</span>
        </Link>
      </nav>
      <div className={styles.footer}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <FaSignOutAlt className={styles.icon} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;