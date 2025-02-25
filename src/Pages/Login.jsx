import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../assets/logo.jpeg';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = login(email, password);
    if (role) {
      toast.success('Login successful!');
      switch (role) {
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
    } else {
      toast.error('Invalid email or password');
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
        <h1 className={styles.leftAlign}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <p className={styles.link}>
          Don't have an account? <Link to="/create-account" className={styles.linkItem}>Create an Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;