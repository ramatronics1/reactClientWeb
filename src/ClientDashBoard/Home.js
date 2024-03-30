import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cards from './Cards';

import styles from './Home.module.css';

const Home = ({ handleClick,name,hotelId }) => {
  const [data, setData] = useState([]);

  const fetchDishes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/displayDishes/${hotelId}`);
      if (response.data) {

        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching dishes', error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div className={styles.outerDiv}>
      <h1>Hello, <u><i>{name}</i></u>!</h1>
      <h2>Welcome to the Home Page</h2>
      
      <div className={styles.cardDiv}>
        {data.map((dish) => (
          <Cards key={dish._id} dish={dish} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default Home;
