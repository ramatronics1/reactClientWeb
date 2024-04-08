import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './AdminLogin.module.css';
import logo from "../assets/images/logo.jpg";

const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const id =useParams().hotelId;
  const IP = process.env.REACT_APP_API_URL
  console.log(id)

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 

    try {
      const response = await axios.post(`http://${IP}:5000/adminSignup`, { email, password,id});

      if (response.data) {
        navigate(`/hotel/${id}/`);
      }
      console.log('Signed up successfully', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.outerDiv}>
      <div className={styles.leftDiv}>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
      <div className={styles.rightDiv}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="text" name="email" onChange={handleChange} value={email} />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
          />

          <input type="submit" value="Signup" />
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
