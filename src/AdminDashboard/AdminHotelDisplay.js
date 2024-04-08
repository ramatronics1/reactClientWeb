import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClusterMap from '../ClientDashBoard/ClusterMap';
import AdminHotelCards from './AdminHotelCards';
import styles from './AdminHoteldisplay.module.css';
import AddtoCart from '../ClientDashBoard/addtoCart';

const AdminHotelDisplay = ({show,id,dish,setDish,handleChange,handleClick}) => {
  const [data, setData] = useState([]);
  const IP = process.env.REACT_APP_API_URL
  const fetchHotels = async () => {
    try {
      const response = await axios.get(`http://${IP}:5000/hotelsDisplay`);
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
    {show ? (
      <AddtoCart  id={id} dish={dish} setDish={setDish} handleChange={handleChange}  handleClick={handleClick}/>
    ) : (
      <>
        <ClusterMap />
        <a href="/hotelRegister">
          <button style={{ width: 'fit-content', padding: '3px 6px', margin: '10px' }}>Create Hotel &rarr;</button>
        </a>
        <h1>Admin Hotel Display</h1>
        <div className={styles.cardDiv}>
          {data.map((hotel, index) => (
            <AdminHotelCards key={hotel._id} hotel={hotel} index={index} />
          ))}
        </div>
      </>
    )}
  </div>
  
  );
};

export default AdminHotelDisplay;
