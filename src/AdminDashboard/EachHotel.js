import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DisplayDishes from "./DisplayDishes";
import styles from './EachHotel.module.css'
import AddtoCart from "../ClientDashBoard/addtoCart";

const EachHotel = ({show,dish,setDish,handleChange,handleClick}) => {
  const [data, setData] = useState(null);
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
    <div>
      {show}
      {show ? (
        <AddtoCart dish={dish} setDish={setDish} handleChange={handleChange}  handleClick={handleClick}/>
      ) : (
        <div>
          <h1>Hotel Details</h1>
          {data ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
              <p>Hotel ID: <u>{data.imageUrl[0].url}</u></p>
  
              <div className={styles.displayDiv}>
                {!isLoggedIn && (
                  <div>
                    <p>Already a Customer/Join Now!</p>{" "}
                    <Link className={styles.Login} to={{ pathname: `/adminSignup/${data._id}` }}>Sign Up</Link>{" "}
                    <Link className={styles.Signup} to={{ pathname: `/adminLogin/${data._id}` }}>Login</Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
  
};

export default EachHotel;