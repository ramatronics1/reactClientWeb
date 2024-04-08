import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import styles from "./StudentLogin.module.css";

import logo from "../assets/images/logo.jpg";

const StudentLogin = ({ login, setLogin, setId }) => {
  const IP = process.env.REACT_APP_API_URL
  const [usn, setUsn] = useState("");
  const [dob, setDob] = useState("");
  const history = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "usn") {
      setUsn(value);
    } else if (name === "dob") {
      setDob(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://${IP}:5000/clientLogin`,
        { usn, dob },
        {
          withCredentials: true,
        }
    
      );

      if (response.data) {
        localStorage.setItem("isLoggedIn", true.toString());
        const name = response.data.name;
        const id = response.data._id;
        setId(id);

        history("/HotelDisplay", { state: { usn: usn, name: name, id: id } });
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
      <div class={styles.rightDiv}>
        <h1>LOGIN</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>USN:</label>
          <input type="text" name="usn" onChange={handleChange} value={usn} />
          <label>Date of Birth:</label>
          <input type="date" name="dob" onChange={handleChange} value={dob} />
          <button type="submit">Submit</button>
          <span class={styles.linkSpan}>
            For Admin Login,{" "}
            <Link
              className={styles.btnAdmin}
              to={{ pathname: "/HotelDisplay" }}
            >
              Click Here!
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
