import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PrevCards from './PrevCards';
import styles from './PreviousOrders.module.css';

const PreviousOrders = ({ id }) => {
  const [data, setData] = useState([]);
  const IP = process.env.REACT_APP_API_URL
  useEffect(() => {
    const fetchPrevOrders = async () => {
      try {
        const response = await axios.post(`http://${IP}:5000/prevOrders/${id}`);
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.error('Error fetching previous orders:', error);
      }
    };

    fetchPrevOrders();
  }, [id]);

  return (
    <div className={styles.outerDiv}>
      <h2>Previous Orders</h2>
      <div className={styles.innerDiv}>
        {data.map((order) => (
          <PrevCards order={order}/>
        ))}
      </div>
    </div>
  );
};

export default PreviousOrders;
