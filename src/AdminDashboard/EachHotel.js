import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DisplayDishes from "./DisplayDishes";
import styles from './EachHotel.module.css';

const EachHotel = () => {
  const [hotelData, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { id } = useParams();

  const checkLocalStorage = () => {
    const isLoggedInString = localStorage.getItem("isLoggedIn");
    let isLoggedIn = false;
    if (isLoggedInString === "true") {
      isLoggedIn = !isLoggedIn;
    }
    setIsLoggedIn(isLoggedIn);
  };

  const fetchHotel = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/hotel/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching hotel:", error);
    }
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  useEffect(() => {
    fetchHotel();
  }, [id]);

  return (
    <div style={{ backgroundColor: '#feebda' }}>
      <h1>Hotel Details</h1>
      {hotelData ? (
        <div className={styles.displayDiv}>
          <div>
            <p><strong>Hotel Name:</strong> {hotelData.name}</p>
            <p><strong>Description:</strong> {hotelData.description}</p>
            <p><strong>Phone:</strong> {hotelData.phone}</p>
            <p><strong>Email:</strong> {hotelData.email}</p>
            <p><strong>Images:</strong></p>
            <ul>
              {hotelData.imageUrl.map((img) => (
                <li key={img._id}>
                  <img src={img.url} alt="Hotel" />
                </li>
              ))}
            </ul>
          </div>
          <div>
            {!isLoggedIn && (
              <div>
                <p>Already a Customer/Join Now!</p>{" "}
                <Link to={{ pathname: `/adminSignup/${hotelData._id}` }} className={styles.Signup}>Sign Up</Link>{" "}
                <Link to={{ pathname: `/adminLogin/${hotelData._id}` }} className={styles.Login}>Login</Link>
              </div>
            )}
            {isLoggedIn && (
              <div>
                <Link to={{ pathname: `/DisplayDishes/${hotelData._id}` }} className={styles.displayDishes}>
                  DisplayDishes <span>&rarr;</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  ); 
};

export default EachHotel;
