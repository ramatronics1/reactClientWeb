import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./AdminLogin.module.css";
import logo from "../assets/images/logo.jpg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Correct usage of useNavigate
  const { hotelId } = useParams();
  const IP = process.env.REACT_APP_API_URL

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://${IP}:5000/adminLogin`, {
        email,
        password,
        id: hotelId,
      });
      console.log(response);

      if (response.data) {
        navigate(`/hotel/${hotelId}`, { state: { id: email } }); // Correct navigation
      }
      console.log("Login successful", response.data);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className={styles.outerDiv}>
      <div className={styles.leftDiv}>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
      <div className={styles.rightDiv}>
      <h1>LOGIN</h1>
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

        <input type="submit" value="Login" />
      </form>
      </div>
    </div>
  );
};

export default AdminLogin;
