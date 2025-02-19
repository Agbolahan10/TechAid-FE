import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.searchBox}>
        <FaSearch className={styles.searchIcon} />
        <input type="text" placeholder="Search Ticket ID" className={styles.searchInput} />
      </div>
      <div className={styles.userInfo}>
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className={styles.userImage}
        />
        <span className={styles.userName}>John Doe</span>
      </div>
    </div>
  );
};

export default Header;