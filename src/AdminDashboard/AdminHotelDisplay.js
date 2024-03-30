import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClusterMap from '../ClientDashBoard/ClusterMap';
import AdminHotelCards from './AdminHotelCards';
import styles from './AdminHoteldisplay.module.css';

const AdminHotelDisplay = () => {
  const [data, setData] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/hotelsDisplay');
      if (response.data) {
        setData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error fetching dishes', error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div className={styles.outerDiv}>
      <ClusterMap />
      <a href="/hotelRegister"><button style={{width: 'fit-content', padding: '3px 6px', margin: '10px'}}>Create Hotel &rarr;</button></a>
      <h1>Admin Hotel Display</h1>
      <div className={styles.cardDiv}>
        {data.map((hotel, index) => (
          <AdminHotelCards key={hotel._id} hotel={hotel} index={index} />
        ))}
      </div>
    </div>
  );
};

export default AdminHotelDisplay;
