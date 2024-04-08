import React from 'react';
import axios from 'axios';
import styles from './PrevCards.module.css';
import { useNavigate } from 'react-router-dom';

const PrevCards = ({ order , id}) => {
  const IP = process.env.REACT_APP_API_URL;
  console.log(id)
  const navigate = useNavigate();

  const handleDelete = async (order) => {
    try {
      // console.log(id)
      const response = await axios.post(`http://192.168.29.42:5000/prevOrderAgain/${id}`);
     
      if (response && response.data && response.data._id) {
        navigate(`/orderSuccess/${response.data._id}`);
        console.log('Order deleted successfully');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error status:', error.response.status);
        console.error('Error data:', error.response.data);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };
  

  return (
    <div className={styles.mainDiv}>
      <div key={order._id}>
        <div>
          <strong>Order ID:</strong> {order._id}
        </div>
        <div>
          <strong>Total Amount:</strong> {order.totalAmount}
        </div>
        <div>
          <strong>Status:</strong> {order.status}
        </div>
        <div>
          <h5 style={{ textDecoration: 'underline' }}>Ordered Items:</h5>
          <div className={styles.dishesDiv}>
            {order.eachOrder.map((item) => (
              <div className={styles.dishDiv} key={item._id}>
                <div>
                  <>Dish Name:</> {item.dishId.name}
                </div>
                <div>
                  <>Quantity:</> {item.quantity}
                </div>
                {item.specialInstructions && (
                  <div>
                    <>Special Instructions:</> {item.specialInstructions}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => handleDelete(order)}>Order Again</button>
      </div>
    </div>
  );
};

export default PrevCards;
