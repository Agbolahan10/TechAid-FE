import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../assets/logo.jpeg';
import styles from './CreateAccount.module.css';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setNumber] = useState(''); 
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register(firstName, lastName, email, password, phone)) {
      toast.success('Account created successfully!');
      navigate('/');
    } else {
      toast.error('Registration failed');
    }
  };

  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.logoContainer}>
        <img src={logo} alt="Optimus TechAid" className={styles.logo} />
        <h2 className={styles.logoName}>OPTIMUS TECHAID</h2>
      </div>
      <div className={styles.formContainer}>
        <h1 className={styles.leftAlign}>Create Account</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
          <label className={styles.label}>Phone No</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setNumber(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Create Account
          </button>
        </form>
        <p className={styles.link}>
          Already have an account? <Link to="/" className={styles.linkItem}>Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;