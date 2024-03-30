import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './AddtoCart.module.css';

const AddtoCart = ({ dish, setDish, handleChange }) => {
  const [price, setPrice] = useState(0);
  const [specialInstructions, setSpecialInstructions] = useState({});

  const handlePrice = () => {
    let ans = 0;
    dish.forEach((item) => {
      ans += item.quantity * item.price;
    });
    setPrice(ans);
  };

  const handleSpecialInstructionsChange = (id, instructions) => {
    setSpecialInstructions(prev => ({ ...prev, [id]: instructions }));
  };

  const handleSubmit = async (dish, price) => {
    try {
      const newAttributes = dish.map((item) => ({
        dishId: item._id,
        quantity: item.quantity,
        specialInstructions: specialInstructions[item._id] || '',
      }));
      newAttributes.totalAmount = price;
      console.log(newAttributes);
    
      const IP=process.env.IP
      const response = await axios.post(`http://localhost:5000/createOrder`, { items: newAttributes, price: price },
      { withCredentials: true });
      console.log(response.data); 
    } catch (error) {
      console.error('Error creating order:', error.message);
    }
  };

  useEffect(() => {
    handlePrice();
  }, [dish]);

  return (
    <div className={styles.outerDiv}>
      <h3>Cart</h3>
      <div class={styles.cardDiv}>
        {dish.map((item) => (
          <div class={styles.card}>
            <div key={`cart-${item._id}`} style={{ marginBottom: '20px' }}>
              <h3>{item.name}</h3>
              <table>
              <tbody>
                <tr>
                  <td><strong>Description:</strong></td>
                  <td>{item.description}</td>
                </tr>
                <tr>
                  <td><strong>Price:</strong></td>
                  <td>${item.price}</td>
                </tr>
                <tr>
                  <td><strong>Category:</strong></td>
                  <td>{item.category}</td>
                </tr>
                <tr>
                  <td><strong>Ingredients:</strong></td>
                  <td>{item?.ingredients?.join(', ')}</td>
                </tr>
                <tr>
                  <td><strong>Is Vegetarian:</strong></td>
                  <td>{item.isVegetarian ? 'Yes' : 'No'}</td>
                </tr>
              </tbody>
            </table>
              {item.imageUrl.map((image, imageIndex) => (
                <img
                  key={`${item._id}-image-${imageIndex}`} // Use _id for key
                  src={image.url}
                  alt={`Description of image ${imageIndex + 1}`}
                  style={{ width: '100px', height: 'auto', marginBottom: '8px' }}
                />
              ))}
              <div className={styles.btnDiv}>
                <button onClick={() => handleChange(item, -1)}> - </button>
                <div>{item.quantity}</div>
                <button onClick={() => handleChange(item, +1)}> + </button>
              </div>
              <label htmlFor={`specialInstructions-${item._id}`}><b>Special Instructions:</b></label>
              <input
                className={styles.specialInstructionsInput}
                type="text"
                name="specialInstructions"
                id={`specialInstructions-${item._id}`}
                placeholder="Enter special instructions"
                onChange={(e) => handleSpecialInstructionsChange(item._id, e.target.value)}
                value={specialInstructions[item._id] || ''}
              />
            </div>
          </div>
        ))}
      </div>
      <p><strong>Total Amount:</strong> ${price}</p>
      <button className={styles.confirmOrderBtn} onClick={() => handleSubmit(dish, price)}>Confirm order?</button>
    </div>
  );
};

export default AddtoCart;
