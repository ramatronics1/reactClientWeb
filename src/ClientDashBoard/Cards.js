import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cards = ({ dish, handleClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useNavigate();
  const IP = process.env.REACT_APP_API_URL
 console.log(dish);
  const checkLocalStorage = () => {
    const isLoggedInString = localStorage.getItem('isLoggedIn');
    let isLoggedIn = false;
    if (isLoggedInString === 'true') {
      isLoggedIn = !isLoggedIn;
    }
    setIsLoggedIn(isLoggedIn);
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const handleEdit = (dish) => {
    history('/EditDishScreen', { state: { id: dish._id } });
    console.log('Edit:', dish);
  };

  const handleDelete = async (dishId) => {
    try {
      const response = await axios.delete(`http://${IP}:5000/deleteDishes/${dishId}`);
      console.log(response.data);
      // Assuming setDishes is not required here as it's not being used
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  return (
    <div style={{ border: '1px solid var(--brown)', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div key={`dish-${dish._id}`} style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--brown)' }}>{dish.name}</h3>
        <p style={{ textAlign: 'start' }}><strong>Description:</strong> {dish.description}</p>
        <p style={{ textAlign: 'start' }}><strong>Price:</strong> ${dish.price}</p>
        <p style={{ textAlign: 'start' }}><strong>Category:</strong> {dish.category}</p>
        <p style={{ textAlign: 'start' }}><strong>Ingredients:</strong> {dish.ingredients.join(', ')}</p>
        <p style={{ textAlign: 'start' }}><strong>Is Vegetarian:</strong> {dish.isVegetarian ? 'Yes' : 'No'}</p>
        {dish.imageUrl.map((image, imageIndex) => (
          <img
            key={`${dish._id}-image-${imageIndex}`}
            src={image.url}
            alt={`Description of image ${imageIndex + 1}`}
            style={{ width: '100px', height: 'auto', marginBottom: '8px' }}
          />
        ))}
      </div>
      {!isLoggedIn && (
        <div>
          <button style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', outline: 'none', border: '1px solid var(--brown)', backgroundColor: 'var(--brown)', color: 'var(--light-brown)', fontWeight: '500', transition: 'all 0.3s ease' }} onClick={() => handleEdit(dish)}>
            Edit
          </button>
          <button style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', outline: 'none', border: '1px solid var(--brown)', backgroundColor: 'var(--brown)', color: 'var(--light-brown)', fontWeight: '500', transition: 'all 0.3s ease' }} onClick={() => handleDelete(dish._id)}>
            Delete
          </button>
        </div>
      )}
      {isLoggedIn && <button style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', outline: 'none', border: '1px solid var(--brown)', backgroundColor: 'var(--brown)', color: 'var(--light-brown)', fontWeight: '500', transition: 'all 0.3s ease' }} onClick={() => handleClick(dish)}>Add to Cart</button>}
    </div>
  );
};

export default Cards;
