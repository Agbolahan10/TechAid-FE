import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg'; 
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Optimus Bank" className={styles.logo} />
      </div>
      <div className={styles.formContainer}>
        <h1 className={styles.h1}>Sign-In</h1>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input type="email" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input type="password" className={styles.input} />
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

